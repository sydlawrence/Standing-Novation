Standing Novation is coming togther very nicely. Today I started it off by adding a scrolling text method and a static text method:

launchpad.aniamteString(str, rowToAnimate, callback)

and

launchpad.staticText(str)

Static text tries to display all the characters at the same time on the grid, so in it's current form, a maximum of 16 characters.

Once I had static text I could get to work on tetris. (I needed to be able to display "Game over" etc)

I started off making tetris with each "pixel" being 1x1. But this meant that the tetris game was a whopping 32 pixels wide. 32 pixels wide is a *big* game of tetris. And I realised that it was too boring and took to long to play. Thankfully my flat mate Jackson had just got up to go to work, and he came and had a look at it. His suggestion was to make the pixels 2x2. This has really helped, the game is fun to play, and feels much more "classic" tetris.

http://instagram.com/p/k4H6PwoH1m/

Then I just needed to add the theme to it... So I created a method on launchpad to playAudio.

launchpad.playAudio(filename)

http://instagram.com/p/k4KY3GoH3C/

I will need to figure out a better way to get audio more easily into modes, as there needs to be methods to stop the audio, and to get events to loop the audio etc. I'll figure this out another day. But for now, I have tetris working on a massive screen made out of Novation launchpads!!! *happy syd*