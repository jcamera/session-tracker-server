# Session Tracker Server

## local setup

 - git clone to local 
 - cd into dir
 - run `npm install`
 - run `ts-node --esm src/index.ts` for local dev 
   ( if ts-node doesn't work, try `npx tsx src/index.ts`)

## API
- GET  `/api/parking_sessions`   get all sessions
- GET  `/api/parking_sessions?status=ACTIVE`  get sessions with status 
- POST `/api/parking_sessions`    create new session
- PUT  `/api/parking_sessions/[id]`  update existing session
Note: there are a few sample curl commands in curls.txt
Extra user endpoints: 
- POST  `/register`  create a new user
- POST  `/login`      login existing user, generate a jwt
 
## Testing
With the server running (sould say "Server running at http://localhost:8080"), you can then run the client app found here: https://github.com/jcamera/session-tracker-client

**Important:** you can test endpoints without authentication by commenting out this line - https://github.com/jcamera/session-tracker-server/blob/09ce0f656f726cc7c8b3e16c7ff4f95612ab0ebb/src/routes/parkingSessionRoutes.ts#L8 - to remove auth middleware.  If included in your curl commands you'll need to grab the jwt returned from login and add it to the Authorization header (ie "Authorization: Bearer [jwt]")
 
Once client is running, any data changes made through the parking_sessions API will be reflected in the UI through use of WebSockets. 

A live version of this is available at http://demo-client-pontoosuc.s3-website-us-east-1.amazonaws.com/
To see backend changes refleted in live UI you can direct calls to http://34.234.92.182:8080 (with auth header)

