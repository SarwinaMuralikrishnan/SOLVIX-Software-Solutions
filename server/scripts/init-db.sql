-- ============================================================
-- SOLVIX Software Solutions — Supabase Database Schema Script
-- Run this script in the Supabase SQL Editor to set up all tables.
-- ============================================================

-- 1. Contacts Table
CREATE TABLE IF NOT EXISTS public.contacts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(100),
    message TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. Consultations Table
CREATE TABLE IF NOT EXISTS public.consultations (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(100),
    meeting_type VARCHAR(100) DEFAULT 'Google Meet',
    preferred_date DATE NOT NULL,
    preferred_time VARCHAR(50) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Quotes Table
CREATE TABLE IF NOT EXISTS public.quotes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(255) NOT NULL,
    phone VARCHAR(20) NOT NULL,
    company VARCHAR(100),
    service VARCHAR(150) NOT NULL,
    budget VARCHAR(100) NOT NULL,
    timeline VARCHAR(100) NOT NULL,
    description TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'New',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Subscribers Table
CREATE TABLE IF NOT EXISTS public.subscribers (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    status VARCHAR(50) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Admin Users Table (For phase 3 auth)
CREATE TABLE IF NOT EXISTS public.admin_users (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    username VARCHAR(100) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    role VARCHAR(50) DEFAULT 'Founder',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- Enable Row Level Security (RLS) policies or ensure service keys / anon access
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.consultations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscribers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;

-- Allow anon insert access for customer submission forms
CREATE POLICY "Allow public insert to contacts" ON public.contacts FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to consultations" ON public.consultations FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to quotes" ON public.quotes FOR INSERT WITH CHECK (true);
CREATE POLICY "Allow public insert to subscribers" ON public.subscribers FOR INSERT WITH CHECK (true);

-- Allow full access for backend API operations
CREATE POLICY "Allow anon select to contacts" ON public.contacts FOR SELECT USING (true);
CREATE POLICY "Allow anon update to contacts" ON public.contacts FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete to contacts" ON public.contacts FOR DELETE USING (true);

CREATE POLICY "Allow anon select to consultations" ON public.consultations FOR SELECT USING (true);
CREATE POLICY "Allow anon update to consultations" ON public.consultations FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete to consultations" ON public.consultations FOR DELETE USING (true);

CREATE POLICY "Allow anon select to quotes" ON public.quotes FOR SELECT USING (true);
CREATE POLICY "Allow anon update to quotes" ON public.quotes FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete to quotes" ON public.quotes FOR DELETE USING (true);

CREATE POLICY "Allow anon select to subscribers" ON public.subscribers FOR SELECT USING (true);
CREATE POLICY "Allow anon update to subscribers" ON public.subscribers FOR UPDATE USING (true);
CREATE POLICY "Allow anon delete to subscribers" ON public.subscribers FOR DELETE USING (true);
