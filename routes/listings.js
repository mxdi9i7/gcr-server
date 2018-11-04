import express from 'express';
import {
    create,
    fetchListingByAgent,
    fetchListings, removeListingByID,
} from '../actions/listings'
import multer from 'multer';
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'asset/img')
    },
    filename: function (req, file, cb) {
        cb(null, Math.random() + '-' + Date.now() + '.jpg')
    }
});

const upload = multer({ storage: storage })
const loginRequired = require('./loginRequired');
const router = express.Router();

/* Upload House Image */

router.post('/create', upload.array('image', {maxCount: 9 }), (req, res) => create(req, res))
router.get('/findByID', (req, res) => fetchListingByAgent(req, res));
router.get('/', (req, res) => fetchListings(req, res));
router.post('/remove', (req, res) => removeListingByID(req, res));
export default router;