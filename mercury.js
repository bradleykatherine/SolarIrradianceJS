// mercury.js: Draws Mercury so its LEFT EDGE touches the 0.39 AU ring

function tryDrawMercury() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.sunParams) {
    setTimeout(tryDrawMercury, 100);
    return;
  }

  const ctx = canvas.getContext('2d');
  const mercuryImage = new Image();
  mercuryImage.src = 'mercury-transparent.png';

  mercuryImage.onload = () => {
    const SCALE_FACTOR = 20 / 4880;
    const MERCURY_DIAMETER_KM = 4880;
    const mercuryDiameterPx = MERCURY_DIAMETER_KM * SCALE_FACTOR;
    const mercuryRadiusPx = mercuryDiameterPx / 2;

    const sp = window.sunParams;
    const AU_IN_PIXELS = 450;
    const mercuryAU = 0.39;
    const orbitRadius = mercuryAU * AU_IN_PIXELS;

    // 🟢 Place Mercury so its left edge is aligned to the ring
    const x = sp.sunCenterX + orbitRadius;
    const y = sp.sunCenterY - mercuryRadiusPx;

    ctx.drawImage(mercuryImage, x, y, mercuryDiameterPx, mercuryDiameterPx);

    window.mercuryPosition = {
      x,
      y,
      centerX: x + mercuryRadiusPx,
      centerY: y + mercuryRadiusPx,
      radius: mercuryRadiusPx
    };
  };
}

document.addEventListener('DOMContentLoaded', tryDrawMercury);
