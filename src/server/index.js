const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

//Serve React app
app.use(express.static(path.join(__dirname, '../../build')));
app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, '../../build', 'index.html'));
});
app.use(bodyParser.json({ extended: true }));
app.listen(3000);

//Database API
let items = [];
app
  .get('/items/', (req, res) => {
    res.json(items);
  })
  .post('/items/', (req, res) => {
    items.push(req.body);
    res.json(items);
  })
  .get('/items/:id', (req, res, id) => {
    const item = items.filter((item) => item.id === req.params.id)[0];
    res.json(item);
  })
  .put('/items/:id', (req, res) => {
    let updated;
    items = items.map((item) => {
      if (item.id === req.params.id) {
        updated = { ...item, ...req.body };
        return updated;
      } else {
        return item;
      }
    });
    res.json(updated);
  })
  .delete('/items/:id', (req, res) => {
    items = items.filter((item) => item.id !== req.params.id);
    res.json(items);
  });
