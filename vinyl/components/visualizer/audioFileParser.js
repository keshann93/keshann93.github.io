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
var AudioFileParser = (function () {
    function AudioFileParser(processor) {
        var _this = this;
        this.onFileLoaded = function (e) {
            var fileResult = e.target.result;
            _this.audioProcessor.start(fileResult);
        };
        this.onFileLoadFailed = function (e) {
            debugger;
        };
        this.audioProcessor = processor;
        this.fileReader = new FileReader();
    }
    AudioFileParser.prototype.parse = function (file) {
        this.fileReader.onload = this.onFileLoaded;
        this.fileReader.onerror = this.onFileLoadFailed;
        this.fileReader.readAsArrayBuffer(file);
    };
    return AudioFileParser;
})();
exports.AudioFileParser = AudioFileParser;

//# sourceMappingURL=../../components/visualizer/audioFileParser.js.map