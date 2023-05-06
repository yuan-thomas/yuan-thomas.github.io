(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div id='#myPlot'></div> 
	`;

	class ColoredBox extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});

const d3 = await import("https://cdn.jsdelivr.net/npm/d3-selection@3/+esm");

const xSize = 500;
const ySize = 500;
const margin = 40;
const xMax = xSize - margin*2;
const yMax = ySize - margin*2;

// Create Random Points
const numPoints = 100;
const data = [];
for (let i = 0; i < numPoints; i++) {
  data.push([Math.random() * xMax, Math.random() * yMax]);
}

// Append SVG Object to the Page
const svg = d3.select("#myPlot")
  .append("svg")
  .append("g")
  .attr("transform","translate(" + margin + "," + margin + ")");

// X Axis
const x = d3.scaleLinear()
  .domain([0, 500])
  .range([0, xMax]);

svg.append("g")
  .attr("transform", "translate(0," + yMax + ")")
  .call(d3.axisBottom(x));

// Y Axis
const y = d3.scaleLinear()
  .domain([0, 500])
  .range([ yMax, 0]);

svg.append("g")
  .call(d3.axisLeft(y));

// Dots
svg.append('g')
  .selectAll("dot")
  .data(data).enter()
  .append("circle")
  .attr("cx", function (d) { return d[0] } )
  .attr("cy", function (d) { return d[1] } )
  .attr("r", 3)
  .style("fill", "Red");

			this.addEventListener("click", event => {
				var event = new Event("onClick");
				this.dispatchEvent(event);
			});
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			if ("color" in changedProperties) {
				this.style["background-color"] = changedProperties["color"];
			}
			if ("opacity" in changedProperties) {
				this.style["opacity"] = changedProperties["opacity"];
			}
		}
	}

	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();