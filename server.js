const express = require('express');

const postRouter = require('./posts/postRouter');
const userRouter = require('./users/userRouter');

const server = express();
server.use(express.json());

server.use("/api/posts", postRouter);
server.use("/api/users", userRouter);

server.use(logger);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
  res.status(200).json({environment: process.env.NODE_ENV});
});

//custom middleware

function logger(req, res, next) {
  console.log(`${req.method} from ${req.originalUrl} at ${new Date().toISOString()}`)
  next();
}

module.exports = server;

/*const cors = require('cors)
  server.use(cors());
*/