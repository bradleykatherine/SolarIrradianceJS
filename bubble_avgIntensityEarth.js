// bubble_avgIntensityEarth.js: Loads explanation text only for 'avgIntensityEarth'

document.addEventListener('DOMContentLoaded', () => {
  const selector = document.getElementById('calculationSelector');
  if (!selector || !window.setTextBubbleContent) return;

  const updateBubbleText = () => {
    const selected = window.selectedCalculation;

    if (selected === 'avgIntensityEarth') {
      window.setTextBubbleContent(`
        In this visualization, we see how the total solar power intercepted by Earth — represented by the flat yellow disk — is spread out across the planet’s entire surface. By dividing the power received by the disk by Earth’s total surface area, we calculate the average solar intensity experienced across the globe at a single moment in time.<br><br>
        This approach gives us an accurate average. However, a more mathematically complete method involves integrating the dot product between the incoming sunlight direction and each point’s surface normal vector. This calculation accounts for the continuously changing angle of sunlight across Earth’s curved surface and results in what’s called the “effective area” — the portion of Earth facing the Sun, adjusted for angle. While the dot product method is more scientifically rigorous, both approaches lead to the same outcome.
      `);
    }
    // No default text overwrite — leave it to the default handler or another file
  };

  selector.addEventListener('change', () => {
    setTimeout(updateBubbleText, 50);
  });

  setTimeout(updateBubbleText, 300);
});
