// venus.js: Draws Venus with accurate scaling based on its actual diameter

function tryDrawVenus() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.sunParams) {
    setTimeout(tryDrawVenus, 100);
    return;
  }

  const ctx = canvas.getContext('2d');
  const venusImage = new Image();
  venusImage.src = 'venus-transparent.png'; // Ensure this path is correct

  venusImage.onload = () => {
    const SCALE_FACTOR = 20 / 4879; // ≈ 0.0041 pixels per km
    const VENUS_DIAMETER_KM = 12104;
    const venusDiameterPx = VENUS_DIAMETER_KM * SCALE_FACTOR;
    const venusRadiusPx = venusDiameterPx / 2;

    const sp = window.sunParams;
    const AU_IN_PIXELS = 450;
    const venusAU = 0.72;
    const orbitRadius = venusAU * AU_IN_PIXELS;

    // Adjust x-position to align Venus's left edge with its orbital ring
    const x = sp.sunCenterX + orbitRadius - 4;
    const y = sp.sunCenterY - venusRadiusPx;

    ctx.drawImage(venusImage, x, y, venusDiameterPx, venusDiameterPx);

    // Store Venus's position for clearing
    window.venusPosition = {
      x,
      y,
      centerX: x + venusRadiusPx,
      centerY: y + venusRadiusPx,
      radius: venusRadiusPx
    };
  };
}

// Automatically draw Venus on load
document.addEventListener('DOMContentLoaded', tryDrawVenus);

// ✅ Expose for external control
window.drawVenus = tryDrawVenus;

// ✅ Add clearing function
window.clearVenus = function () {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.venusPosition) return;

  const ctx = canvas.getContext('2d');
  const { x, y, radius } = window.venusPosition;

  const buffer = 4;
  const size = radius * 2;
  ctx.clearRect(x - buffer, y - buffer, size + buffer * 2, size + buffer * 2);
};
