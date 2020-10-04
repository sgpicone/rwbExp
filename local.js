const port = process.env.PORT || 8000;


const app = require('./src/server.js');

console.log(process.env.DB_HOST);
// Server
app.listen(port, () => {
   console.log(`Listening on: http://localhost:${port}`);
});