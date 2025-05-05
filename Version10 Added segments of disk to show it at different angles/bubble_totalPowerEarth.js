// bubble_totalPowerEarth.js: Updates the text bubble when 'totalPowerEarth' is selected

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('calculationSelector');
  if (!selector || !window.setTextBubbleContent) return;

  const updateBubbleText = () => {
    const selected = window.selectedCalculation;

    if (selected === 'totalPowerEarth') {
      window.setTextBubbleContent(`
        In this visualization, a flat disk facing incoming sunlight sits directly in front of Earth. 
        This disk has the same diameter as Earth and corresponds to its cross-sectional area. 
        It captures the Sun’s energy that Earth would otherwise intercept. In the previous visualization, 
        we saw how much energy reaches a single square meter at this distance from the Sun. 
        To find the total power Earth receives, we multiply that intensity by the area of this disk. 
        The long shadow extending behind Earth shows that the sunlight absorbed by the disk never reaches 
        the space beyond — that energy has been captured.
      `);
    } else if (!selected || selected === '') {
      window.setTextBubbleContent('<em>Explanation will appear here...</em>');
    }
  };

  selector.addEventListener('change', () => {
    setTimeout(updateBubbleText, 50);
  });

  setTimeout(updateBubbleText, 300);
});
