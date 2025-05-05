// calc_totalPowerEarth.js: Defines the total power captured by Earth calculation

document.addEventListener('DOMContentLoaded', () => {
  // Define the HTML content for the Earth solar power calculation
  const earthPowerHTML = `
    <strong>Solar Intensity at Earth:</strong><br>
    I = 1.36 × 10³ W/m²<br><br>
    <strong>Radius of Earth:</strong><br>
    R = 6.371 × 10⁶ m<br><br>
    <strong>Cross-sectional Area of Earth:</strong><br>
    A = π × R² = π × (6.371 × 10⁶ m)²<br>
    A ≈ 1.275 × 10¹⁴ m²<br><br>
    <strong>Total Power Received by Earth:</strong><br>
    P = I × A = (1.36 × 10³ W/m²) × (1.275 × 10¹⁴ m²)<br>
    <strong>P ≈ 1.735 × 10¹⁷ W</strong>
  `;

  // Expose it globally for selection
  window.calculationOptions = window.calculationOptions || {};
  window.calculationOptions['totalPowerEarth'] = earthPowerHTML;
});
