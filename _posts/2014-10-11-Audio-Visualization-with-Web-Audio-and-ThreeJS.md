---
title:  "Audio Visualization with Web Audio and ThreeJS"
categories:
  - Web
tags:
  - ThreeJS
---

{% include toc title="Outline" icon="file-text" %}

## Introduction

HTML 5 allows to do many cool stuff within your browser without depending on external plugins. This post talks about visualizing audio using Web Audio API and Three.js. Web Audio API allows to control audio on the web. For more details on Web Audio, please refer the [MDN page](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API). Three.js, as their website says, A JavaScript 3D Library which makes WebGL simpler. So our intention here is to get the audio data from Web Audio API and using Three.js and its going to be in 3D.

<figure>
	<a href="http://raathigesh.com/images/2014-10-18-Audio%20Visualization%20with%20Web%20Audio%20and%20Three.js/Demo.PNG"><img src="http://raathigesh.com/images/2014-10-18-Audio%20Visualization%20with%20Web%20Audio%20and%20Three.js/Demo.PNG"></a>
</figure>


Let's break it down and focus one task at a time.

- Creating  a Three.js scene and adding required geometry elements
- Reading the sound file content
- Analysing the audio data and rendering the scene

## Demo
Before even starting you can take a look at the end product [here](http://html5audiovisualizer.azurewebsites.net/).

## Create a Three.js scene

To render a 3D scene on the screen we need three main elements as follows.

1. 	A Scene
2. 	A Camera
3.	A Renderer

{% highlight javascript %}
function AudioVisualizer() {
    //Rendering
    this.scene;
    this.camera;
    this.renderer;
    this.controls;
}
{% endhighlight %}

AudioVisualizer class is going to hold all the things we need to make our awesome visualizer to work. Next is to initialize our three.js elements one by one. The below function creates a ThreeJS Scene, a WebGL renderer, a camera and a light. If you want to get into details with ThreeJS, I recommend to read the tutorial from [AeroTwist.com](http://aerotwist.com/tutorials/getting-started-with-three-js/).

{% highlight javascript %}
AudioVisualizer.prototype.initialize = function () {
    //generate a ThreeJS Scene
    this.scene = new THREE.Scene();

    //get the width and height
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;

    //get the renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(WIDTH, HEIGHT);

    //append the rederer to the body
    document.body.appendChild(this.renderer.domElement);

    //create and add camera
    this.camera = new THREE.PerspectiveCamera(40, WIDTH / HEIGHT, 0.1, 20000);
    this.camera.position.set(0, 45, 0);
    this.scene.add(this.camera);

    var that = this;

    //update renderer size, aspect ratio and projection matrix on resize
    window.addEventListener('resize', function () {

        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;

        that.renderer.setSize(WIDTH, HEIGHT);

        that.camera.aspect = WIDTH / HEIGHT;
        that.camera.updateProjectionMatrix();

    });

    //background color of the scene
    this.renderer.setClearColor(0x333F47, 1);

    //create a light and add it to the scene
    var light = new THREE.PointLight(0xffffff);
    light.position.set(-100, 200, 100);
    this.scene.add(light);
};
{% endhighlight %}

Since the 3D scene in place, now we can add 3D geometries to it. createBars function creates BoxGeometries (Cubes) with size 0.5 x 0.5 x 0.5. Each created cubes will be assigned with a random color to make the visualization little more exciting. All the created bars are stored in an array so we can animate them later with the audio data.

{% highlight javascript %}
//create the bars required to show the visualization
AudioVisualizer.prototype.createBars = function () {

    //iterate and create bars
    for (var i = 0; i < this.numberOfBars; i++) {

        //create a bar
        var barGeometry = new THREE.BoxGeometry(0.5, 0.5, 0.5);

        //create a material
        var material = new THREE.MeshPhongMaterial({
            color: this.getRandomColor(),
            ambient: 0x808080,
            specular: 0xffffff
        });

        //create the geometry and set the initial position
        this.bars[i] = new THREE.Mesh(barGeometry, material);
        this.bars[i].position.set(i - this.numberOfBars/2, 0, 0);

        //add the created bar to the scene
        this.scene.add(this.bars[i]);
    }
};
{% endhighlight %}

## Reading sound file content
We now have our 3D scene with custom created 3D bars which will be used to visualize the audio. Next thing is to get the audio file content either from server or from users computer. We can always request a file from server and visualize the sound but it would be much more interesting if users can drag and drop their audio files and see the magic happens before their eyes!

Below piece of code reads the content of the file which user dropped into our browser. I know, HTML 5 is awesome!

{% highlight javascript %}
AudioVisualizer.prototype.handleDrop = function () {
    //drop
    document.body.addEventListener("drop", function (e) {
        e.stopPropagation();

        e.preventDefault();

        //get the file
        var file = e.dataTransfer.files[0];
        var fileName = file.name;

        $("#guide").text("Playing " + fileName);

        var fileReader = new FileReader();

        fileReader.onload = function (e) {
            var fileResult = e.target.result;
            visualizer.start(fileResult); //We didn't implement start() yet!
        };

        fileReader.onerror = function (e) {
          debugger
        };

        fileReader.readAsArrayBuffer(file);
    }, false);
}
{% endhighlight %}

## Analysing audio data and rendering the scene
Now this is the important part. Using the audio data read in the previous step, we are going to present the data using the 3D scene created earlier. In-order to do the visualization, there are some Web Audio elements we need to create and connect. That's right CONNECT!

The elements required are:
1. Audio Context
2. Javascript Node
3. Buffer Source
4. Analyser

These nodes should be connected as shown below. We don't want to get into too details about the functionality of these nodes as we are not planning to do audio production for some Hollywood blockbuster anytime soon ;)

We need to create a script processor. Script Processor is an audio processing node which allows to perform audio processing in JavaScript.

But a word of warning though, According to MDN, Script Processor node is deprecated. You can read more information [here](https://developer.mozilla.org/en-US/docs/Web/API/ScriptProcessorNode).

> Note: As of the August 29 2014 Web Audio API spec publication, this feature has been marked as deprecated, and is soon to be replaced by Audio Workers.

Next is to create a source buffer which is will hold the song. The analyser node is the one which is going to provide us information about the audio in real-time so we can render the 3D scene accordingly.

Let's connect the source buffer to analyser, analyser to javascript node and source buffer to the destination. Destination is basically our speakers. If we don't connect the soruce buffer to the destination, even though we would be able to see the visualization, we won't be able to hear anything.

{% highlight javascript %}
AudioVisualizer.prototype.setupAudioProcessing = function () {
    //get the audio context
    this.audioContext = new AudioContext();

    //create the javascript node
    this.javascriptNode = this.audioContext.createScriptProcessor(2048, 1, 1);
    this.javascriptNode.connect(this.audioContext.destination);

    //create the source buffer
    this.sourceBuffer = this.audioContext.createBufferSource();

    //create the analyser node
    this.analyser = this.audioContext.createAnalyser();
    this.analyser.smoothingTimeConstant = 0.3;
    this.analyser.fftSize = 512;

    //connect source to analyser
    this.sourceBuffer.connect(this.analyser);

    //analyser to speakers
    this.analyser.connect(this.javascriptNode);

    //connect source to analyser
    this.sourceBuffer.connect(this.audioContext.destination);

    var that = this;

    //this is where we animates the bars
    this.javascriptNode.onaudioprocess = function () {

        // get the average for the first channel
        var array = new Uint8Array(that.analyser.frequencyBinCount);
        that.analyser.getByteFrequencyData(array);

        //render the scene and update controls
        visualizer.renderer.render(visualizer.scene, visualizer.camera);

        var step = Math.round(array.length / visualizer.numberOfBars);

        //Iterate through the bars and scale the z axis
        for (var i = 0; i < visualizer.numberOfBars; i++) {
            var value = array[i * step] / 4;
            value = value < 1 ? 1 : value;
            visualizer.bars[i].scale.z = value;
        }
    }

};
{% endhighlight %}

The "onaudioprocess" event of the javascript node will fire repeatdely providing us the audio data as the song plays. In this method, we get the byte frequency data from the analyser, render the scene, interate through the array and change the scale of Z axis according to the data in the array.

## Begin Audio processing

Since we have all the good stuff in place, next up is to start the audio processing. We get the buffer data from the file reader and decode the data using the "audioContext.decodeAudioData" method. This method takes a sucess and failure callback along with buffer as parameters. Once the bugger is processed sucessfully, we need to pass the processed data to the source buffer node that we created earlier and call "start()" on the source buffer to play the song. When the song starts to play, "javascriptNode.onaudioprocess" will be fired repeatdly with the frequency data for that specific time which will render out the beautiful visualization.

{% highlight javascript %}
//start the audio processing
AudioVisualizer.prototype.start = function (buffer) {
    this.audioContext.decodeAudioData(buffer, decodeAudioDataSuccess, decodeAudioDataFailed);
    var that = this;

    function decodeAudioDataSuccess(decodedBuffer) {
        that.sourceBuffer.buffer = decodedBuffer
        that.sourceBuffer.start(0);
    }

    function decodeAudioDataFailed() {
        debugger
    }
};
{% endhighlight %}

## Utilities
This below method generates a random color everytime we call it. Taken from [this](http://stackoverflow.com/questions/1484506/random-color-generator-in-javascript) stackoverflow question.

{% highlight javascript %}
//util method to get random colors to make stuff interesting
AudioVisualizer.prototype.getRandomColor = function () {
    var letters = '0123456789ABCDEF'.split('');
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
{% endhighlight %}

Additionally, as you may have notived in the demo, the scene in interactive. You can rotate, zoom-in and zoom-out in the scene. This is because the demo uses a utility library for Three.js called "OrbitControls.js". You can grab the file [here](https://gist.github.com/mrflix/8351020).

In order to make the orbital control work with our scene, add the following line to the "initialize" method.

{% highlight javascript %}
    //Add interation capability to the scene
    this.controls = new THREE.OrbitControls(this.camera, this.renderer.domElement);
{% endhighlight %}

and the following line to the "onaudioprocess" method.

 {% highlight javascript %}
   visualizer.controls.update();
{% endhighlight %}

## Code
You can take a look the the full code here.

[https://github.com/Raathigesh/HTML5AudioVisualizer](https://github.com/Raathigesh/HTML5AudioVisualizer)

## Conclusion
This post describes a way to visalize audio data using the WebAudio API and Three.js. As we alreay noticed with JavascriptNode, the HTML 5 specification for WebAudio API is not stable yet. This code could break anytime in the future but I will keep an eye on it. Go crazy and do all kind of cool stuff with HTML 5 and have fun. I really had a great time implementing this piece of code and the result was pretty amazing. Go rock the world with HTML 5 :).

## Reference
* [Three.Js Library](http://threejs.org/)
* [Exploring the HTML5 Web Audio: Visualizing Sound](http://css.dzone.com/articles/exploring-html5-web-audio)
* [3D_Audio_Spectrum_VIsualize](https://github.com/Wayou/3D_Audio_Spectrum_VIsualizer)
