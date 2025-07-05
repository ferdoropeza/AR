let grid;
let next;

const w = 240;
const h = w;
const step = 125;
const siz = w / step;
const dA = 2.0;
const dB = 1.5;
const feed = 0.055;
const k = 0.062;

let currentDA = dA;
let currentDB = dB;
let currentFeed = feed;
let currentK = k;

const colsURL = [
  'https://coolors.co/palette/ffffff-e03524-f07c12-ffc200-90bc1a-21b534-0095ac-1f64ad-4040a0-903498', // Paleta original
  'https://coolors.co/palette/ffffff-00a896-028090-04bf8a-028090-f2c94c-ff6f61-6b7280-4a5568-2d3748', // Nueva paleta 1
  'https://coolors.co/palette/ffffff-7209b7-f48c06-3a0ca3-4361ee-4cc9f0-ffba08-ffb703-fb5607-8338ec'  // Nueva paleta 2
];
let colors = createCols(colsURL[0]);
let currentPaletteIdx = 0;

function createCols(url) {
  let slaIndex = url.lastIndexOf('/');
  let colStr = url.slice(slaIndex + 1);
  let colArr = colStr.split('-');
  for (let i = 0; i < colArr.length; i++) colArr[i] = '#' + colArr[i];
  return colArr;
}

function setup() {
  createARCanvas(w,h);

  pixelDensity(1);

  grid = [];
  next = [];
  for (let x = 0; x < step; x++) {
    grid[x] = [];
    next[x] = [];
    for (let y = 0; y < step; y++) {
      grid[x][y] = { a: 1, b: 0 };
      next[x][y] = { a: 1, b: 0 };
    }
  }

  const margin = floor(step * 0.1);
  for (let i = margin; i < step - margin; i += 2) {
    for (let j = margin; j < step - margin; j += 2) {
      if ((i + j) % 4 === 0) {
        grid[i][j].b = 0.25 * ((i * j) % 5);
      }
    }
  }
}

function draw() {
  background(255);

  // Cambiar parámetros y paleta cada 300 frames
  if (frameCount % 300 === 0) {
    currentPaletteIdx = (currentPaletteIdx + 1) % colsURL.length;
    colors = createCols(colsURL[currentPaletteIdx]);
    let nextDA = random(1.5, 2.5); // Variar dA
    let nextDB = random(1.0, 2.0); // Variar dB
    let nextFeed = random(0.04, 0.07); // Variar feed
    let nextK = random(0.05, 0.08); // Variar k
    currentDA = lerp(currentDA, nextDA, 0.1);
    currentDB = lerp(currentDB, nextDB, 0.1);
    currentFeed = lerp(currentFeed, nextFeed, 0.1);
    currentK = lerp(currentK, nextK, 0.1);
  }

  for (let x = 1; x < step - 1; x++) {
    for (let y = 1; y < step - 1; y++) {
      let a = grid[x][y].a;
      let b = grid[x][y].b;

      const alp = 0.55;
      const bet = 0.37;
      const gam = 1.0;
      next[x][y].a = a + currentDA * laplaceA(x, y) + a - pow(a, 3) - b;
      next[x][y].b = b + currentDB * laplaceB(x, y) + gam * (a - alp * b - bet + currentFeed - currentK);

      next[x][y].a = constrain(next[x][y].a, 0, 1);
      next[x][y].b = constrain(next[x][y].b, 0, 1);
    }
  }

  translate(siz * 0.5, siz * 0.5);
  noStroke();

  for (let x = 0; x < step; x++) {
    for (let y = 0; y < step; y++) {
      let a = next[x][y].a;
      let b = next[x][y].b;
      let diff = a - b;

      // Mapear diff al índice de la paleta
      let idx = floor(map(diff, -1, 1, 0, colors.length));
      idx = constrain(idx, 0, colors.length - 1);
      fill(colors[idx]);

      circle(x * siz, y * siz, siz);
    }
  }

  swap();

  // Dibujar marco negro
  drawCustomFrame();
}

function laplaceA(x, y) {
  let sumA = 0;
  sumA += grid[x][y].a * -1;
  sumA += grid[x - 1][y].a * 0.2;
  sumA += grid[x + 1][y].a * 0.2;
  sumA += grid[x][y + 1].a * 0.2;
  sumA += grid[x][y - 1].a * 0.2;
  sumA += grid[x - 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y - 1].a * 0.05;
  sumA += grid[x + 1][y + 1].a * 0.05;
  sumA += grid[x - 1][y + 1].a * 0.05;
  return sumA;
}

function laplaceB(x, y) {
  let sumB = 0;
  sumB += grid[x][y].b * -1;
  sumB += grid[x - 1][y].b * 0.2;
  sumB += grid[x + 1][y].b * 0.2;
  sumB += grid[x][y + 1].b * 0.2;
  sumB += grid[x][y - 1].b * 0.2;
  sumB += grid[x - 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y - 1].b * 0.05;
  sumB += grid[x + 1][y + 1].b * 0.05;
  sumB += grid[x - 1][y + 1].b * 0.05;
  return sumB;
}

function swap() {
  let temp = grid;
  grid = next;
  next = temp;
}

function drawCustomFrame() {
  const frameThickness = 10; // Grosor del marco negro
  fill('#000000'); // Marco negro
  noStroke();
  
  // Dibujar el marco como un rectángulo exterior
  rect(0, 0, w, frameThickness); // Parte superior
  rect(0, 0, frameThickness, h); // Parte izquierda
  rect(w - frameThickness, 0, frameThickness, h); // Parte derecha
  rect(0, h - frameThickness, w, frameThickness); // Parte inferior
}
