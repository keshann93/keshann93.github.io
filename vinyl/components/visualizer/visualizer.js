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
/// <reference path="../../../../tools/typings/angular2/angular2" />
var angular2_1 = require("angular2/angular2");
var audioFileParser_1 = require("components/visualizer/audioFileParser");
var audioProcessor_1 = require("components/visualizer/audioProcessor");
var visualRenderer_1 = require("components/visualizer/visualRenderer");
var trackInfoReader_1 = require("components/visualizer/trackInfoReader");
var timeline_1 = require("components/timeline/timeline");
var Visualizer = (function () {
    function Visualizer() {
        var _this = this;
        this.fileInfoReady = function (data) {
            debugger;
            _this.title = data.Title;
            _this.artist = data.Artist;
        };
        this.timeline = new timeline_1.Timeline();
        this.visualRenderer = new visualRenderer_1.VisualRenderer('visualizerCanvas');
        this.audioProcessor = new audioProcessor_1.AudioProcessor(this.visualRenderer, this.timeline);
        this.audioFileParser = new audioFileParser_1.AudioFileParser(this.audioProcessor);
        this.trackInfoReader = new trackInfoReader_1.TrackInfoReader();
        this.registerEvents();
    }
    Visualizer.prototype.registerEvents = function () {
        document.body.addEventListener("dragover", function (e) {
            e.stopPropagation();
            e.preventDefault();
            e.dataTransfer.dropEffect = 'copy';
        }, false);
        document.body.addEventListener("drop", function (e) {
            e.stopPropagation();
            e.preventDefault();
            //get the file
            var file = e.dataTransfer.files[0];
            this.audioFileParser.parse(file);
            debugger;
            this.trackInfoReader.Read(file, this.fileInfoReady);
        }.bind(this), false);
    };
    Visualizer = __decorate([angular2_1.Component({
        selector: 'visualizer'
    }), angular2_1.View({
        templateUrl: "components/visualizer/visualizer.html"
    })], Visualizer);
    return Visualizer;
})();
exports.Visualizer = Visualizer;

//# sourceMappingURL=../../components/visualizer/visualizer.js.map