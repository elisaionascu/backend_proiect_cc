const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');
const { detectText, detectLandMark } = require('../utils/textDetectionFunction');

router.get('/', (req, res) => {
    connection.query("SELECT * FROM messages", (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            messages: result
        })
    })
});

router.post('/', (req, res) => {
    console.log(req.body);
    const {
        senderName,
        senderMail,
        receiverMail,
        messageContent
    } = req.body;

    if (!senderName || !senderMail || !receiverMail || !messageContent) {
        return res.status(400).json({
            error: "All fields are required!"
        })
    }
    connection.query(`INSERT INTO messages (senderName, senderMail, receiverMail, messageContent) values (${mysql.escape(senderName)}, ${mysql.escape(senderMail)}, ${mysql.escape(receiverMail)}, ${mysql.escape(messageContent)})`, (err, result) => {
        if (err) {
            console.log(err);
            return res.send(err);
        }
        return res.json({
            result
        })
    })
});

router.get("/text", async(req, res) => {
    //const { link } = req.body;
    const { link } = req.query;
    console.log(req.query);
    if (!link) {
        console.log(req.query);
        return res.status(400).send("Missing parameters!");
    }
    const textAnnotations = await detectText(link);
    return res.json({
        textAnnotations
    })
})

router.get("/landmark", async(req, res) => {
    //const { link } = req.body;
    const { image } = req.query;
    if (!image) {
        return res.status(400).send("Missing parameters!");
    }
    const landmarkAnnotations = await detectLandMark(image);
    return res.json({
        landmarkAnnotations
    })
})

module.exports = router;