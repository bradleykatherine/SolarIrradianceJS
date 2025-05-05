// solarBeams.js: Draws radial sunbeams only for 'intensityAt1AU'

document.addEventListener('DOMContentLoaded', () => {
  function drawSolarBeams() {
    const canvas = document.getElementById('simulationCanvas');
    if (!canvas || !window.sunParams) {
      setTimeout(drawSolarBeams, 100);
      return;
    }

    let beamCanvas = document.getElementById('solarBeamsCanvas');
    if (!beamCanvas) {
      beamCanvas = document.createElement('canvas');
      beamCanvas.id = 'solarBeamsCanvas';
      beamCanvas.style.position = 'absolute';
      beamCanvas.style.left = canvas.offsetLeft + 'px';
      beamCanvas.style.top = canvas.offsetTop + 'px';
      beamCanvas.style.pointerEvents = 'none';
      canvas.parentNode.appendChild(beamCanvas);
    }

    beamCanvas.width = canvas.width;
    beamCanvas.height = canvas.height;

    const ctx = beamCanvas.getContext('2d');
    ctx.clearRect(0, 0, beamCanvas.width, beamCanvas.height); // ✅ always clear

    if (window.selectedCalculation !== 'intensityAt1AU') return;

    const { sunCenterX, sunCenterY, sunRadius } = window.sunParams;

    const numBeams = 360; // ✅ Increased to one per degree
    const maxLength = Math.max(canvas.width, canvas.height) * 1.2;

    ctx.strokeStyle = 'rgba(255, 180, 0, 0.75)';
    ctx.lineWidth = 1.5;

    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * 2 * Math.PI;

      // ✅ Start at the outer edge of the sun
const beamOffset = 9; // try 1, 2, or 3 for subtle control
const startX = sunCenterX + Math.cos(angle) * (sunRadius - beamOffset);
const startY = sunCenterY + Math.sin(angle) * (sunRadius - beamOffset);


      const endX = sunCenterX + Math.cos(angle) * maxLength;
      const endY = sunCenterY + Math.sin(angle) * maxLength;

      ctx.beginPath();
      ctx.moveTo(startX, startY);
      ctx.lineTo(endX, endY);
      ctx.stroke();
    }
  }

  window.refreshSolarBeams = drawSolarBeams;
});
