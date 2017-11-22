var express = require('express');
var router = express.Router();
var routes = require('./ballade/setting/routes.json');

for (var route in routes) {
    router.get(route, function (req, res) {
        res.render(routes[route].template.slice(1).split('.html')[0]);
    });
}

module.exports = router;
