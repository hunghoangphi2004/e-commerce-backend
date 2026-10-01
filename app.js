const express = require('express');
const app = express();


const router = require('./src/routes/admin/index.routes.js');

app.use(express.json());

app.use(router);

const port = 3000;
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})