import React from "react";
import TransitionableBar from "./TransitionableBar.jsx";
import TransitionableLabel from "./TransitionableLabel.jsx";
import { x, y, barSize, textSize, labelPadding, barsShowing } from "./utils.js";
import _ from "lodash";
import * as d3 from "d3";

const Bars = (props) => {
  const formatWithCommas = d3.format(",d");

  const { currentFrame, colorMap } = props;
  let domainMax = _.get(props, "domainMax");

  return (
    <>
      {_.map(currentFrame, (company) => {
        const { rank, category, name } = company;
        let value = _.get(company, "value");

        // Prevent irrelevant bars from re-rendering
        if (rank === barsShowing) {
          value = 0;
          domainMax = 0;
        }

        return (
          <React.Fragment key={name}>
            <TransitionableBar
              width={x(value, domainMax)}
              y={y(rank)}
              opacity={rank < barsShowing ? 1 : 0}
              key={name}
              x={x(0, domainMax)}
              height={barSize}
              style={{ fill: colorMap.get(category) }}
            />
            <TransitionableLabel
              x={x(value, domainMax) - labelPadding}
              y={y(rank) + 0.5 * barSize}
              opacity={rank < barsShowing ? 1 : 0}
              labelText={name}
              style={{
                fontSize: textSize,
                textAnchor: "end",
                fontWeight: "bold",
              }}
            />
            <TransitionableLabel
              x={x(value, domainMax) - labelPadding}
              y={y(rank) + 0.5 * barSize + textSize}
              opacity={rank < barsShowing ? 1 : 0}
              labelText={formatWithCommas(value)}
              style={{
                fontSize: textSize,
                textAnchor: "end",
              }}
            />
          </React.Fragment>
        );
      })}
    </>
  );
};

export default Bars;
