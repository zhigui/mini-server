var arguments = process.argv.splice(2);
var PORT = arguments[0] || 8000;
var http = require('http'), url= require("url"), path= require("path"), fs=require("fs"), os=require('os');

var mime = {
    "css": "text/css",
    "gif": "image/gif",
    "html": "text/html",
    "ico": "image/x-icon",
    "jpeg": "image/jpeg",
    "jpg": "image/jpeg",
    "js": "text/javascript",
    "json": "application/json",
    "pdf": "application/pdf",
    "png": "image/png",
    "svg": "image/svg+xml",
    "swf": "application/x-shockwave-flash",
    "tiff": "image/tiff",
    "txt": "text/plain",
    "wav": "audio/x-wav",
    "wma": "audio/x-ms-wma",
    "wmv": "video/x-ms-wmv",
    "xml": "text/xml",
    "mp4": "video/mp4",
    "vtt": "text/vtt"
};
var server = http.createServer(function (request, response) {
    var pathname = url.parse(request.url).pathname;
    var realPath = "./" + pathname;
    fs.exists(realPath, function (exists) {
        if (!exists) {
            response.writeHead(404, {
                'Content-Type': 'text/html'
            });

            response.write('<!DOCTYPE> <html><head> <title>404 Not Found</title> </head><body> <h1>Not Found</h1> <p>The requested URL '+pathname+' was not found on this server.</p> </body></html>');
            response.end();
        } else {
            console.log(realPath);
            fs.readFile(realPath, "binary", function (err, file) {
                if (err) {
                    response.writeHead(500, {
                        'Content-Type': 'text/html'
                    });
                    
                    response.end('<!DOCTYPE> <html><head> <title>500 Internal Server Error</title> </head><body> <h1>Internal Server Error</h1></body></html>');
                } else {
                    var ext = path.extname(realPath);
                        ext = ext ? ext.slice(1) : 'unknown';
                    var contentType = mime[ext] || "text/plain";
                    response.writeHead(200, {'Content-Type': contentType});
                    response.write(file, "binary");
                    response.end();
                }
            });
        }
    });
})
server.listen(PORT);
console.log("Server runing at port: " + PORT + ".");
var ifaces=os.networkInterfaces();
for (var dev in ifaces) {
  var alias=0;
  ifaces[dev].forEach(function(details){
    if (details.family=='IPv4') {
      console.log(dev+(alias?':'+alias:''), 'http://'+ details.address+":"+PORT);
      ++alias;
    }
  });
}