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
  {
    values: [25, 50, 20, 5],
    id: "y1",
    values: [25, 50, 10, 15],
    id: "y2",
    values: [25, 25, 25, 25],
    id: "y3",
    values: [10, 50, 20, 20],
    id: "y4",
    values: [40, 30, 20, 10],
    id: "y5",
  },
];

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

const countPositions = (data) => {
  const Positions = data.map((el, index) => {
    const barWidth = w / dataset.length;
    const calc = (el.value * (h - 30)) / 100;
    const obj = {
      bar: {
        y: h - calc - blankSpaceBottom,
        x: index * barWidth + leftSvgMargin,
        value: calc,
        width: barWidth - barMargin,
        name: el.id,
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
      },
    };
    if (el.value > 97) obj.valueLabel.y += 24;
    return obj;
  });
  return Positions;
};

const svg = d3.select("body").append("svg").attr("width", w).attr("height", h);

const draw = (data, areLabelsOn) => {
  const g = svg.selectAll("g").data(data).enter().append("g");

  g.append("rect")
    .attr("x", (d) => d.bar.x)
    .attr("y", (d) => d.bar.y)
    .attr("width", (d) => d.bar.width)
    .attr("height", (d) => d.bar.value)
    .attr("fill", "#448aff")
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
      .text((d) => d.valueLabel.name);
  }
};

const randomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const callDraw = () => {
  const drawer = countPositions(dataset);
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

const changeChart = () => {

}

const kotek = countPositions(dataset);
draw(kotek, LabelsOn);
