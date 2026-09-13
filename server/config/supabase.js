require("dotenv").config();

const fs = require("fs");
const path = require("path");
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;

let supabase;

if (
  !supabaseUrl ||
  !supabaseKey ||
  supabaseUrl.includes("your-supabase") ||
  supabaseUrl.includes("your-project") ||
  supabaseKey.includes("your_actual_supabase") ||
  supabaseKey.includes("your-supabase")
) {
  console.warn("⚠️ Supabase environment variables missing or placeholder.");
  console.warn("📁 Operating with persistent local file database (server/data/db.json).");

  const DB_FILE = path.join(__dirname, "../data/db.json");

  const readDb = () => {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      if (!fs.existsSync(DB_FILE)) {
        const initial = { contacts: [], consultations: [], quotes: [], subscribers: [] };
        fs.writeFileSync(DB_FILE, JSON.stringify(initial, null, 2));
        return initial;
      }
      const raw = fs.readFileSync(DB_FILE, "utf-8");
      return JSON.parse(raw);
    } catch (e) {
      return { contacts: [], consultations: [], quotes: [], subscribers: [] };
    }
  };

  const writeDb = (data) => {
    try {
      const dir = path.dirname(DB_FILE);
      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true });
      }
      fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
    } catch (e) {
      console.error("Local DB write error:", e);
    }
  };

  const createMockBuilder = (tableName) => {
    let filterFn = () => true;

    const builder = {
      select: () => builder,
      insert: (rows) => {
        const db = readDb();
        const currentList = db[tableName] || [];
        const formatted = Array.isArray(rows)
          ? rows.map((r, i) => ({ id: `REC-${Date.now().toString().slice(-6)}-${i}`, created_at: new Date().toISOString(), status: 'New', ...r }))
          : [{ id: `REC-${Date.now().toString().slice(-6)}`, created_at: new Date().toISOString(), status: 'New', ...rows }];

        db[tableName] = [...formatted, ...currentList];
        writeDb(db);

        const resBuilder = createMockBuilder(tableName);
        resBuilder._data = formatted;
        return resBuilder;
      },
      update: (vals) => {
        const db = readDb();
        const currentList = db[tableName] || [];
        const updated = currentList.map((item) => {
          if (filterFn(item)) {
            return { ...item, ...vals };
          }
          return item;
        });
        db[tableName] = updated;
        writeDb(db);
        const resBuilder = createMockBuilder(tableName);
        resBuilder._data = updated.filter(filterFn);
        return resBuilder;
      },
      delete: () => {
        const db = readDb();
        const currentList = db[tableName] || [];
        const filtered = currentList.filter((item) => !filterFn(item));
        db[tableName] = filtered;
        writeDb(db);
        const resBuilder = createMockBuilder(tableName);
        resBuilder._data = [];
        return resBuilder;
      },
      eq: (col, val) => {
        const prevFilter = filterFn;
        filterFn = (item) => prevFilter(item) && String(item[col]) === String(val);
        return builder;
      },
      order: (col, opts) => builder,
      then: (onFulfilled, onRejected) => {
        const db = readDb();
        const data = builder._data !== undefined ? builder._data : (db[tableName] || []).filter(filterFn);
        return Promise.resolve({ data, error: null }).then(onFulfilled, onRejected);
      },
      catch: (onRejected) => {
        const db = readDb();
        const data = builder._data !== undefined ? builder._data : (db[tableName] || []).filter(filterFn);
        return Promise.resolve({ data, error: null }).catch(onRejected);
      }
    };

    return builder;
  };

  supabase = {
    from: (table) => createMockBuilder(table)
  };
} else {
  supabase = createClient(supabaseUrl, supabaseKey);
}

module.exports = supabase;