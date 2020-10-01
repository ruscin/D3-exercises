let dataset = [
  { value: 5, id: "y1" },
  { value: 27, id: "y2" },
  { value: 36, id: "y3" },
  { value: 12, id: "y4" },
  { value: 87, id: "y5" },
  { value: 53, id: "y6" },
  { value: 75, id: "y7" },
  { value: 90, id: "y8" },
  { value: 64, id: "y9" },
  { value: 42, id: "y10" },
  { value: 98, id: "y11" },
];

let stackedDataset = [
  { values: [5, 63, 10, 11, 11], id: "y1" },
  { values: [27, 12, 25, 10, 26], id: "y2" },
  { values: [36, 31, 11, 11, 11], id: "y3" },
  { values: [15, 20, 15, 25, 25], id: "y4" },
  { values: [40, 20, 20, 10, 10], id: "y5" },
  { values: [20, 20, 40, 10, 10], id: "y6" },
  { values: [15, 25, 15, 20, 25], id: "y7" },
  { values: [36, 11, 11, 31, 11], id: "y8" },
  { values: [27, 12, 25, 10, 26], id: "y9" },
  { values: [10, 58, 10, 11, 11], id: "y10" },
  { values: [15, 25, 15, 20, 25], id: "y11" },
];

let fillColors = [
  "#448aff",
  "#880015",
  "#ff7d27",
  "#22b14d",
  "#b434c2",
  "#FFFF00",
  "#808000",
  "#008080",
  "#000080",
  "#C0C0C0",
  "#eee",
  "#eee",
  "#eee",
  "#eee",
  "#eee",
  "#eee",
  "#eee",
  "#eee",
];

//SVG size
const w = 500;
const h = 530;

//SVG margins, paddings, etc.
const leftSvgMargin = 5;
const blankSpaceBottom = 30;

//bars
const barMargin = 10;

//helpers labels

let chartType = 0; //0 - default, bar chart, 1 - stacked chart

const countPositions = (data) => {

  const Positions = data.reduce(
    (acc, el, index) => {
      if (chartType === 0) {
        const barWidth = w / dataset.length;
        const calc = (el.value * (h - 30)) / 100; //multiplier if canvas would not be const size
        acc.bars.push({
          y: h - calc - blankSpaceBottom,
          x: index * barWidth + leftSvgMargin,
          value: calc,
          width: barWidth - barMargin,
          name: el.id,
          fill: fillColors[0],
          id: index,
        });
        acc.idLabels.push({
          y: h - 10,
          x: index * barWidth + barWidth / 2,
          name: el.id,
          id: index,
        });
        acc.valueLabels.push({
          y: h - calc - blankSpaceBottom - 4,
          x: index * barWidth + leftSvgMargin + 15,
          name: el.value,
          fill: "black",
          id: index,
        });

      }
      if (chartType === 1) {
        console.log("TODO");
      }
      return acc;
    },
    { bars: [], idLabels: [], valueLabels: [] }
  );
  console.log("%c positions", "color: blue", Positions);
  console.log("%c only bars", "color:green", Positions.bars);

  /*
  const Positions = data.map((el, index) => {

    if (chartType === 1) {
      const valuesAmount = el.values.length;
      const barWidth = w / stackedDataset.length;

      for (let i = 0; i < valuesAmount; i++) {
        const calc = (el.values[i] * (h - 30)) / 100;
        counter += calc;

        const obj = {
          bar: {
            y: h - counter - blankSpaceBottom,
            x: index * barWidth + leftSvgMargin,
            value: calc,
            width: barWidth - barMargin,
            name: el.id,
            fill: fillColors[i],
          },
          idLabel: {
            y: h - 10,
            x: index * barWidth + barWidth / 2,
            name: el.id,
          },
          valueLabel: {
            y: h - (counter - calc / 2) - blankSpaceBottom + 4,
            x: index * barWidth + leftSvgMargin,
            name: el.values[i],
            fill: "black",
          },
        };

        store.push(obj);
      }
      counter = 0;
    }
    return store;
  });
  return Positions.flat();*/
  return Positions;
};

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

