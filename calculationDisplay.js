// calculationDisplay.js: Adds a floating container for showing calculations below the dropdown

document.addEventListener('DOMContentLoaded', () => {
  const calcBox = document.createElement('div');
  calcBox.id = 'calcBox';

  // ✅ Updated styling to sit below the dropdown and grow downward
  calcBox.style.position = 'fixed';
  calcBox.style.top = 'calc(40%)'; // Just below dropdown's 50%-75px positioning
  calcBox.style.right = '145px';
  calcBox.style.width = '350px';         // Match dropdown width
  calcBox.style.background = 'rgba(255,255,255,0.95)';
  calcBox.style.border = '1px solid #ccc';
  calcBox.style.padding = '16px';
  calcBox.style.fontFamily = 'Arial, sans-serif';
  calcBox.style.fontSize = '15px';
  calcBox.style.boxShadow = '2px 2px 10px rgba(0,0,0,0.25)';
  calcBox.style.zIndex = '1000';
  calcBox.style.maxHeight = 'none';
  calcBox.style.overflow = 'visible'; // Let it grow with content

  // Title
  const title = document.createElement('h3');
  title.textContent = 'Calculations';
  title.style.margin = '0 0 12px 0';
  title.style.fontSize = '18px';
  title.style.textAlign = 'center';
  calcBox.appendChild(title);

  // Content area
  const content = document.createElement('div');
  content.id = 'calcContent';
  content.innerHTML = '<em>No calculations yet.</em>';
  calcBox.appendChild(content);

  // Add to DOM
  document.body.appendChild(calcBox);

  // Global update function
  window.updateCalculationBox = function (html) {
    content.innerHTML = html;
  };
});
