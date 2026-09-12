import React from 'react';
import teamImage from '../../assets/team.jpg';

export default function TeamWatermark() {
  return (
    <div
      aria-hidden="true"
      className="team-watermark-layer"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 1,
        pointerEvents: 'none',
        userSelect: 'none',
        overflow: 'hidden',
        mixBlendMode: 'multiply',
      }}
    >
      {/* Team Photo Background Image */}
      <img
        src={teamImage}
        alt=""
        onError={(e) => {
          e.target.onerror = null;
          e.target.src = '/images/team.jpg';
        }}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          objectPosition: 'center',
          opacity: 0.08,
          filter: 'grayscale(100%) contrast(1.15) brightness(0.95)',
        }}
      />

      {/* Subtle Soft Gradient Overlay for Smooth Edge Fading */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse 85% 75% at 50% 50%, rgba(255,255,255,0) 30%, rgba(255,255,255,0.8) 100%)',
        }}
      />
    </div>
  );
}
