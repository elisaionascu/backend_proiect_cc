const vision = require('@google-cloud/vision');
const dotenv = require('dotenv');
dotenv.config();

const clientAPI = new vision.ImageAnnotatorClient({
    keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
});

async function detectText(file) {
    try {
        const [result] = await clientAPI.textDetection(file);
        console.log(result.fullTextAnnotation.text);
        return result.fullTextAnnotation.text;
    } catch (err) {
        console.log(err);
        return;
    }
}

async function detectLandMark(image) {
    try {
        const [result] = await clientAPI.landmarkDetection(image);
        console.log(result.landmarkAnnotations);
        return result.landmarkAnnotations[0].description;
    } catch (err) {
        console.log(err);
        return;
    }
}

module.exports = {
    detectText,
    detectLandMark
}