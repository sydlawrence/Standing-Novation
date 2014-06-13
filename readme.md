# Project Title
Standing Novation

## Author
Syd Lawrence ![@sydlawrence](http://twitter.com/sydlawrence) & ![@wemakeawesomesh](http://twitter.com/wemakeawesomesh)

## Images & Videos
![Cover Image](images/cover.jpg?raw=true "Cover Image")
![Tetris GIF](images/example.gif?raw=true "Tetris GIF")

http://www.youtube.com/watch?v=InBHd49HQ4w

## Description
Using Novation Launchpads I've built a large interactive screen with multiple "modes" allowing other developers and members of the general public to create their own creative expressions by using simple code

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

