import app from "./app.js";
import connectionToDB from './config/dbConnection.js';

const PORT = process.env.PORT || 5000;
const startServer = async ()=>{
    try{
        await connectionToDB();
        app.listen(PORT, '127.0.0.1', ()=>{
            console.log(`Server is listening at http://127.0.0.1:${PORT}...`)
        })
    }catch(error){
        console.log("Failed to connect database, Try again...");
        process.exit(1);
    }
}

startServer();