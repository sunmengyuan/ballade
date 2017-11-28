var express = require('express');
var router = express.Router();
var routes = require('./ballade/src/routes.json');

for (let key in routes) {
    router.get(key, function (req, res) {
        res.render(routes[key].template.slice(1).split('.html')[0]);
    });
}

module.exports = router;
