Twisting (alpha)
==============

Intro
-----

**What is Twisting?**
Twisting is a Twister client

**What is Twister?**
Twister is a peer to peer microblogging platform

**What is a peer to peer microblogging platform?**
It�s like Twitter without a website, Twists (Tweets) are getting downloaded directly from your friends.

Status
------

Be aware that Twisting is in Alpha. All the claims being made on this page are still in development. Although the maintainer is confident enough to put it up here, using Twisting is on your own risk.

Motivation
----------

There are already several good Twister clients. Twisting hopes to improve on those clients with the follow goals:

- Offer a smooth installation and startup experience. The goal is that every Twitter (or other microblogging user) can use the software. This means that during installation and starting Twisting the user should not be confused with technical messages, having to compile the code, or do other technical things. 
- Organized codebase, based on recent web technologies. The main Twister client is written in pure HTML/CSS/Javascript, which is fine, but it is hard to maintain and even harder for newcomers to get into the codebase. By using npm/grunt modules, and Backbone as framework the code should be more easy to understand.
- Have fun developing something new ;-D Yes, I admit that this is the main reason I started working on Twisting

Current features
----------------

- Logging in
- Display feed / postboard
- Display (and cache) avatars
- Open urls in the browser
- Display user profile

Screenshots
-----------

![Twisting Screenshot](https://dl.dropboxusercontent.com/u/1146818/Twister/Screenshots/1.png)


Technology
----------

**NodeWebkit / nw.js** The application is a web application integrated with nw.js. In the codebase the server-client model of nw.js is highly used, so the application won�t run in a browser without a lot of modifications, it makes the code better to read though. Nw.js is chosen because of its fast development speed and web development is the most known technology, and thus is more open for contributors.
**Backbone** The architecture is based on Backbone Views / Models / Collections. Backbone is one of the most known Javascript frameworks.
**Less** CSS gets generated by the use of Less. Switching to SASS is in the planning, because of it being more famous at the moment.
**Grunt** In theory grunt is used for client side modules. At the moment it isn�t really used though. Should be better integrated or removed.

Installation
------------

Installation will be possible from on the first Beta release. For now it is only possible to run Twisting by installing from source.

Installation from source
------------------------

- Download the repo using git
- Run `$ npm install` in the Twisting folder
- Download [the latest NW.js release](http://nwjs.io/ "NW.js")
- Copy the NW.js files into the Twisting root folder
- Download [this zip file](https://dl.dropboxusercontent.com/u/1146818/Twister/twisting-twister-data.zip "Twisting Twister Data") with a Twister Windows build, or use your own
- Install less: `$ npm install -g lessc`
- Compile the Less files to css using: `$ lessc app/styles/main.less > app/styles/style.css`
- Run nw.exe

