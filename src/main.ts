import "./style.css";
import Canvas from "./canvas/Canvas";
import TreeRenderer from "./renderer/TreeRenderer";
import BinarySearchTree from "./tree/BinarySearchTree";

const canvas = new Canvas();
canvas.init({
  height: window.innerHeight * 10,
  width: window.innerWidth * 10,
}, {
  maxZoom: 1,
  minZoom: 0.5,
  zoomSpeed: 0.05,
  initialX: 0,
  initialY: window.innerWidth * 5,
  bounds: true,
});

const tree = new BinarySearchTree();
tree.insert(50);
tree.insert(40);
tree.insert(60);

const renderer = new TreeRenderer(canvas);
renderer.drawTree(tree);