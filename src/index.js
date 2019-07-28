const koa = require('koa');
const Router = new require('koa-router');
const koaBody = require('koa-body');
const fs = require('fs');

const app = new koa();
const router = new Router();


router.post('/ssuser', async (ctx, next) => {
  const accountInfo = ctx.request.body;

  if (!accountInfo.username || !accountInfo.password) {
    ctx.status = 400;
    return;
  }

  fs.appendFileSync('./src/pwd', `${JSON.stringify(ctx.request.body)}\n`, (err) => {
    if (err) throw err;
  });

  ctx.body = `Your account (username: ${accountInfo.username}, password: ${accountInfo.password}) will be created in 10 minutes. Maybe the secret key of the VPN you need to ask SammyLiang. `;
})

app
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

app.listen(8001);
