"use client";

// Builds a binary tree from LeetCode-style level-order array notation,
// e.g. [3,9,20,null,null,15,7], then lays it out and draws it as SVG.
function buildTree(arr) {
  if (!arr || !arr.length || arr[0] === null || arr[0] === undefined) return null;
  const root = { val: arr[0], left: null, right: null };
  const queue = [root];
  let i = 1;
  while (queue.length && i < arr.length) {
    const node = queue.shift();
    if (i < arr.length) {
      const leftVal = arr[i++];
      if (leftVal !== null && leftVal !== undefined) {
        node.left = { val: leftVal, left: null, right: null };
        queue.push(node.left);
      }
    }
    if (i < arr.length) {
      const rightVal = arr[i++];
      if (rightVal !== null && rightVal !== undefined) {
        node.right = { val: rightVal, left: null, right: null };
        queue.push(node.right);
      }
    }
  }
  return root;
}

// Assigns x (via in-order index) and y (via depth) to every node, in place.
function layoutTree(node, depth, counter, positions) {
  if (!node) return;
  layoutTree(node.left, depth + 1, counter, positions);
  const x = counter.value++;
  positions.push({ node, x, y: depth });
  layoutTree(node.right, depth + 1, counter, positions);
}

export default function TreeDiagram({ data, label }) {
  const root = buildTree(data);
  if (!root) {
    return (
      <div className="text-sm text-slate-400 italic py-4 text-center">
        Empty tree
      </div>
    );
  }

  const positions = [];
  layoutTree(root, 0, { value: 0 }, positions);

  const spacingX = 56;
  const spacingY = 64;
  const radius = 18;
  const padding = 30;

  const maxX = Math.max(...positions.map((p) => p.x));
  const maxY = Math.max(...positions.map((p) => p.y));
  const width = (maxX + 1) * spacingX + padding * 2;
  const height = (maxY + 1) * spacingY + padding * 2;

  const coordOf = (node) => {
    const p = positions.find((p) => p.node === node);
    return { cx: p.x * spacingX + padding, cy: p.y * spacingY + padding };
  };

  const edges = [];
  positions.forEach(({ node }) => {
    const from = coordOf(node);
    if (node.left) edges.push({ from, to: coordOf(node.left) });
    if (node.right) edges.push({ from, to: coordOf(node.right) });
  });

  return (
    <div className="overflow-x-auto py-2">
      {label && <div className="text-xs text-slate-400 font-medium mb-2">{label}</div>}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block"
      >
        {edges.map((e, i) => (
          <line
            key={i}
            x1={e.from.cx}
            y1={e.from.cy}
            x2={e.to.cx}
            y2={e.to.cy}
            stroke="#c7d2e0"
            strokeWidth="2"
          />
        ))}
        {positions.map(({ node }, i) => {
          const { cx, cy } = coordOf(node);
          return (
            <g key={i}>
              <circle
                cx={cx}
                cy={cy}
                r={radius}
                fill="#eef2ff"
                stroke="#a5b4fc"
                strokeWidth="2"
              />
              <text
                x={cx}
                y={cy + 4}
                textAnchor="middle"
                fontSize="12"
                fontWeight="600"
                fill="#3730a3"
              >
                {node.val}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
