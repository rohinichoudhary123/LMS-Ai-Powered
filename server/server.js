import app from "./src/app.js";
import config from "./src/config/config.js";
import { connectDb } from "./src/config/db.js";


const port = config.PORT
connectDb()
app.listen(port , ()=>{
    console.log(`Sever IS Running on port ${port}`);
    
})