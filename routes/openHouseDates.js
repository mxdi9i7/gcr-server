import express from 'express';
import { createOHD,deleteOHD,updateOHD,queryOHD } from '../actions/openHouseDates'
import multer from 'multer';
var upload = multer({ dest: 'asset/img' })
var loginRequired = require('./loginRequired');
const router = express.Router();

/* Upload House Image */
router.post('/createOHD',(req, res) => createOHD(req, res))
router.post('/deleteOHD',  (req, res) => deleteOHD(req, res))
router.post('/updateOHD', (req, res) => updateOHD(req, res))
router.post('/queryOHD',(req, res) => queryOHD(req, res))
//loginRequired.check_token,
export default router;
