const express = require('express');
require('dotenv').config();

const app = express();
const port = process.env.PORT;
const route = require('./routes/index');
const cors = require('cors');
app.use(cors());

app.use(express.json());

app.use(express.static(`${__dirname}/public`));

app.use('/api/v1', route);

app.use(express.json());

app.listen(port, () => console.log(`listening on port ${port}`));
