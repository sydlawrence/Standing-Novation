# Project Title
Standing Novation

## Author
Syd Lawrence github.com/sydlawrence

## Description
Using Novation Launchpads I intend to build a large interactive screen with multiple "modes" allowing other developers and members of the general public to create their own creative expressions by using simple code

People on the web would be able to submit portions of code to modify the interaction of the screen. There will also be multiple pre made "modes" such as the intstagram viewer, allowing people to send in their own photos to display on a massively pixellated screen. Where the interactive screen is simply used as a display. But then there will be other creative expressions on the other end of the spectrum that simply react to user input from pressing multiple LED buttons.

I'd really like to extend Standing Novation to include the xbox kinect to track user interaction in front of the screen

The project will all be backed by a google app engine system for people to submit their own modes via a browser based emulator.

## Link to Prototype
[Staging Novation](http://global.novationmusic.com/community/news/standing-novation "Standing Novation blog post")

## Example Code
```
var SampleMode = new Mode(function(launchpad){
    this.run = function() {
        launchpad.allLight(Launchpad.colors.green.high);
    }
    launchpad.on("press", function(button) {
        button.light(Launchpad.colors.red.high);
    });
});
```
## Links to External Libraries
[My midi-launchpad node module](https://github.com/sydlawrence/node-midi-launchpad "node midi-launchpad")

## Images & Videos
![Cover Image](images/cover.jpg?raw=true "Cover Image")
![Tetris GIF](images/example.gif?raw=true "Tetris GIF")

http://www.youtube.com/watch?v=InBHd49HQ4w