const express = require('express');
const mysql = require('mysql');
const router = express.Router();
const connection = require('../db');
const { detectText, detectLandMark } = require('../utils/textDetectionFunction');

router.post('/insertText', (req, res) => {
    console.log(req.body);
    const {
        imageText
    } = req.body;

    if (!imageText) {
        return res.status(400).json({
            error: "All fields are required!"
        })
    }
    connection.query(`INSERT INTO images (imageText) values (${mysql.escape(imageText)})`, (err, result) => {
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