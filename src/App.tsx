import React, { useState, useRef } from 'react';
import TreeVisualizer from './TreeVisualizer';
import { Tree } from './lib/tree/tree';
import { TreeNode } from './lib/types';

const App: React.FC = () => {
  const tree = useRef<Tree>(new Tree({data: 50, left: null, right: null}));

  const [data, setData] = useState<TreeNode | null>(tree.current.getRoot());

  const handleInsert = () => {
    const newValue = Math.floor(Math.random() * 100);
    tree.current.insert(newValue);

    const deepCopyRoot = JSON.parse(JSON.stringify(tree.current.getRoot()));
    setData(deepCopyRoot);
  };

  return (
    <div className="p-4">
      <div className="mb-4">
        <button 
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          onClick={handleInsert}
        >
          Insert Random Node
        </button>
      </div>
      <TreeVisualizer data={data} />
    </div>
  );
};

export default App;