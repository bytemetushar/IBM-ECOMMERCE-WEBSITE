import app from "./app.js";
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000;

const startServer = async () => {
    try {
        await connectionToDB();
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}...`);
        });
    } catch (error) {
        console.log("Failed to connect database, Try again...", error);
        process.exit(1);
    }
};

startServer();