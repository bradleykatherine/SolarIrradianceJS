// textBubble.js: Adds a styled text bubble that matches canvas width and grows with content

document.addEventListener('DOMContentLoaded', () => {
  const existingBubble = document.getElementById('textBubble');
  if (existingBubble) return;

  const canvas = document.getElementById('simulationCanvas');
  if (!canvas) {
    setTimeout(() => document.dispatchEvent(new Event('DOMContentLoaded')), 100);
    return;
  }

  const bubble = document.createElement('div');
  bubble.id = 'textBubble';

  // ✅ Position and style
  const updatePositionAndSize = () => {
    const canvasRect = canvas.getBoundingClientRect();
    bubble.style.position = 'absolute';
    bubble.style.left = canvas.offsetLeft + 'px';
    bubble.style.width = canvas.offsetWidth + 'px';
    bubble.style.top = (canvas.offsetTop + canvas.height - bubble.offsetHeight) + 'px';
  };

  bubble.style.background = 'rgba(255, 255, 240, 0.95)';
  bubble.style.borderTop = '1px solid #ccc';
  bubble.style.padding = '12px 24px';
  bubble.style.fontFamily = 'Arial, sans-serif';
  bubble.style.fontSize = '15px';
  bubble.style.color = '#333';
  bubble.style.boxShadow = '0 -2px 6px rgba(0, 0, 0, 0.1)';
  bubble.style.zIndex = '1002';
  bubble.style.pointerEvents = 'none';
  bubble.style.boxSizing = 'border-box';
  bubble.style.maxHeight = 'none';
  bubble.style.overflow = 'visible';

  bubble.innerHTML = '<em>Explanation will appear here...</em>';

  document.body.appendChild(bubble);
  updatePositionAndSize();

  window.addEventListener('resize', updatePositionAndSize);

  // ✅ Reliable text + reflow hook
  window.setTextBubbleContent = function (html) {
    bubble.innerHTML = html;

    // Wait a moment before recalculating height + position
    requestAnimationFrame(() => {
      updatePositionAndSize();
    });
  };
});
