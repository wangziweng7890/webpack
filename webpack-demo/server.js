let express = require('express');
let app = express();
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With");
    res.header('Access-Control-Allow-Headers', 'Content-Type');
    next();
});
app.get(/^\//, (req, res) => {
    console.log(req.url)
    res.json(req.url)
});
app.listen('8081', () => {
    console.log('app start')
})