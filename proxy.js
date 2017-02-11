var express = require('express'),
    httpProxyMiddleware = require('http-proxy-middleware');

// use the configured `proxy` in web server
var app = express();
var appProxy = httpProxyMiddleware('/jss',{target:'http://localhost:8082'});
app.use('/jss',appProxy);
app.use(httpProxyMiddleware('/', { target: 'http://localhost:3008'}));
app.listen(3000, function () {
    console.log('===');
    console.log('=== Ignore localhost:3008, use localhost:3000/niku & localhost:3000/ ===');
    console.log('===');
});