const draw = (data) => {
  const bars = svg.selectAll(".bar").data(data.bars, (d) => d.id);
  bars
    .enter()
    .append("rect")
    .attr("x", (d) => d.x)
    .attr("width", (d) => d.width)
    .attr("height", (d) => 0)
    .attr("fill", (d) => d.fill)
    .attr("class", "bar")
    .attr("y", h - 30);

  bars
    .transition()
    .duration(1000)
    .attr("y", (d) => d.y)
    .attr("height", (d) => d.value);

  bars.exit().remove();

  const idLabels = svg.selectAll(".idLables").data(data.idLabels, (d) => d.id);
  idLabels
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .text((d) => d.name);
  idLabels.exit().remove();

  const valueLabels = svg
    .selectAll(".valueLables")
    .data(data.valueLabels, (d) => d.id);
  valueLabels
    .enter()
    .append("text")
    .attr("text-anchor", "middle")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .text((d) => d.name)
    .attr("fill", (d) => d.fill);

  valueLabels.exit().remove();

  /*const g = svg.selectAll("g").data(data.bars).enter().append("g");

  g.append("rect")
    .attr("x", (d) => d.x)
    .attr("y", (d) => d.y)
    .attr("width", (d) => d.width)
    .attr("height", (d) => d.value)
    .attr("fill", (d) => d.fill)
    .attr("class", "bar");*/

  /*g.append("text")
    .attr("text-anchor", "middle")
    .attr("x", (d) => d.idLabel.x)
    .attr("y", (d) => d.idLabel.y)
    .text((d) => d.idLabel.name);

  g.append("text")
    .attr("text-anchor", "middle")
    .attr("x", (d) => d.idLabel.x)
    .attr("y", (d) => d.valueLabel.y)
    .text((d) => d.valueLabel.name)
    .attr("fill", (d) => d.valueLabel.fill);*/
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randombetween = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const randomInts = (n, min, max, minSum, maxSum) => {
  if (min * n > maxSum || max * n < minSum) {
    throw "Impossible";
  }

  let ints = [];
  while (n--) {
    const thisMin = Math.max(min, minSum - n * max);

    const thisMax = Math.min(max, maxSum - n * min);

    const int = randomNumber(thisMin, thisMax);
    minSum -= int;
    maxSum -= int;
    ints.push(int);
  }
  return ints;
};

const callDraw = () => {
  let drawer;
  if (chartType === 0) drawer = countPositions(dataset);
  else if (chartType === 1) {
    drawer = countPositions(stackedDataset);
  }
  svg.selectAll("*").remove();
  draw(drawer);
};

const addBar = () => {
  if (chartType === 0) {
    dataset.push({
      value: randomNumber(1, 100),
      id: "y" + String(dataset.length + 1),
    });
  } else if (chartType === 1) {
    stackedDataset.push({
      values: randomInts(5, 7, 60, 100, 100),
      id: "y" + String(stackedDataset.length + 1),
    });
  }

  callDraw();
};

const deleteBar = () => {
  if (chartType === 0) {
    dataset.pop();
  } else if (chartType === 1) {
    stackedDataset.pop();
  }

  callDraw();
};

const generateNumbers = () => {
  dataset.forEach((el) => (el.value = randomNumber(1, 100)));

  if (chartType === 1) {
    stackedDataset.forEach((el) => {
      const numbers = randomInts(el.values.length, 7, 90, 100, 100);
      el.values.forEach((item, index, arr) => {
        arr[index] = numbers[index];
      });
    });
  }

  callDraw();
};

const changeChart = () => {
  if (chartType === 1) chartType = 0;
  else chartType = 1;
  callDraw();
};

const changeButtonText = (button_id) => {
  const text = document.getElementById(button_id).firstChild;
  text.data =
    text.data == "pokaz stackchart" ? "pokaz barchart" : "pokaz stackchart";
};

const addStack = () => {
  if (chartType === 1) {
    stackedDataset[stackedDataset.length - 1].values = randomInts(
      stackedDataset[stackedDataset.length - 1].values.length + 1,
      5,
      100,
      100,
      100
    );
  }

  callDraw();
};
const deleteStack = () => {
  if (
    chartType === 1 &&
    stackedDataset[stackedDataset.length - 1].values.length > 1
  ) {
    stackedDataset[stackedDataset.length - 1].values.pop();
    stackedDataset[stackedDataset.length - 1].values = randomInts(
      stackedDataset[stackedDataset.length - 1].values.length,
      5,
      100,
      100,
      100
    );
  }

  callDraw();
};

const finalChart = countPositions(dataset);
console.log("array after countPositions", finalChart);

draw(finalChart);