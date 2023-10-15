import {Request, Response} from 'express';
import DB from '../db/db.js';

//when sessions are updated we broadcast message to currently connected clients
const broadcastMessage = (data: Array<object>) => {
    console.log('broadcasting data..');
    for (const key in global.wsConnections) {
        const ws = global.wsConnections[key];
        ws.send(JSON.stringify(data));
    }
}

export async function getParkingSessions (req: Request, res: Response) {
    const { status: statusFilter} = req.query;
    console.log(`calling getParkingSessions, status filter ${statusFilter ?? 'none'}`);

    try {
        const response = await DB.ParkingSession.getAll(statusFilter as string)
        res.json(response);
        return;
    }
    catch (error) {
        console.log('caught error in get all handler: ', error);
        res.status(500).json({ error });
        return;
    }
}

export const createParkingSession = async (req: Request, res: Response) => {
    const { plate_number, status } = req.body;
    console.log(`calling createParkingSession`, {plate_number, status});

    if (!plate_number || !status) {
        res.status(400).json({ message: "missing required fields for new session create"});
        return;
    }

    try {
        const response = await DB.ParkingSession.create({
            plate_number, 
            status
        })
        
        const allResults = await DB.ParkingSession.getAll() as Array<object>;
        broadcastMessage(allResults);

        res.json({response});
        return;
    }
    catch (error) {
        console.log('caught error in create handler: ', error);
        res.status(500).json({ error });
        return;
    }
}

export const updateParkingSession = async (req: Request, res: Response) => {

    const { plate_number, status } = req.body;
    const { parking_session_id: id } = req.params;

    console.log(`calling updateParkingSession`, {id, plate_number, status});

    if (!id || !plate_number || !status) {
        res.status(400).json({ message: "missing required fields for update session"});
        return;
    }

    try {
        const response = await DB.ParkingSession.update({
            id,
            plate_number, 
            status
        })        
        const allResults = await DB.ParkingSession.getAll() as Array<object>;
        broadcastMessage(allResults);
        res.json({response});
        return;
    }
    catch (error) {
        console.log('caught error in update handler: ', error);
        res.status(500).json({ error });
        return;
    }
}

export function deleteParkingSession (req: Request, res: Response): void {
}