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
///<reference path="trackInfo.ts" />
var trackInfo_1 = require("components/visualizer/trackInfo");
var TrackInfoReader = (function () {
    function TrackInfoReader() {
    }
    TrackInfoReader.prototype.Read = function (file, callBack) {
        var url = file.urn || file.name;
        ID3.loadTags(url, function () {
            var tags = ID3.getAllTags(url);
            var info = new trackInfo_1.TrackInfo();
            info.Title = tags.title;
            info.Artist = tags.artist;
            //debugger
            /* if( "picture" in tags ) {
            var image = tags.picture;
            var base64String = "";
            for (var i = 0; i < image.data.length; i++) {
                base64String += String.fromCharCode(image.data[i]);
            }
            
                var cover  = <HTMLImageElement>document.getElementById("cover");
                cover.src = "data:" + image.format + ";base64," + window.btoa(base64String);
                document.getElementById("cover").style.display = "block";
            }*/
            callBack(info);
        }, { tags: ["artist", "title", "album", "year", "comment", "track", "genre", "lyrics", "picture"],
            dataReader: FileAPIReader(file) });
        /*id3(file, function(err, tags) {
            var info = new TrackInfo();
            info.Title = tags.title;
            info.Artist = tags.artist;
            callBack(info)
        });*/
    };
    return TrackInfoReader;
})();
exports.TrackInfoReader = TrackInfoReader;

//# sourceMappingURL=../../components/visualizer/trackInfoReader.js.map