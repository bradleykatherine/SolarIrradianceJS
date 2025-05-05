// textBubble.js: Adds a styled, always-visible text bubble overlay above the canvas

document.addEventListener('DOMContentLoaded', () => {
  const existingBubble = document.getElementById('textBubble');
  if (existingBubble) return; // Don't create more than one

  const bubble = document.createElement('div');
  bubble.id = 'textBubble';

  // 💬 Position: bottom-left over the canvas, adjust as needed
  bubble.style.position = 'absolute';
  bubble.style.left = '40px';
  bubble.style.bottom = '40px';
  bubble.style.maxWidth = '320px';
  bubble.style.background = 'rgba(255, 255, 240, 0.95)';
  bubble.style.border = '1px solid #ccc';
  bubble.style.borderRadius = '12px';
  bubble.style.padding = '14px 18px';
  bubble.style.fontFamily = 'Arial, sans-serif';
  bubble.style.fontSize = '14.5px';
  bubble.style.color = '#333';
  bubble.style.boxShadow = '2px 2px 6px rgba(0, 0, 0, 0.2)';
  bubble.style.zIndex = '1002';
  bubble.style.pointerEvents = 'none'; // Let mouse events pass through

  // Placeholder content
  bubble.innerHTML = '<em>Explanation will appear here...</em>';

  document.body.appendChild(bubble);

  // ✅ Global method for updating content later
  window.setTextBubbleContent = function (html) {
    bubble.innerHTML = html;
  };
});
