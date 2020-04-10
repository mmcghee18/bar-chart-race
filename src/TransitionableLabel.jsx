import React from "react";
import useD3Transition from "use-d3-transition";

const TransitionableLabel = ({
  x,
  y,
  opacity,
  labelText,
  ...staticAttributes
}) => {
  const { ref, attrState } = useD3Transition({
    attrsToTransitionTo: { x, y, opacity },
    deps: [x, y, opacity],
  });

  return (
    <text
      {...staticAttributes}
      ref={ref}
      x={attrState.x}
      y={attrState.y}
      opacity={attrState.opacity}
    >
      {labelText}
    </text>
  );
};

export default TransitionableLabel;
