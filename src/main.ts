import "./style.css";
import TreeNodeCircle from "./figures/TreeNodeCircle";
import Canvas from "./canvas/Canvas";
import DiagonalArrow from "./figures/DiagonalArrow";

const canvas = new Canvas();
canvas.init({
  height: window.innerHeight,
  width: window.innerWidth,
}, {
  maxZoom: 1.5,
  minZoom: 0.75,
  zoomSpeed: 0.05,
  bounds: true,
});

const circle = new TreeNodeCircle(canvas.context, 200, 200, '99997');
circle.draw();

const arrow = new DiagonalArrow(canvas.context, 200 + (75 * Math.cos(Math.PI * 0.25)), 200 + (75 * Math.sin(Math.PI * 0.25)));
arrow.draw();

const circle2 = new TreeNodeCircle(canvas.context, 355, 429, '99998');
circle2.draw();
