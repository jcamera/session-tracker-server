import request from 'supertest';
import app from '../index.ts';

describe('create parking session test', () => {
    it('should return 400 if missing parameters', async () => {
        const requestBody = {
            plate_number: '',
            status: '',
        }
        const response = await request(app)
            .post('/api/parking_sessions')
            .send(requestBody);
        
        expect(response.status).toEqual(400);
    })
});

describe('update parking session test', () => {
    it('should return 400 if missing parameters', async () => {
        const requestBody = {
            plate_number: 'ABC',
            status: '',
        }
        const response = await request(app)
            .put('/api/parking_sessions/123')
            .send(requestBody);
        
        expect(response.status).toEqual(400);
    })
});