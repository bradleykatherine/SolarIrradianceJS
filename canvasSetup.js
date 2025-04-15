// canvasSetup.js
// Adds a centered canvas to the container div with shadow and styling

const container = document.getElementById('container');

const canvas = document.createElement('canvas');
canvas.width = 600;
canvas.height = 600;
canvas.id = 'mainCanvas';

container.appendChild(canvas);

// Future modules can access canvas via: document.getElementById('mainCanvas')
