import React, { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';
import { TreeNode } from './lib/types';

interface TreeVisualizerProps {
  data: TreeNode | null;
  width?: number;
  height?: number;
}

const TreeVisualizer: React.FC<TreeVisualizerProps> = ({ 
  data, 
  width = 600, 
  height = 500,
}) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [prevData, setPrevData] = useState<TreeNode | null>(null);

  // Helper function to count nodes in a tree
  const countNodes = (node: TreeNode | null): number => {
    if (!node) return 0;
    return 1 + countNodes(node.left) + countNodes(node.right);
  };

  // Helper function to get a flat array of nodes for comparison
  const getFlatNodes = (node: TreeNode | null, path: string = 'root'): {id: string, value: number}[] => {
    if (!node) return [];
    return [
      { id: path, value: node.data },
      ...getFlatNodes(node.left, `${path}-left`),
      ...getFlatNodes(node.right, `${path}-right`)
    ];
  };

  useEffect(() => {
    if (!data || !svgRef.current) return;

    // Track if we have new nodes by comparing with previous data
    const isNewData = prevData === null;
    const prevNodeCount = prevData ? countNodes(prevData) : 0;
    const currentNodeCount = countNodes(data);
    const hasNewNodes = currentNodeCount > prevNodeCount;
    
    // Store current data for next comparison
    setPrevData(data);

    // Get flat node arrays for determining which nodes are new
    const prevFlatNodes = prevData ? getFlatNodes(prevData) : [];
    const currentFlatNodes = getFlatNodes(data);
    const newNodeIds = new Set(
      currentFlatNodes
        .filter(current => !prevFlatNodes.some(prev => prev.id === current.id))
        .map(node => node.id)
    );

    // Clear previous rendering
    d3.select(svgRef.current).selectAll("*").remove();

    // Convert the binary tree to a hierarchical structure for d3
    const getChildren = (node: TreeNode): TreeNode[] => {
      const children: TreeNode[] = [];
      if (node.left !== null) children.push(node.left);
      if (node.right !== null) children.push(node.right);
      return children;
    };

    const root = d3.hierarchy(data, getChildren);
    
    // Add path information to each node for identification
    root.descendants().forEach(node => {
      let pathParts: string[] = [];
      let current: d3.HierarchyNode<TreeNode> | null = node;
      
      while (current) {
        if (current.parent) {
          pathParts.unshift(current === current.parent.children?.[0] ? 'left' : 'right');
        }
        current = current.parent;
      }
      
      const path = pathParts.length > 0 ? `root-${pathParts.join('-')}` : 'root';
      (node as any).nodePath = path;
    });

    // Create a tree layout
    const treeLayout = d3.tree<TreeNode>().size([width - 100, height - 100]);
    
    // Apply the tree layout to our data
    const treeData = treeLayout(root);

    // Create the SVG container
    const svg = d3.select(svgRef.current)
      .attr("width", width)
      .attr("height", height)
      .append("g")
      .attr("transform", `translate(50, 50)`);

    // Add straight links between nodes
    const links = svg.selectAll(".link")
      .data(treeData.links())
      .enter()
      .append("line")
      .attr("class", "link")
      .attr("x1", d => d.source.x)
      .attr("y1", d => d.source.y)
      .attr("x2", d => d.source.x)  // Start lines from parent node
      .attr("y2", d => d.source.y)  // for animation
      .attr("stroke", "#999")
      .attr("stroke-width", 1.5)
      .attr("opacity", d => {
        // Check if target is a new node based on its path
        const isNewLink = newNodeIds.has((d.target as any).nodePath);
        return isNewData ? 1 : (isNewLink ? 0 : 1);
      });
    
    // Animate links to their final position
    links.transition()
      .duration(isNewData ? 0 : 800)
      .delay(isNewData ? 0 : 300)
      .attr("x2", d => d.target.x)
      .attr("y2", d => d.target.y)
      .attr("opacity", 1);

    // Add nodes
    const nodes = svg.selectAll(".node")
      .data(treeData.descendants())
      .enter()
      .append("g")
      .attr("class", "node")
      .attr("transform", d => `translate(${d.x}, ${d.y})`)
      .attr("opacity", d => {
        const isNewNode = newNodeIds.has((d as any).nodePath);
        return isNewData ? 1 : (isNewNode ? 0 : 1);
      });

    // Add node circles
    nodes.append("circle")
      .attr("r", 0)  // Start with radius 0 for animation
      .attr("fill", d => {
        const isNewNode = newNodeIds.has((d as any).nodePath);
        return isNewNode ? "#ff7700" : "#4682B4";  // Highlight new nodes
      })
      .attr("stroke", "#666")
      .attr("stroke-width", 1.5)
      .transition()
      .duration(isNewData ? 400 : 800)
      .attr("r", 20);

    // After initial animation, transition new nodes to regular color
    if (hasNewNodes && !isNewData) {
      nodes.select("circle")
        .transition()
        .delay(1200)
        .duration(600)
        .attr("fill", "#4682B4");
    }

    // Animate node appearance
    nodes.transition()
      .duration(isNewData ? 400 : 800)
      .attr("opacity", 1);

    // Add node labels
    nodes.append("text")
      .attr("dy", ".35em")
      .attr("text-anchor", "middle")
      .attr("fill", "white")
      .attr("opacity", 0)
      .text(d => d.data.data)
      .transition()
      .delay(isNewData ? 200 : 600)
      .duration(400)
      .attr("opacity", 1);

  }, [data, width, height, prevData]);

  return (
    <div className="tree-container">
      <svg ref={svgRef}></svg>
    </div>
  );
};

export default TreeVisualizer;