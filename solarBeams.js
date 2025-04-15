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

    const { sunCenterX, sunCenterY } = window.sunParams;
    const numBeams = 100;
    const maxLength = Math.max(canvas.width, canvas.height) * 1.2;

    ctx.strokeStyle = 'rgba(255, 200, 50, 0.3)';
    ctx.lineWidth = 1;

    for (let i = 0; i < numBeams; i++) {
      const angle = (i / numBeams) * 2 * Math.PI;
      const x = sunCenterX + Math.cos(angle) * maxLength;
      const y = sunCenterY + Math.sin(angle) * maxLength;

      ctx.beginPath();
      ctx.moveTo(sunCenterX, sunCenterY);
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }

  window.refreshSolarBeams = drawSolarBeams;
});
