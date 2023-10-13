import SQL3 from './sqlite.ts';
import { ParkingSession } from '../models/ParkingSession.ts';

const CRUD = {
    ParkingSession: {
        create: async (parkingSession: ParkingSession) => (
            await SQL3.run(
                `
                INSERT INTO ParkingSession (plate_number, status, created_on)
                VALUES(?, ?, ?)
                `,
                parkingSession?.plate_number, 
                parkingSession?.status,
                (new Date()).toISOString(),
            )
        ),
        update: async (parkingSession: ParkingSession) => (
            await SQL3.run(
                `
                UPDATE ParkingSession 
                SET plate_number = ?, status = ?
                WHERE id = ?
                `,
                parkingSession?.plate_number, 
                parkingSession?.status,
                parkingSession?.id
            )
        ),
        getAll: async (statusFilter='') => (
            statusFilter ? (
                await SQL3.all(
                    `
                    SELECT * FROM ParkingSession
                    WHERE status = '${statusFilter}'
                    ORDER BY id DESC
                    LIMIT 100
                    `
                )
            ) : (
                await SQL3.all(
                    `
                    SELECT * FROM ParkingSession 
                    ORDER BY id DESC
                    LIMIT 100
                    `
                ) 
            )
        ),
    }
};

export default CRUD;