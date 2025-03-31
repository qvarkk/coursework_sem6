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
  bounds: true,
});

const tree = new BinarySearchTree();
tree.insert(50);

tree.insert(25);
tree.insert(35);
tree.insert(30);
tree.insert(40);
tree.insert(15);
tree.insert(10);
tree.insert(20);

tree.insert(75);
tree.insert(85);
tree.insert(80);
tree.insert(90);
tree.insert(65);
tree.insert(60);
tree.insert(70);

const renderer = new TreeRenderer(canvas);
renderer.drawTree(tree);