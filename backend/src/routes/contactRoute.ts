import express from 'express';
import { contactForm } from '../controllers/contactController';

const router = express.Router();

router.post('/contact', contactForm);

export default router;