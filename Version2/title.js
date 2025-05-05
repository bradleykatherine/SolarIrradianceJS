document.addEventListener('DOMContentLoaded', () => {
  // Create a title element
  const titleDiv = document.createElement('div');
  titleDiv.id = 'simulationTitle';
  titleDiv.textContent = 'Visualizing Solar Energy Across the Solar System';

  // Style the title to be centered and at the top
  titleDiv.style.textAlign = 'center';
  titleDiv.style.fontSize = '28px';
  titleDiv.style.fontWeight = 'bold';
  titleDiv.style.color = '#333';
  titleDiv.style.padding = '5px 0';
  titleDiv.style.margin = '5';
  titleDiv.style.backgroundColor = 'transparent';
  titleDiv.style.background = 'none';

  // Insert the title at the top of the body
  document.body.insertBefore(titleDiv, document.body.firstChild);
});
