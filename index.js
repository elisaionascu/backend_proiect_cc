const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const router = require('./router/router');

const app = express();
app.use(cors());

//for parsing application-json
app.use(bodyParser.json());

//for parsing application/xwww-
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/detection", router);

const port = process.env.PORT || 8080;

app.listen(port, () => {
    console.log(`Cloud app listening on port ${port}!`)
});