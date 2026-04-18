import  dotenv from "dotenv"

dotenv.config()



if(!process.env.PORT){
    console.log("PORT  is not defined in environment variables");
    
}

if(!process.env.MONGO_URL){
    console.log("MONGO_URL is not defined in environment variables");
    
}

if(!process.env.JWT_SECRET){
    console.log("JWT_SECRET is not defined in environment variables");
    
}


const config = {
    PORT:process.env.PORT,
    MONGO_URL:process.env.MONGO_URL,
    JWT_SECRET:process.env.JWT_SECRET
}

export default config