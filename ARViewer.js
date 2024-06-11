(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div id='#myPlot'><iframe src="https://yuan-thomas.github.io/"></iframe></div> 
	`;

	class ARViewer extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});


		}
	}

	customElements.define("com-sap-sample-arviewer", ARViewer);
})();