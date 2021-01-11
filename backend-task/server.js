const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

app.get("/api/rates", function (req, res) {
    const base = req.query.base || 'EUR';
    const currency = req.query.currency || '';

    // request for exchange rate
    axios({
        method: 'get',
        url: `https://api.exchangeratesapi.io/latest?base=${base}&symbols=${currency}`
    })
    .then(response => {
        res.json({
            results: response.data
        })
    })
    .catch(err=> {
        if(err.response){
            // if error is as a result of axios request failure
            return res.status(parseInt(err.response.status)).json({
                message: err.response.data.error
            })
        }

        // if error is as a result of server issues
        res.status(500).json({
            message: 'Server Error'
        })
    })
})

const port = process.env.PORT || 3000
app.listen(port, () => console.log("Server is up on port", port));