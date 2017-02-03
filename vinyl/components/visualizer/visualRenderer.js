var VisualRenderer = (function () {
    function VisualRenderer(canvasName) {
        this.canvas = new fabric.Canvas(canvasName);
        this.numberOfBars = 200;
        this.bars = new Array();
        for (var index = 0; index < this.numberOfBars; index++) {
            var rect = new fabric.Rect({
                left: 4 * index,
                top: 350,
                fill: 'white',
                width: 2,
                height: 250,
                originY: 'bottom'
            });
            this.bars.push(rect);
            this.canvas.add(rect);
        }
    }
    VisualRenderer.prototype.render = function (dataArray) {
        var step = Math.round(dataArray.length / 200);
        for (var i = 0; i < this.numberOfBars; i++) {
            var value = dataArray[i * step] / 4;
            value = value < 1 ? 1 : value;
            value = value;
            this.bars[i].set({ height: value });
        }
        this.canvas.renderAll();
    };
    return VisualRenderer;
})();
exports.VisualRenderer = VisualRenderer;

//# sourceMappingURL=../../components/visualizer/visualRenderer.js.map