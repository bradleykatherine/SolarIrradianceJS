// sunImage.js
// Adds the sun image to the left of the canvas

const container = document.getElementById('container');

const sunImg = document.createElement('img');
sunImg.id = 'sun';
sunImg.src = '../assets/sun.png'; // adjust if different path

container.insertBefore(sunImg, container.firstChild);
