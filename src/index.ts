import express, {Request, Response} from 'express';
import { WebSocketServer } from 'ws';
import cors from 'cors';
//import { getParkingSessions, createParkingSession, updateParkingSession } from './handlers/parkingSessionHandler.js';
import { uuid } from 'uuidv4';
import parkingSessionRouter from './routes/parkingSessionRoutes.js';

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

//setup parking session routes
app.use('/api/parking_sessions', parkingSessionRouter);

app.get('/ping', (req: Request, res: Response) => {
    res.send('pong');
})

//start http server
const httpServer = app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
  });

//set up websockets global to track connections 
type ConnectionsDict = { [key: string]: WebSocket}
declare global {
    var wsConnections: ConnectionsDict;
}
global.wsConnections = {};

//setup websocket server
const wss = new WebSocketServer({
    noServer: true,
    path: "/ws"
});

//when client attempts to create ws connection we "upgrade" the server
httpServer.on('upgrade', (request, socket, head) => {
    wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
    })
});

//on connect add instance to connection pool
wss.on('connection', (ws: WebSocket) => {
    const connectionId: string = uuid(); 
    wsConnections[connectionId] = ws;

    // ws.on('message', message => {
    //     console.log('message received: ', message);
    // })

    ws.send(JSON.stringify({ message: 'Hi from websockets' }));
});

//wss.on('close', handleClose)
//handle any clean-up here 

export default app; //for testing