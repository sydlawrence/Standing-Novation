I've just realised I've not written a post in a while, well 4 weeks exactly. That is pretty shameful. I'd forgive you if you thought that development of Standing Novation had halted. However, I can confirm this is well and truly not the case.

So, in my last update I announced that I now had Tetris working. Well here's what I've done since then:


## Standalone Unit

Standing Novation is now a complete stand alone unit. It no longer needs my laptop to run it. There's no mouse, no keyboard, and no screen. So how does it run? Simple, I've hooked up a mac mini to it with the necessary software. I tried to get it working smoothly on a raspberry pi, however after numerous failed attempts and better research into the raspberry pi, it just seems as though it's not a reliable fit. So I decided to just go out and buy a mac mini for it.

## No keyboard / mouse? So how do you update it?

Simple! I've created a really easy way to restart / update the software necessary to run Standing Novation. If a user presses the top left hand button 10 times in a row, the installation will quit itself, update / download any necessary software, and then restart itself. It's one of this things where even though I made it do what it does, it blows my mind whenever I do it.

Sat on my laptop coding away, and I push an update onto the grid. It's awesome.

## Snake

As start of the classic game pack for Standing Novation I added Tetris, well I've now gone and added Snake. I started off with it being one pixel being one button. But it made the game take FOREVER. As the "map" was just far too big. So I scaled it all up to 2x2 which works really well.

## Audio

My friend and colleague Tom Davenport kindly provided various samples for me to use. The system now makes sounds everytime a mode changes, or on game overs etc.

## Sample Pad

After showing Standing Novation to a few people, who know what the launchpads are, they would often enquire about the lack of sound from it. So I decided to create a really simple sample pad. Upon user press, one of 64 samples of audio are played. Take a look at the mode in the code.

## Emulator

I've spent (wasted) a few days trying to build an emulator for Standing Novation, for people to create modes in the browser. I got nowhere. This will have to happen some other time. But I've decided that the installation is NOT complete with out this, and user generated modes.
