const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const customerRouter = require('./customers/customer-router')
const authenticate = require('./customers/authenticate-middleware.js');

const stylistRouter = require('./stylists/stylist-router')

const server = express();

server.use(helmet());
server.use(cors());
server.use(express.json());

server.use('/stylist', stylistRouter);
server.use('/customer', customerRouter)

server.get('/', (req, res) => {
    res.status(200).json({ status: "It's alive!" })
})

module.exports = server;