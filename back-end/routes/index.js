var express = require('express');
var router = express.Router();
var config = require('../config/config.js')
var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : config.host,
    user     : config.user,
    password : config.password,
    database : config.database
})

connection.connect();

/* GET home page. */
router.get('/getStudents', (req, res, next) => {
    connection.query('SELECT * FROM students', (error, results, fields) => {
        if (error) throw error;
        res.json(results);
    })
})

router.post('/addStudent', (req, res, next) => {
    var studentToAdd = req.body.name;
    var insertQuery = `INSERT INTO students (name) values (?)`;
    connection.query(insertQuery, [studentToAdd], (error, results, fields) => {
        if (error) throw error;
        connection.query('SELECT * FROM students', (error, results, fields) => {
            if (error) throw error;
            res.json(results);
        })
    })
})

module.exports = router;
