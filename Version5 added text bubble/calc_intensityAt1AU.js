// calc_intensityAt1AU.js: Calculates the solar intensity at 1 AU from the Sun

document.addEventListener('DOMContentLoaded', () => {
  const intensity1AUHTML = `

    <strong>Total Power Output of the Sun:</strong><br>
    P = 3.84 × 10²⁶ W<br><br>

    <strong>Radius of Sphere (1 AU):</strong><br>
    R = 1.496 × 10¹¹ m<br><br>

    <strong>Surface Area of Sphere:</strong><br>
    A = 4 × π × R² = 4 × π × (1.496 × 10¹¹ m)²<br>
    A ≈ 2.81 × 10²³ m²<br><br>

    <strong>Solar Intensity at 1 AU:</strong><br>
    I = P / A = (3.84 × 10²⁶ W) / (2.81 × 10²³ m²)<br>
    <strong>I ≈ 1.36 × 10³ W/m²</strong>
  `;

  window.calculationOptions = window.calculationOptions || {};
  window.calculationOptions['intensityAt1AU'] = intensity1AUHTML;
});
