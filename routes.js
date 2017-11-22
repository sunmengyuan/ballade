var express = require('express');
var router = express.Router();

router.get('/diary_book', function (req, res) {
    res.render('post/diaryBook');
});
router.get('/topic/detail', function (req, res) {
    res.render('post/topic');
});
router.get('/activity/detail', function (req, res) {
    res.render('activity/activity');
});

module.exports = router;
