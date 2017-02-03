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
var timeline = (function () {
    function timeline(canvasName) {
        this.canvas = document.getElementById(canvasName);
    }
    timeline.prototype.render = function (buffer) {
        var context = this.canvas.getContext('2d');
        var leftChannel = buffer.getChannelData(0); // Float32Array describing left channel     
        var lineOpacity = this.canvas.width / leftChannel.length;
        context.save();
        context.fillStyle = '#222';
        context.fillRect(0, 0, this.canvas.width, this.canvas.height);
        context.strokeStyle = '#121';
        context.globalCompositeOperation = 'lighter';
        context.translate(0, this.canvas.height / 2);
        context.globalAlpha = 0.06; // lineOpacity ;
        for (var i = 0; i < leftChannel.length; i++) {
            // on which line do we get ?
            var x = Math.floor(this.canvas.width * i / leftChannel.length);
            var y = leftChannel[i] * this.canvas.height / 2;
            context.beginPath();
            // context.moveTo( x  , 0 );
            context.lineTo(x + 1, y);
            context.stroke();
        }
        context.restore();
    };
    return timeline;
})();
exports.timeline = timeline;

//# sourceMappingURL=../../components/timeline/timelineRenderer.js.map