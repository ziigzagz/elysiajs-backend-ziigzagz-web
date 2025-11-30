require('dotenv/config');
const { Elysia } = require('elysia');
const { node } = require('@elysiajs/node');

async function start() {
  const { default: app } = await import('./dist/index.js');
  
  const port = process.env.PORT || 3000;
  
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

start().catch(console.error);
