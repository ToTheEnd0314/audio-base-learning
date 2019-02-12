const express = require('express');
const fs = require('fs');

const app = express();

app.get('', (req, res) => {
  fs.readFile('./main/index.html', (err, data) => {
    res.set('Content-Type', 'text/html');
    res.send(data);
    res.end();
  })

});

app.use('/static', express.static(__dirname));


app.listen(3000, err => {
  if (err) console.log(err);
  else console.log('The Server is listening at port: 3000...');
});