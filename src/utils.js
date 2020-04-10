import data_file from "./data/category-brands.csv";
import * as d3 from "d3";
import _ from "lodash";

// Constants
export const barsShowing = 12;
export const barSize = 48;
export const textSize = 12;
export const labelPadding = 8;

// Canvas layout
const margin = { top: 16, right: 6, bottom: 6, left: 0 };
export const svgCanvas = {
  width: window.innerWidth * 0.8,
  height: margin.top + barSize * barSize + margin.bottom,
};

// Scales
export const x = (value, domainMax) => {
  const scale = d3.scaleLinear(
    [0, domainMax],
    [margin.left, svgCanvas.width - margin.right]
  );
  return scale(value);
};
export const y = d3
  .scaleBand()
  .domain(d3.range(barsShowing + 1))
  .rangeRound([margin.top, margin.top + barSize * (barsShowing + 1 + 0.1)])
  .padding(0.1);

export const createColorMap = async () => {
  const data = await readData();
  const scale = d3.scaleOrdinal(d3.schemeTableau10);
  const industries = _.uniq(_.map(data, (d) => d.category));
  scale.domain(industries);

  const colorMap = new Map();
  _.forEach(industries, (industry) => {
    colorMap.set(industry, scale(industry));
  });
  return colorMap;
};

export const readData = async () => {
  return d3.csv(data_file, d3.autoType);
};

export const rank = (frames) => {
  const rankedData = [];
  for (var frame of frames) {
    const namesAndValues = _.map(frame, (companyInfo) => ({
      name: companyInfo[0].name,
      value: companyInfo[0].value,
      category: companyInfo[0].category,
      date: companyInfo[0].date,
    }));
    const sorted = _.orderBy(namesAndValues, ["value"], ["desc"]);

    for (let i = 0; i < sorted.length; ++i) {
      sorted[i].rank = _.min([barsShowing, i]);
    }

    const makeItAnObject = _.keyBy(sorted, (obj) => obj.name);
    rankedData.push(makeItAnObject);
  }
  return rankedData;
};
