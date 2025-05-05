// planetVisibilityManager.js: Hides or restores Mars only, based on dropdown selection

document.addEventListener('DOMContentLoaded', () => {
  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');

  function clearMarsArea() {
    // If Mars was drawn in its default spot, we can just clear that rectangular area
    if (window.marsPosition) {
      const buffer = 4; // Add padding to ensure full image is cleared
      const { x, y, radius } = window.marsPosition;
      const size = radius * 2;
      ctx.clearRect(x - buffer, y - buffer, size + buffer * 2, size + buffer * 2);
    } else {
      // Fallback: clear a region near 1.52 AU
      const AU_IN_PIXELS = 450;
      const marsAU = 1.52;
      const radiusGuess = 15;
      const sp = window.sunParams || { sunCenterX: 300, sunCenterY: 200 };
      const x = sp.sunCenterX + marsAU * AU_IN_PIXELS;
      const y = sp.sunCenterY - radiusGuess;
      ctx.clearRect(x - radiusGuess, y - radiusGuess, radiusGuess * 2.5, radiusGuess * 2.5);
    }
  }

  function refreshMarsVisibility() {
    const selected = window.selectedCalculation;

    // ✅ Hide Mars if a calculation is selected
    if (selected && selected !== '') {
      clearMarsArea();
    }

    // ✅ Redraw Mars only if no calculation is selected
    if (!selected || selected === '') {
      if (window.drawMars) window.drawMars();
    }
  }

  // Listen for dropdown changes
  const selector = document.getElementById('calculationSelector');
  if (selector) {
    selector.addEventListener('change', () => {
      setTimeout(refreshMarsVisibility, 100);
    });
  }

  // First load — delay to ensure all planets are drawn
  setTimeout(refreshMarsVisibility, 500);
});
