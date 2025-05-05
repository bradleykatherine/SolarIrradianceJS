// bubble_intensityAt1AU.js: Updates the text bubble when 'intensityAt1AU' is selected

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
    }
  };

  // Watch for changes in the dropdown
  selector.addEventListener('change', () => {
    setTimeout(updateBubbleText, 50); // Slight delay for state sync
  });

  // Check once on first load
  setTimeout(updateBubbleText, 300);
});
