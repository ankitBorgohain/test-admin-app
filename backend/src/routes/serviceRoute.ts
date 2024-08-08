import express from "express";

import { getService } from "../controllers/serviceController";

const router = express.Router();

router.get('/services', getService)

export default router;