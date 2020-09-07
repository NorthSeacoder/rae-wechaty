const Koa = require('koa')
const bodyParser = require('koa-bodyparser')

const api = require('./server/routes/api')

const app = new Koa()
// Routes
app.use(api.routes(), api.allowedMethods());


app.use(bodyParser())
app.listen(3000)
console.log('已启动: http://127.0.0.1:3000');
