import React, { useState } from 'react';

export default function App() {
  const [radiusTop, setRadiusTop] = useState(100);
  const [radiusBottom, setRadiusBottom] = useState(300);
  const [height, setHeight] = useState(400);
  const [format, setFormat] = useState([1250, 2500]);

  const calc = () => {
    const r = radiusTop;
    const R = radiusBottom;
    const h = height;
    const l = Math.sqrt(Math.pow(R - r, 2) + h * h);
    const theta = ((R - r) / R) * 360;
    return { r, R, l, theta };
  };

  const { r, R, l, theta } = calc();

  const toRadians = (angle) => (angle * Math.PI) / 180;

  const polarToCartesian = (cx, cy, radius, angle) => {
    const rad = toRadians(angle);
    return {
      x: cx + radius * Math.cos(rad),
      y: cy + radius * Math.sin(rad),
    };
  };

  const describeArc = (cx, cy, r1, r2, startAngle, endAngle) => {
    const start1 = polarToCartesian(cx, cy, r1, endAngle);
    const end1 = polarToCartesian(cx, cy, r1, startAngle);
    const start2 = polarToCartesian(cx, cy, r2, endAngle);
    const end2 = polarToCartesian(cx, cy, r2, startAngle);

    const largeArcFlag = endAngle - startAngle <= 180 ? "0" : "1";

    return [
      "M", start1.x, start1.y,
      "A", r1, r1, 0, largeArcFlag, 0, end1.x, end1.y,
      "L", end2.x, end2.y,
      "A", r2, r2, 0, largeArcFlag, 1, start2.x, start2.y,
      "Z"
    ].join(" ");
  };

  const svgWidth = format[0];
  const svgHeight = format[1];

  return (
    <div style={{ padding: 20, fontFamily: 'Arial' }}>
      <h2>Simulazione Sviluppo Cono</h2>

      <label>Raggio Minore (mm): <input type="number" value={radiusTop} onChange={e => setRadiusTop(+e.target.value)} /></label><br />
      <label>Raggio Maggiore (mm): <input type="number" value={radiusBottom} onChange={e => setRadiusBottom(+e.target.value)} /></label><br />
      <label>Altezza (mm): <input type="number" value={height} onChange={e => setHeight(+e.target.value)} /></label><br />

      <label>Formato Lamiera:
        <select onChange={e => setFormat(JSON.parse(e.target.value))}>
          <option value="[1000,2000]">1000x2000</option>
          <option value="[1250,2500]" selected>1250x2500</option>
          <option value="[2500,3000]">2500x3000</option>
        </select>
      </label>

      <svg width={svgWidth} height={svgHeight} style={{ background: '#eee', marginTop: 20 }}>
        <path
          d={describeArc(svgWidth / 2, svgHeight / 2, R, r, 0, theta)}
          fill="rgba(0, 120, 200, 0.5)"
          stroke="black"
        />
      </svg>

      <p>Generatrice (l): {l.toFixed(2)} mm</p>
      <p>Angolo sviluppo: {theta.toFixed(2)}°</p>
    </div>
  );
}