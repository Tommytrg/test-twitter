/*jshint esversion: 6*/
const express = require('express');
const router = express.Router();
const scrappingcontroller = require('../controllers/scrappedInfo.controller');
const logController = require('../controllers/scrappingLog.controller');
const errorController = require('../controllers/error.controller');
const fakeXRay = require('../controllers/fake-x-ray.controller');
const index = require('../controllers/index.controller');
router.get('/', index.getIndex);
router.get('/fake-x-ray/get-string', fakeXRay.getString);
router.get('/fake-x-ray/get-object', fakeXRay.getObject);
router.get('/fake-x-ray/get-array', fakeXRay.getArray);
router.get('/api/user/:username', scrappingcontroller.getUserInfo);
router.get('/api/log/list', logController.getLogList);
router.get('/*', errorController.notFound);

module.exports = router;
