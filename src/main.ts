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
const renderer = new TreeRenderer(canvas);

const onAddNodeButtonClick = () => {
  const addNodeInput = document.querySelector('#addNodeInput') as HTMLInputElement;
  if (!addNodeInput.value) return;
  
  const nodeValue = parseInt(addNodeInput.value);
  addNodeInput.value = '';
  
  canvas.reset();
  tree.insert(nodeValue);
  renderer.drawTree(tree);
};

const addNodeButton = document.querySelector('#addNodeButton') as HTMLButtonElement;
addNodeButton.addEventListener('click', onAddNodeButtonClick);