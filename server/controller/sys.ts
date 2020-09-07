const path = require('path')

const sendFile = require('koa-sendfile')

module.exports = {
  index: async (ctx:any) => {
    try {
      ctx.body = `
      <form action="/api/sign" method="post">
          <p> name: <input name="name" /></p>
          <p> password: <input name="password" /></p>
          <p> <input type="submit" value="submit" /></p>
      </form>
      `
    } catch (err) { throw err }
  },
  test:async (ctx:any)=>{
    await sendFile(ctx, path.join(__dirname, 'index.html'))
  }
}
