const screenDimension = [400, 400];

const mainCanvas = document.getElementById('main-canvas') as HTMLCanvasElement;
mainCanvas.width = screenDimension[0];
mainCanvas.height = screenDimension[1];

const ctx = mainCanvas.getContext('2d') as CanvasRenderingContext2D;

console.log("hello world");