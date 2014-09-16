#Mini Server
Mini Server is a really simple but useful file server base on node.js.
##why need it?
- Due to browser security permissions sometimes it will be unable to load local resourcs...
- I need  debug my project by phone browser. So I need a way to access my project through a local Network Server.
If I use Apache I need config or move/copy my project to server Root directory. It’s too bad :(

##Usage
You should install [Node.js](http://nodejs.org/) first. Then, copy the `server.js` file to your project root directory.

open the Terminal and switch to your project root directory.
```
$ cd project/
$ node server.js
```
The Server will running at port 8000 by default.
Then you can Access your project by the path `http://localhost:8000/filepath.html`. (The server.js will console the avalible host address in the terminal).

###change the server port
You can also change the default port by add the port number:
```
$ node server.js 9999
```

