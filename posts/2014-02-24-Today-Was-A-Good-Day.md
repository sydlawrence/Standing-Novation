Today was a good day... I've been using Rohan's buddhify to help me medetate recently, and this is one of it's statements in one of the sessions. This is the meditation session I have just completed.

But Rohan's correct, today was a good day. Earlier today i practically finished the port of Standing Novation over to server side javascript. There's a few things not yet working, such as displaying text, but that will come. But what I also started working on is the "mode" system, and "api" for people to create their own modes.

This morning i woke up to a tweet from @skattyadz about how allowing people to create their own modes was a good call. So I started working on that. And I manged to get it to something i'm currently happy with, things will change I'm sure. I will also need to create a test framework for people to test out their own modes without access to the launchpad. Which ironically will mean I will need to go back to some browser side code so people can have an "emulator".

Currently creating your own mode consists of:

``
var Mode = require("../standing-novation-mode");

var onPress = function(launchpad, btn){
    console.log("button pressed", btn.globalX, btn.globalY);
}

var onInit = function(launchpad) {
    console.log("this mode is initialising");
}

var onFinish = function(launchpad) {
    console.log("this mode is finishing");
}

module.exports = new Mode("Turbo Disco", onPress, onInit, onFinish);
``

Obviously this is a work in progress. But I'm pretty happy with the outcome.

I also plugged my system into my 4x4 grid. And oh my, I forgot how beautiful this thing was when it is working. It's also massively photogenic. I took some videos of it in action, and I'm going to create a better video of it all over the next few days.

Then tonight, my flat mates, Connor & Jackson got in. Straight away, both of them thought "I wanna make a mode". Jackson started to think about modes, and Connor started making a "tinori" (not sure on spelling) it's the simple fun tone sequencer thing, which is awesome.

However, one thing became totally clear. I need to make testing more easy. An emulator of sorts.

But all in all, today was a good day.