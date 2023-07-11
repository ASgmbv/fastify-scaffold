Before starting the server, add .env file to the root folder with following environment variables:
PORT=5000  
NODE_ENV=development
JWT_SECRET=random

To run the server in development environment run "npm run dev" command.

To test the server you can try endpoint: http://localhost:5000/api/v1/users/1.

To run in production environment first run "npm run build" and then "npm run start".
