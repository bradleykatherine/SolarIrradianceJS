// calc_avgIntensityEarth.js: Calculates the average solar intensity over Earth's surface

document.addEventListener('DOMContentLoaded', () => {
  const avgIntensityHTML = `

    <strong>Total Power Captured by Earth:</strong><br>
    P = 1.735 × 10¹⁷ W<br><br>

    <strong>Radius of Earth:</strong><br>
    R = 6.371 × 10⁶ m<br><br>

    <strong>Spherical Surface Area of Earth:</strong><br>
    A = 4 × π × R² = 4 × π × (6.371 × 10⁶ m)²<br>
    A ≈ 5.10 × 10¹⁴ m²<br><br>

    <strong>Average Intensity:</strong><br>
    I = P / A = (1.735 × 10¹⁷ W) / (5.10 × 10¹⁴ m²)<br>
    <strong>I ≈ 340 W/m²</strong>
  `;

  window.calculationOptions = window.calculationOptions || {};
  window.calculationOptions['avgIntensityEarth'] = avgIntensityHTML;
});
