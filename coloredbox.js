(function() { 
	let template = document.createElement("template");
	template.innerHTML = `
		<style>
		:host {
			border-radius: 25px;
			border-width: 4px;
			border-color: black;
			border-style: solid;
			display: block;
		} 
		</style> 
		
  
	`;

	class ColoredBox extends HTMLElement {
		constructor() {
			super(); 
			let shadowRoot = this.attachShadow({mode: "open"});
			shadowRoot.innerHTML = `
			<!-- Require the peer dependencies of handpose. -->
			<script src="https://unpkg.com/@tensorflow/tfjs-core@3.7.0/dist/tf-core.js"></script>
			<script src="https://unpkg.com/@tensorflow/tfjs-converter@3.7.0/dist/tf-converter.js"></script>
		  
			<!-- You must explicitly require a TF.js backend if you're not using the tfs union bundle. -->
			<script src="https://unpkg.com/@tensorflow/tfjs-backend-webgl@3.7.0/dist/tf-backend-webgl.js"></script>
		  
			<!-- The main handpose library -->
			<script src="https://unpkg.com/@tensorflow-models/handpose@0.0.7/dist/handpose.js"></script>
		  
			<!-- The fingerpose library -->
			<script type="module" src="fingerpose.js" type="text/javascript"></script>
			<div class="container">
    <div class="video">
      <div id="video-container">
        <video id="pose-video" class="layer" playsinline></video>
        <canvas id="pose-canvas" class="layer"></canvas>
        <div id="pose-result" class="layer"></div>
      </div>
    </div>

    <div class="debug">
      <table class="summary">
        <thead>
          <tr>
            <th>Idx</th>
            <th>Finger</th>
            <th style="width: 110px">Curl</th>
            <th style="width: 170px">Direction</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>0</td>
            <td>Thumb</td>
            <td><span id="curl-0">-</span></td>
            <td><span id="dir-0">-</span></td>
          </tr>
          <tr>
            <td>1</td>
            <td>Index</td>
            <td><span id="curl-1">-</span></td>
            <td><span id="dir-1">-</span></td>
          </tr>
          <tr>
            <td>2</td>
            <td>Middle</td>
            <td><span id="curl-2">-</span></td>
            <td><span id="dir-2">-</span></td>
          </tr>
          <tr>
            <td>3</td>
            <td>Ring</td>
            <td><span id="curl-3">-</span></td>
            <td><span id="dir-3">-</span></td>
          </tr>
          <tr>
            <td>4</td>
            <td>Pinky</td>
            <td><span id="curl-4">-</span></td>
            <td><span id="dir-4">-</span></td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>`;
			this._props = {};
		}

		onCustomWidgetBeforeUpdate(changedProperties) {
			this._props = { ...this._props, ...changedProperties };
		}

		onCustomWidgetAfterUpdate(changedProperties) {
			
		}
		

		async initCamera(width, height, fps) {

		  const constraints = {
			audio: false,
			video: {
			  facingMode: "user",
			  width: width,
			  height: height,
			  frameRate: { max: fps }
			}
		  };

		  //const video = document.querySelector("#pose-video");
		  //video.width = width;
		  //video.height = height;

		  // get video stream
		  const stream = await navigator.mediaDevices.getUserMedia(constraints);
		  video.srcObject = stream;

		  return new Promise(resolve => {
			video.onloadedmetadata = () => { resolve(video) };
		  });
		}  
		
		connectedCallback() {
			
			console.log('Custom square element added to page.');
			
			if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
				console.log("Let's get this party started")
			}
			
			console.log('Custom square element added to page.');
			
			if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
				console.log("Let's get this party started")
			}
			
			const constraints = {
				audio: false,
				video: {
				  facingMode: "user",
				  width: 640,
				  height: 480,
				  frameRate: { max: 30 }
				}
			};

			const video = document.querySelector("#pose-video");
			//video.width = 640;
			//video.height = 480;

			// get video stream
			const stream = navigator.mediaDevices.getUserMedia(constraints);
			//video.srcObject = stream;

			fp = await import('./fingerpose.js');

			// configure gesture estimator
			// add "✌🏻" and "👍" as sample gestures
			const knownGestures = [
				fp.Gestures.VictoryGesture,
				fp.Gestures.ThumbsUpGesture
			];
			const GE = new fp.GestureEstimator(knownGestures);

			// load handpose model
			const model = handpose.load();
			console.log("Handpose model loaded");

			// main estimation loop

		}	
		

/*
		const config = {
		  video: { width: 640, height: 480, fps: 30 }
		};

		const landmarkColors = {
		  thumb: 'red',
		  indexFinger: 'blue',
		  middleFinger: 'yellow',
		  ringFinger: 'green',
		  pinky: 'pink',
		  palmBase: 'white'
		};

		const gestureStrings = {
		  'thumbs_up': '👍',
		  'victory': '✌🏻'
		};

*/



		
	}

	customElements.define("com-sap-sample-coloredbox", ColoredBox);
})();