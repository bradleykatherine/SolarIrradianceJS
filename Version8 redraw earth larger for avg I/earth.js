// earth.js: Draws Earth with scaled diameter (larger for avgIntensityEarth)

function tryDrawEarth() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.sunParams) {
    setTimeout(tryDrawEarth, 100);
    return;
  }

  const ctx = canvas.getContext('2d');
  const earthImage = new Image();
  earthImage.src = 'earth-transparent.png';

  earthImage.onload = () => {
    let earthDiameterPx;
    let x, y;

    const sp = window.sunParams;

    // ✅ Enlarged Earth for avgIntensityEarth
    if (window.selectedCalculation === 'avgIntensityEarth') {
      earthDiameterPx = canvas.width / 3;
      const earthRadiusPx = earthDiameterPx / 2;

      x = canvas.width / 2 - earthRadiusPx;
      y = canvas.height / 2 - earthRadiusPx;

      ctx.drawImage(earthImage, x, y, earthDiameterPx, earthDiameterPx);

      window.earthPosition = {
        x,
        y,
        centerX: x + earthRadiusPx,
        centerY: y + earthRadiusPx,
        radius: earthRadiusPx
      };
      return;
    }

    // ✅ Normal Earth for all other views
    const SCALE_FACTOR = 20 / 4879;
    const EARTH_DIAMETER_KM = 12756;
    earthDiameterPx = EARTH_DIAMETER_KM * SCALE_FACTOR;
    const earthRadiusPx = earthDiameterPx / 2;

    const AU_IN_PIXELS = 450;
    const earthAU = 1.0;
    const orbitRadius = earthAU * AU_IN_PIXELS;

    x = sp.sunCenterX + orbitRadius - 4;
    y = sp.sunCenterY - earthRadiusPx;

    ctx.drawImage(earthImage, x, y, earthDiameterPx, earthDiameterPx);

    window.earthPosition = {
      x,
      y,
      centerX: x + earthRadiusPx,
      centerY: y + earthRadiusPx,
      radius: earthRadiusPx
    };
  };
}

document.addEventListener('DOMContentLoaded', tryDrawEarth);

// ✅ Expose globally
window.drawEarth = tryDrawEarth;

window.clearEarth = function () {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.earthPosition) return;

  const ctx = canvas.getContext('2d');
  const { x, y, radius } = window.earthPosition;
  const buffer = 4;
  const size = radius * 2;
  ctx.clearRect(x - buffer, y - buffer, size + buffer * 2, size + buffer * 2);
};
