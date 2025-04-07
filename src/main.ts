import "./style.css";
import Canvas from "./canvas/Canvas";
import TreeRenderer from "./renderer/TreeRenderer";

const canvas = new Canvas();
canvas.init({
  height: window.innerHeight,
  width: window.innerWidth,
});

const renderer = new TreeRenderer(canvas, 25);
renderer.insert(50);
renderer.update();

function animate() {
  renderer.update();

  requestAnimationFrame(animate);
}
animate();

const onAddNodeButtonClick = () => {
  const addNodeInput = document.querySelector('#addNodeInput') as HTMLInputElement;
  if (!addNodeInput.value) return;
  
  const nodeValue = parseInt(addNodeInput.value);
  addNodeInput.value = '';
  
  canvas.reset();
  renderer.insert(nodeValue);
};

const addNodeButton = document.querySelector('#addNodeButton') as HTMLButtonElement;
addNodeButton.addEventListener('click', onAddNodeButtonClick);
