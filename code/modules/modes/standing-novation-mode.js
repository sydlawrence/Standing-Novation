var Mode = function(name,onInit,onFinish) {

    return function(launchpad) {
        this.launchpad = launchpad;

        this.name = name;
        var that = this;
        this.active = false;

        this.run = function() {
            this.active = true;
            that.launchpad.clear();
            if (onInit) onInit(that.launchpad);
        };

        this.deactivate = function() {
            this.active = false;
            that.launchpad.clear();
            if (onFinish) onFinish(that.launchpad);
        };

        return this;
    };
};

module.exports = Mode;