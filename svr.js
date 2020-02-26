const express = require('express');
const app = express();

app.use(express.static('client', { extensions: ['html'] }));

app.listen(8080);
