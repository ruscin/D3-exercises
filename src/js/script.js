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
];

let fillColors = ["#448aff", "#880015", "#ff7d27", "#22b14d", "#b434c2"];

//SVG size
const w = 500;
const h = 530;

//SVG margins, paddings, etc.
const leftSvgMargin = 5;
const blankSpaceBottom = 30;

//bars
const barMargin = 10;

//labels
let LabelsOn = true;

const countPositions = (data, chartType) => {
  const Positions = data.map((el, index) => {
    const barWidth = w / dataset.length;
    let store = [];
    let counter = 0;

    if (chartType === "barChart") {
      const calc = (el.value * (h - 30)) / 100;
      const obj = {
        bar: {
          y: h - calc - blankSpaceBottom,
          x: index * barWidth + leftSvgMargin,
          value: calc,
          width: barWidth - barMargin,
          name: el.id,
          fill: fillColors[0],
        },
        idLabel: {
          y: h - 10,
          x: index * barWidth + barWidth / 2,
          name: el.id,
        },
        valueLabel: {
          y: h - calc - blankSpaceBottom - 4,
          x: index * barWidth + leftSvgMargin,
          name: el.value,
          fill: "black",
        },
      };
      if (el.value > 97) {
        obj.valueLabel.y += 24;
        obj.valueLabel.fill = "white";
      }
      store.push(obj);
    }
    if (chartType === "stackedChart") {
      const valuesAmount = el.values.length;

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
        console.log("wartosc", obj.bar.value);
        console.log("y bara", obj.bar.y);
        console.log("y labela", obj.valueLabel.y);
        store.push(obj);
      }
      counter = 0;
    }
    return store;
  });
  return Positions.flat();
};

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

const draw = (data, areLabelsOn) => {
  const g = svg.selectAll("g").data(data).enter().append("g");

  g.append("rect")
    .attr("x", (d) => d.bar.x)
    .attr("y", (d) => d.bar.y)
    .attr("width", (d) => d.bar.width)
    .attr("height", (d) => d.bar.value)
    .attr("fill", (d) => d.bar.fill)
    .attr("class", "bar");

  if (areLabelsOn === true) {
    g.append("text")
      .attr("text-anchor", "middle")
      .attr("x", (d) => d.idLabel.x)
      .attr("y", (d) => d.idLabel.y)
      .text((d) => d.idLabel.name);

    g.append("text")
      .attr("text-anchor", "middle")
      .attr("x", (d) => d.idLabel.x)
      .attr("y", (d) => d.valueLabel.y)
      .text((d) => d.valueLabel.name)
      .attr("fill", (d) => d.valueLabel.fill);
  }
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const callDraw = () => {
  const drawer = countPositions(dataset, "barChart");
  svg.selectAll("*").remove();
  draw(drawer, LabelsOn);
};

const addBar = () => {
  dataset.push({
    value: randomNumber(1, 100),
    id: "y" + String(dataset.length + 1),
  });

  callDraw();
};

const deleteBar = () => {
  dataset.pop();
  callDraw();
};

const switchLabels = () => {
  LabelsOn = !LabelsOn;
  callDraw();
};

const generateNumbers = () => {
  dataset.forEach((el) => (el.value = randomNumber(1, 100)));
  callDraw();
};

const changeChart = () => {};

const kotek = countPositions(stackedDataset, "stackedChart");
const piesek = countPositions(dataset, "barChart");

//draw(piesek, LabelsOn);
console.log(kotek);
draw(kotek, LabelsOn);
