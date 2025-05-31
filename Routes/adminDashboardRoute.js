// routes/adminStatsRoutes.js
import { Router } from 'express';
const router = Router();
import { getRegisteredFarmersCount } from '../Controllers/dashC.js';
import {protect} from '../middleware/authMiddleware.js';
import { getTotalLandArea } from '../Controllers/dashC.js';
import { getSubsidyStats } from '../Controllers/dashC.js';
import { getCultivatedCropsStats } from '../Controllers/dashC.js';

// GET /api/admin/stats/registered-farmers
router.get('/registered-farmers', protect, getRegisteredFarmersCount);

// GET /api/admin/stats/total-land-area
router.get('/total-land-area', protect, getTotalLandArea);

//GET /api/admin/stats/subsidy-stats
router.get('/subsidies', protect, getSubsidyStats);

// GET /api/admin/stats/cultivated-crops
router.get('/crops',protect, getCultivatedCropsStats);
export default router;
