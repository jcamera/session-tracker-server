import SQL3 from './sqlite.ts';
import { ParkingSession } from '../models/ParkingSession.ts';
import { User } from '../models/User.ts';

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
    },
    User: {
        get: async function(user: { email: string}): Promise<User> {
            console.log('User get: ', user);
            const response = await SQL3.get(   
                `
                SELECT * 
                FROM User
                WHERE email = ?
                `,
                // @ts-ignore
                user?.email
            );
            console.log('db get response: ', response)
        
            if (response) { // && response.changes > 0) {
                return response as User;
            }
            return Promise.reject("user not found");
        },
        create: async function(user: User): Promise<User> {
            const response = await SQL3.run(
                `
                INSERT INTO User (username, email, password)
                VALUES(?, ?, ?)
                `,
                user?.username, user?.email, user?.password
            );
        
            console.log('db create response: ', response)
        
            if (response) { // && response.changes > 0) {
                return response as User;
            }
            return Promise.reject("user not created");;
        },
    }
};

export default CRUD;