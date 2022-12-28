const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');

const app = express();

app.use(helmet());
app.use(morgan('dev'));
app.use(bodyParser.json());

const notFound = function notFound(req, res, next) {
    res.status(404);
    const error = new Error('Not Found', req.originalUrl);
    next(error);
}
app.use(notFound);

const errHandler = function errorHandler(err, req, res, next){
    res.status(res.statusCode || 500);
    res.json({
        message: err.message,
        stack: err.stack
    });
}
app.use(errHandler);

const items = []

//Get all items
app.get('/', async (req, res, next) => {
    try {
        res.json(items);
    } catch(error) {
        next(error);
    }
});

//New item
app.post('/', async (req, res, next) => {
    try {
        const newItem = req.body;
        //TO-DO: validate item, including ID duplicate
        items.push(newItem)

        res.json({
            message: 'Success'
        });
    } catch(error) {
        next(error);
    }
});

//Update Item
app.put('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        const { selected } = req.body;

        const items = items.map(function(item){
            if(item.id === id){
                item.selected = !item.selected
            }
            else{
                item.selected = false
            }
            return item
        })

        res.json({
            message: 'Success'
        });
    } catch(error) {
        next(error);
    }
});

//Delete item
app.delete('/:id', async (req, res, next) => {
    try {
        const { id } = req.params;
        items = items.filter((item)=>item.id!==id)

        res.json({
            message: 'Success'
        });
    } catch(error) {
        next(error);
    }
});

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});