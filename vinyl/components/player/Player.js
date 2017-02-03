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
var visualizer_1 = require("../visualizer/visualizer");
var timeline_1 = require("../timeline/timeline");
var Player = (function () {
    function Player() {
    }
    Player = __decorate([angular2_1.Component({
        selector: 'player'
    }), angular2_1.View({
        templateUrl: "components/player/player.html",
        directives: [visualizer_1.Visualizer, timeline_1.Timeline]
    })], Player);
    return Player;
})();
exports.Player = Player;

//# sourceMappingURL=../../components/player/Player.js.map