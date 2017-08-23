import express from 'express';
import Zillow from 'node-zillow'
const zwsId = 'X1-ZWz1fxrhnzsqob_9wsfl'
const router = express.Router();
import passport from '../config/passport'

// GetZestimate
router.post('/GetZestimate', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetZestimate', {zpid: req.body.zpid, rentzestimate: req.body.rentzestimate})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetSearchResults
router.post('/GetSearchResults', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetSearchResults', {address: req.body.address, citystatezip: req.body.citystatezip, rentzestimate: req.body.rentzestimate})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetChart
router.post('/GetChart', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetChart', {address: req.body.address, 'unit-type': req.body.unitType, width: req.body.width, height: req.body.height, chartDuration: req.body.chartDuration})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetComps
router.post('/GetComps', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetComps', {zpid: req.body.zpid, count: req.body.count, rentzestimate: req.body.rentzestimate})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetDeepComps
router.post('/GetDeepComps', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetDeepComps', {zpid: req.body.zpid, count: req.body.count, rentzestimate: req.body.rentzestimate})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetDeepSearchResults
router.post('/GetDeepSearchResults', (req, res, next) => {
    let zillow = new Zillow(zwsId);

    zillow.get('GetDeepSearchResults', {address: req.body.address, citystatezip: req.body.citystatezip, rentzestimate: req.body.rentzestimate})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

// GetUpdatedPropertyDetails
router.post('/GetUpdatedPropertyDetails', (req, res, next) => {
    let zillow = new Zillow(zwsId);

zillow.get('GetUpdatedPropertyDetails', {zpid: req.body.zpid})
        .then(function (results) {
            res.json(results.response.results.result);
        });
});

module.exports = router;