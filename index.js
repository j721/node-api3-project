// code away!
const server = require('./server.js');

const port = process.env.PORT || 2000;

server.listen(port, () => {
    console.log(`\n*** Server Running on http://localhost:${port} ***\n`);
  });


// server.listen(2000, ()=>{
//     console.log('\n* Server Running on http://localhost:2000 *\n')
// })