import React from "react";
import useD3Transition from "use-d3-transition";

const TransitionableBar = ({ width, y, opacity, ...staticAttributes }) => {
  const { ref, attrState } = useD3Transition({
    attrsToTransitionTo: { width, y, opacity },
    deps: [width, y, opacity],
  });

  return (
    <rect
      {...staticAttributes}
      ref={ref}
      width={attrState.width}
      y={attrState.y}
      opacity={attrState.opacity}
    />
  );
};

export default TransitionableBar;
