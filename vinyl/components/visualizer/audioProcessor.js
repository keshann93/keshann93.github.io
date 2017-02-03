var __decorate = this.__decorate || function (decorators, target, key, value) {
    var kind = typeof (arguments.length == 2 ? value = target : value);
    for (var i = decorators.length - 1; i >= 0; --i) {
        var decorator = decorators[i];
        switch (kind) {
            case "function": value = decorator(value) || value; break;
            case "number": decorator(target, key, value); break;
            case "undefined": decorator(target, key); break;
            case "object": value = decorator(target, key, value) || value; break;
        }
    }
    return value;
};
var AudioProcessor = (function () {
    function AudioProcessor(renderer, timeline) {
        var _this = this;
        this.onProcessing = function () {
            var array = new Uint8Array(_this.analyser.frequencyBinCount);
            _this.analyser.getByteFrequencyData(array);
            _this.renderer.render(array);
            _this.timeline.headStep(_this.audioContext.currentTime);
        };
        this.success = function (decodedBuffer) {
            //this.timelineRendere.render(decodedBuffer);
            _this.sourceBuffer.buffer = decodedBuffer;
            _this.sourceBuffer.start(0);
        };
        this.timeline = timeline;
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
        //this is where we animates the bars
        this.javascriptNode.onaudioprocess = this.onProcessing;
        this.renderer = renderer;
    }
    AudioProcessor.prototype.start = function (buffer) {
        this.audioContext.decodeAudioData(buffer, this.success, decodeAudioDataFailed);
        function decodeAudioDataFailed() {
            debugger;
        }
    };
    return AudioProcessor;
})();
exports.AudioProcessor = AudioProcessor;

//# sourceMappingURL=../../components/visualizer/audioProcessor.js.map