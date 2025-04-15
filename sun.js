// sun.js: Loads and draws a Sun image aligned to the left and vertically centered on the canvas,
// and stores its parameters for use by other modules.

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    console.error('No canvas found with ID "simulationCanvas"');
    return;
  }
  const ctx = canvas.getContext('2d');
  const sunImage = new Image();
  sunImage.src = 'sunround.en.png'; // Update if filename differs

  sunImage.onload = () => {
    const scale = 0.2; // Display sun at 20% of its original size
    const scaledSunWidth = sunImage.width * scale;
    const scaledSunHeight = sunImage.height * scale;

    // Position sun 10px from the left, and vertically centered
    const x = 10;
    const y = (canvas.height - scaledSunHeight) / 2;

    ctx.drawImage(sunImage, x, y, scaledSunWidth, scaledSunHeight);

    // Store sun parameters globally for reuse (e.g. by lightBeams.js)
    window.sunParams = {
      sunX: x,
      sunY: y,
      sunCenterX: x + scaledSunWidth / 2,
      sunCenterY: y + scaledSunHeight / 2,
      sunRadius: scaledSunWidth / 2,  // Assuming circular sun
      sunScale: scale,
      scaledSunWidth,
      scaledSunHeight
    };
  };
});
