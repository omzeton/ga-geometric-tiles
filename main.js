import { default as p5Class } from "p5";
import colors from "nice-color-palettes";
import "./style.css";

const p5 = new p5Class(() => {});

const width = 2540;
const height = 1440;

const res = 4;

const colorPaletteRandomIndex = Math.floor(Math.random() * colors.length);
const colorPalette = colors[colorPaletteRandomIndex];

p5.setup = () => {
  p5.createCanvas(width, height);
};

const circle = (x, y, isFilled) => {
  if (isFilled) {
    p5.noStroke();
    p5.fill(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
  } else {
    p5.noFill();
    p5.stroke(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    p5.strokeWeight(100);
  }
  const size = width / res;
  switch (Math.floor(Math.random() * 4)) {
    case 0:
      p5.circle(x, y, size);
      break;
    case 1:
      p5.circle(x + size, y, size);
      break;
    case 2:
      p5.circle(x, y + height / 2, size);
      break;
    case 3:
      p5.circle(x + size, y + height / 2, size);
      break;
  }
};

const horizontalLine = (x, y) => {
  p5.noFill();
  p5.stroke(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
  p5.strokeCap(p5.SQUARE);
  p5.strokeWeight(100);
  p5.line(x, y, x + width / res, y);
};

const verticalLine = (x, y) => {
  p5.noFill();
  p5.stroke(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
  p5.strokeCap(p5.SQUARE);
  p5.strokeWeight(100);
  const blockWidth = width / res;
  p5.line(x + blockWidth / 2, y, x + blockWidth / 2, y + height / 2);
};

p5.draw = () => {
  p5.noLoop();

  for (let x = 0; x <= width; x += width / res) {
    p5.noStroke();
    p5.fill(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    p5.rect(x, 0, width / res, height / 2);

    switch (Math.floor(p5.random(2))) {
      case 0:
        circle(x, 0, !!Math.floor(p5.random(2)));
        break;
      case 1:
        horizontalLine(x, height / 4);
        break;
      case 2:
        verticalLine(x, 0);
        break;
    }
  }
  for (let x = 0; x <= width; x += width / res) {
    p5.noStroke();
    p5.fill(colorPalette[Math.floor(Math.random() * colorPalette.length)]);
    p5.rect(x, height / 2, width / res, height / 2);

    switch (Math.floor(p5.random(2))) {
      case 0:
        circle(x, height / 2, !!Math.floor(p5.random(2)));
        break;
      case 1:
        horizontalLine(x, (3 * height) / 4);
        break;
      case 2:
        verticalLine(x, height / 2);
        break;
    }
  }
};

p5.keyTyped = () => {
  if (p5.key === "s" || p5.key === "S") {
    p5.saveCanvas(`palette-${colorPaletteRandomIndex}-${new Date().toISOString()}`, "png");
  }
};
