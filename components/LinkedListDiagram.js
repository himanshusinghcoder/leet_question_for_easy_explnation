"use client";

// Draws a singly linked list as a horizontal chain of boxes with arrows.
// If cycleIndex is given, draws a curved arrow from the last node back to it.
export default function LinkedListDiagram({ data, cycleIndex, label }) {
  if (!data || !data.length) {
    return (
      <div className="text-sm text-slate-400 italic py-4 text-center">
        Empty list
      </div>
    );
  }

  const boxWidth = 56;
  const boxHeight = 40;
  const gap = 34;
  const padding = 24;
  const topPadding = cycleIndex != null ? 56 : 24;

  const width = data.length * boxWidth + (data.length - 1) * gap + padding * 2;
  const height = boxHeight + topPadding + 30;

  const xOf = (i) => padding + i * (boxWidth + gap);
  const centerY = topPadding + boxHeight / 2;

  return (
    <div className="overflow-x-auto py-2">
      {label && <div className="text-xs text-slate-400 font-medium mb-2">{label}</div>}
      <svg
        width={width}
        height={height}
        viewBox={`0 0 ${width} ${height}`}
        className="mx-auto block"
      >
        <defs>
          <marker
            id="arrowhead"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 7 3, 0 6" fill="#a5b4fc" />
          </marker>
        </defs>

        {data.map((val, i) => {
          const x = xOf(i);
          const isLast = i === data.length - 1;
          return (
            <g key={i}>
              <rect
                x={x}
                y={topPadding}
                width={boxWidth}
                height={boxHeight}
                rx="10"
                fill="#eef2ff"
                stroke="#a5b4fc"
                strokeWidth="2"
              />
              <text
                x={x + boxWidth / 2}
                y={centerY + 4}
                textAnchor="middle"
                fontSize="13"
                fontWeight="600"
                fill="#3730a3"
              >
                {val}
              </text>
              {!isLast && (
                <line
                  x1={x + boxWidth}
                  y1={centerY}
                  x2={x + boxWidth + gap}
                  y2={centerY}
                  stroke="#a5b4fc"
                  strokeWidth="2"
                  markerEnd="url(#arrowhead)"
                />
              )}
            </g>
          );
        })}

        {cycleIndex != null && cycleIndex >= 0 && cycleIndex < data.length && (
          <path
            d={`M ${xOf(data.length - 1) + boxWidth / 2} ${topPadding}
                C ${xOf(data.length - 1) + boxWidth / 2} ${topPadding - 34},
                  ${xOf(cycleIndex) + boxWidth / 2} ${topPadding - 34},
                  ${xOf(cycleIndex) + boxWidth / 2} ${topPadding}`}
            fill="none"
            stroke="#fb7185"
            strokeWidth="2"
            markerEnd="url(#arrowhead-cycle)"
          />
        )}
        <defs>
          <marker
            id="arrowhead-cycle"
            markerWidth="8"
            markerHeight="8"
            refX="6"
            refY="3"
            orient="auto"
          >
            <polygon points="0 0, 7 3, 0 6" fill="#fb7185" />
          </marker>
        </defs>
      </svg>
    </div>
  );
}
