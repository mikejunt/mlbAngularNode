const express = require('express');
const app = express();
const port = 3000;
const user = require ('./server/routes/user.routes')
const logger = require ('./server/middleware/logger')

app.use(logger)
app.use(bodyParser.json())
app.use(express.static(__dirname + '/dist/mlbAngular/'));

app.use('/api/user', user)
app.get('/', (req, res) => res.sendFile('/dist/mlbAngular/index.html'));
app.get("*", (req,res)=> res.redirect("back"))
app.listen(port, () => console.log(`Server active on localhost:${port}`))