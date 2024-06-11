(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<div id='#myPlot'><iframe src="https://yuan-thomas.github.io/"></iframe></div> 
	`;

	class ARViewer extends HTMLElement {
		constructor() {
			super(); 
			
	        this._shadowRoot = this.attachShadow({ mode: 'open' })
	        this._shadowRoot.appendChild(template.content.cloneNode(true))

	        this._root = this._shadowRoot.getElementById('root')

	        this._props = {}

	        this.render()

		}
	}

	customElements.define("com-sap-sample-arviewer", ARViewer);
})();
