// sun.js: Loads and draws a Sun image aligned to the left and vertically centered on the canvas

function drawSun() {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) return;

  const ctx = canvas.getContext('2d');
  const sunImage = new Image();
  sunImage.src = 'sunround.en.png'; // Update if filename differs

  sunImage.onload = () => {
    const scale = 0.2; // Display sun at 20% of its original size
    const scaledSunWidth = sunImage.width * scale;
    const scaledSunHeight = sunImage.height * scale;

    const x = 10;
    const y = (canvas.height - scaledSunHeight) / 2;

    ctx.drawImage(sunImage, x, y, scaledSunWidth, scaledSunHeight);

    // Store sun parameters globally
    window.sunParams = {
      sunX: x,
      sunY: y,
      sunCenterX: x + scaledSunWidth / 2,
      sunCenterY: y + scaledSunHeight / 2,
      sunRadius: scaledSunWidth / 2,
      sunScale: scale,
      scaledSunWidth,
      scaledSunHeight
    };
  };
}

// ✅ Expose functions globally
window.drawSun = drawSun;
window.clearSun = function () {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas || !window.sunParams) return;

  const ctx = canvas.getContext('2d');
  const { sunX, sunY, scaledSunWidth, scaledSunHeight } = window.sunParams;

  ctx.clearRect(sunX - 2, sunY - 2, scaledSunWidth + 4, scaledSunHeight + 4);
};

document.addEventListener('DOMContentLoaded', drawSun);
