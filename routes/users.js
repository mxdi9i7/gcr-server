import express from 'express';
import {fetchAllUsers, login} from '../actions/users'
const router = express.Router();

/* Upload House Image */
router.post('/login',(req, res) => login(req, res));
router.post('/register',(req, res) => register(req, res));
router.get('/all', (req, res) => fetchAllUsers(req, res));
export default router;