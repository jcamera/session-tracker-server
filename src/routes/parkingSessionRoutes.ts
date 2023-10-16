import express, {Request, Response} from 'express';
import { getParkingSessions, createParkingSession, updateParkingSession } from '../handlers/parkingSessionHandler.js';
import { authMiddleware } from '../utils/auth.ts';

const router = express.Router()

/** for local non-auth demo can comment out */
router.use(authMiddleware); //add auth middleware for these routes

router.get('/', getParkingSessions );

router.post('/', createParkingSession );

router.put('/:parking_session_id', updateParkingSession );

export default router;