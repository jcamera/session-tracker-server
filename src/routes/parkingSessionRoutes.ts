import express, {Request, Response} from 'express';
import { getParkingSessions, createParkingSession, updateParkingSession } from '../handlers/parkingSessionHandler.js';

const router = express.Router()

router.get('/', getParkingSessions );

router.post('/', createParkingSession );

router.put('/:parking_session_id', updateParkingSession );

export default router;