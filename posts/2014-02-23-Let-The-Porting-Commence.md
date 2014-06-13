I started porting Standing Novation over from client side javascript to server side javascript today. I say ported, but actually what I really mean is started to rewrite it. One of the main reasons for the rewrite is that

I got a lot less done today that I hoped I would in honesty. However, it's certainly well on it's way.

My dad had previously assisted me with this a while ago, but I never got around to trying it out properly, and unfortunately the SD card he had it on, is now corrupt :(. Don't tell him this however, as I still want to give him credit for it once i've got it nailed. Hopefully he wont notice. And hopefully he wont read this post... He probably will however, so in case he does. SORRY! (sorry for a) not trying it sooner b) for somehow helping the SD card to go corrupt (i don't think i've done anything to it, but there must be some reason it's corrupt))

Thankfully by node midi-launchpad library is making my life quite a lot easier. But it's still not perfect. I've started with just the calibration, making it so that you can tell the system in which orientation the launchpads are, where they are each located etc.

It's working fine for a simple 1x1 grid. Calibration is a breeze ;D but no seriously, my code works. However when adding in a second launchpad and claiming it's a 2x1 grid. The calibration is working fone, but then for some reason I don't have "control" of the [1,0] launchpad, but do have control of the [0,0] launchpad. At first I thought this was down to different devices (I'm using a launchpad and a launchpad S, so slight differences were possible) but nope, when I calibrate it in the other order, [1,0] still fails.

I'm hoping to get it cracked tomorrow however. I have, however, added the code to where I am at in this repo.

My steps are:
- Port over to server side
- Get onto a raspberry pi