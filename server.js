var serve = require('koa-static');
var koa = require('koa');
var app = koa();
var port = 3000;

//app.use(router(app));
app.use(serve('./pub'));
app.listen(port);
console.log('Listening on http://localhost:' + port);
