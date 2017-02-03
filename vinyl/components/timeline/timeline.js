/// <reference path="../../../../tools/typings/angular2/angular2" />
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
var angular2_1 = require("angular2/angular2");
var Timeline = (function () {
    function Timeline() {
        debugger;
        this.headElement = document.getElementById("timelineHead");
        this.currentPosition = 0;
    }
    Timeline.prototype.headStep = function (position) {
        this.headElement.style.marginLeft = position + "px";
        this.currentPosition += 1;
    };
    Timeline = __decorate([angular2_1.Component({
        selector: 'timeline'
    }), angular2_1.View({
        templateUrl: "components/timeline/timeline.html"
    })], Timeline);
    return Timeline;
})();
exports.Timeline = Timeline;

//# sourceMappingURL=../../components/timeline/timeline.js.map