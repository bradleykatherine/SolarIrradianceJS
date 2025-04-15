// mars.js: Draws Mars so its LEFT EDGE touches the 1.52 AU ring

function tryDrawMars() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.sunParams) {
    setTimeout(tryDrawMars, 100);
    return;
  }

  const ctx = canvas.getContext('2d');
  const marsImage = new Image();
  marsImage.src = 'mars-transparent.png';

  marsImage.onload = () => {
    const SCALE_FACTOR = 20 / 4880; // ≈ 0.004098 pixels per km
    const MARS_DIAMETER_KM = 6792;
    const marsDiameterPx = MARS_DIAMETER_KM * SCALE_FACTOR;
    const marsRadiusPx = marsDiameterPx / 2;

    const sp = window.sunParams;
    const AU_IN_PIXELS = 450;
    const marsAU = 1.52;
    const orbitRadius = marsAU * AU_IN_PIXELS;

    // 🟢 Align Mars's LEFT EDGE to the orbital ring
    const x = sp.sunCenterX + orbitRadius;
    const y = sp.sunCenterY - marsRadiusPx;

    ctx.drawImage(marsImage, x, y, marsDiameterPx, marsDiameterPx);

    window.marsPosition = {
      x,
      y,
      centerX: x + marsRadiusPx,
      centerY: y + marsRadiusPx,
      radius: marsRadiusPx
    };
  };
}

document.addEventListener('DOMContentLoaded', tryDrawMars);
