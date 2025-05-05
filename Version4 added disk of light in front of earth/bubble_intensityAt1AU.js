// bubble_intensityAt1AU.js: Updates the text bubble for 'intensityAt1AU' or resets it otherwise

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('calculationSelector');
  if (!selector || !window.setTextBubbleContent) return;

  const updateBubbleText = () => {
    const selected = window.selectedCalculation;

    if (selected === 'intensityAt1AU') {
      window.setTextBubbleContent(`
        In the visualization, you see sunlight radiating outward from the Sun in all directions, 
        passing through equal-sized yellow panels placed along each orbital ring. Imagine each of 
        these panels represents one square meter. Although the Sun emits the same total amount of 
        energy in all directions, that energy is spread over a larger and larger area as the 
        distance increases. This means that each panel farther from the Sun receives less energy 
        than one closer in. This decrease in energy per square meter follows the inverse square law — 
        the intensity drops off with the square of the distance. That’s why the sunlight hitting 
        each square meter at Earth’s orbit is weaker than at Venus or Mercury, even though the Sun’s 
        total output remains unchanged.
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
