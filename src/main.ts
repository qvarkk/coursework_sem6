import "./style.css";
import Canvas from "./canvas/Canvas";
import TreeRenderer from "./renderer/TreeRenderer";

const canvas = new Canvas();
canvas.resize({
  height: window.innerHeight,
  width: window.innerWidth,
});

const renderer = new TreeRenderer(canvas, 25);

function animate(deltaTime: number) {
  renderer.update(deltaTime);

  requestAnimationFrame(animate);
}
animate(0);

addEventListener('resize', () => {
  canvas.resize({
    height: window.innerHeight,
    width: window.innerWidth,
  });
});

const onAddNodeButtonClick = () => {
  const addNodeInput = document.querySelector('#addNodeInput') as HTMLInputElement;
  if (!addNodeInput.value) return;
  
  const nodeValue = parseInt(addNodeInput.value);
  addNodeInput.value = '';
  
  canvas.reset();
  renderer.insert(nodeValue);
};

const onSearchNodeButtonClick = () => {
  const searchNodeInput = document.querySelector('#searchNodeInput') as HTMLInputElement;
  if (!searchNodeInput.value) return;
  
  const nodeValue = parseInt(searchNodeInput.value);
  
  canvas.reset();
  renderer.search(nodeValue);
};

const onDeleteNodeButtonClick = () => {
  const deleteNodeInput = document.querySelector('#deleteNodeInput') as HTMLInputElement;
  if (!deleteNodeInput.value) return;
  
  const nodeValue = parseInt(deleteNodeInput.value);
  deleteNodeInput.value = '';
  
  canvas.reset();
  renderer.delete(nodeValue);
};

const addNodeButton = document.querySelector('#addNodeButton') as HTMLButtonElement;
addNodeButton.addEventListener('click', onAddNodeButtonClick);

const searchNodeButton = document.querySelector('#searchNodeButton') as HTMLButtonElement;
searchNodeButton.addEventListener('click', onSearchNodeButtonClick);

const deleteNodeButton = document.querySelector('#deleteNodeButton') as HTMLButtonElement;
deleteNodeButton.addEventListener('click', onDeleteNodeButtonClick);