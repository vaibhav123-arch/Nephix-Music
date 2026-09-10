require("dotenv").config();

const required = ["MONGO_URI","ACCESS_TOKEN_SECRET","REFRESH_TOKEN_SECRET"];
for(const key of required){
    if(!process.env[key]){
        console.error(`missing required env variable : ${key}`);
        process.exit(1);
    }
}
module.exports={
PORT : process.env.PORT || 4451,
nodeEnv : process.env.NODE_ENV || "development",
mongoUri : process.env.MONGO_URI,
corsOrigin : process.env.CORS_ORIGIN || "http://localhost:4450",
accessTokenSecret : process.env.ACCESS_TOKEN_SECRET,
accessTokenExpiry : process.env.ACCESS_TOKEN_EXPIRY || "15 m",
refreshTokenSecret : process.env.REFRESH_TOKEN_SECRET,
refreshTokenExpiry : process.env.REFRESH_TOKEN_EXPIRY || "7d",
googleClientId: process.env.GOOGLE_CLIENT_ID,
youtubeApiKey: process.env.YOUTUBE_API_KEY,
}; 


