

var ButtonHTML = function(launchpad,x,y) {
    return {
        draw: function() {
            $btn = $("<button data-x='"+x+"' data-y='"+y+"'>"+x+":"+y+"</button>");
            return $btn;
        },
        x: x,
        y: y,
        launchpad: launchpad
    };
};

var LaunchpadHTML = function(x,y) {
    var launchpad = {
        x:x,
        y:y,
        draw: function() {
            var $launchpad = $("<div class='launchpad'/>");
            $('#launchpad').append($launchpad);
            for (var i in this.btns) {
                for (var j in this.btns[i]) {
                    var btn = this.btns[i][j].draw();
                    $launchpad.append(btn);
                }
            }
        }
    };

    var across = 9;
    var down = 9;
    launchpad.btns = [];
    for (var j = 0; j < down; j++) {
        for (var i = 0; i < across; i++) {
            if (!launchpad.btns[i]) launchpad.btns[i] = [];
            launchpad.btns[i][j] = new ButtonHTML(launchpad, j,i);
        }
    }
    return launchpad;

}

var launchpads = [];
$(function() {
    var across = 2;
    var down = 2;
    $('#launchpad').css({width:250*across});
    for (var i =0; i < across*down; i++) {
        var launchpad = new LaunchpadHTML(i%across,Math.floor(i/down));
        launchpad.draw();
    }
})