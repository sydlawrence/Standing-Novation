I'm trying to figure out the best way to create an "emulator" of sorts. The plan is that eventually I will have some form of website where people can create their own Standing Novation modes, from which they can build their own modes and test them on an emulator.

So after getting the tetris game working this morning, I decided to work on an "emulator".
http://cl.ly/image/180x3L42463T

I decided to go with angular js for the emulator, thinking that it will be easier to have all the buttons with different states.
So for this, I created various services for Grid, Launchpad, Button etc, which unfortunately means I've got a crap load of duplicate code going on. I resigned myself to the fact that there would be a certain amount of duplicate code. However, in all honesty, angular has turned out to be the worst tool for the job. The current emulator has ridiculously poor performance. And there's also a few things that aren't quite working.

All in all, I think I am going to scrap the current emulator, and build it again. In all honesty however, I'm unsure of the best way to proceed. I'm finally at that point where I need my node code to run on the client side as well. This is "one of the advantages" of using node, however I've never done this before, once i've got that cracked it might be easier to get an emulator working, but for the time being, I've wasted the best part of 6 hours :(

Some days, just don't go to plan.

If anyone has any ideas on the best way to approach this emulator, let me know.