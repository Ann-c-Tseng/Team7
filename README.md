# Chess Web App with MERN stack
Current team: Parker Gutierrez

Directions for local usage: 
1. Clone the repository.
2. Type: `cd chess-website`, `cd client`, then `npm install` to navitage to the client folder and install client packages.
3. Type: `cd ../server`, then `npm install` to navigate to the server folder and install server packages.
4. For the site's full features to work properly, it must be connected to a mongoDB database:
- in the server directory, create a .env file.
- inside, create a DATABASE_ACCESS variable, and set it to a valid mongoDB connection string.
5. Next, navigate to both the client and server directories and type `npm start` in each.
6. Make an account to view the full features of the website. 
7. Once you play some games you can view them in the history page. 
8. To play against yourself, comment out lines 46-51 in /chess-website/server/chess/matchmaking.js
9. Open up two tabs and play!

Original Team: Parker Gutierrez, Ann Tseng, Saunder VanWoerden, Suhyun Ban

No longer actively maintained. Archived on 6/18/2024
