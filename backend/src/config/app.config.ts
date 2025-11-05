import { get } from "http";
import { getEnv } from "../common/utils/get-env";

const appConfig = () => ({
    
   
    NODE_ENV : getEnv("NODE_ENV", "development"),
    FRONTEND_URL:getEnv("FRONTEND_URL", "http://localhost:3000"),
    PORT: getEnv("PORT", "8000"),
    BASE_PATH: getEnv("BASE_PATH", "/api/v1"),
    BASE_URL:getEnv("BASE_URL","http://localhost:8000"),
    MONGO_URI: getEnv("MONGO_URI"),
    JWT:{
        SECRET:getEnv("JWT_SECRET") as string,
        EXPIRES_IN:getEnv("JWT_EXPIRES_IN", "7d") as string,
        REFRESH_SECRET:getEnv("JWT_REFRESH_SECRET") as string,
    REFRESH_EXPIRES_IN:getEnv("JWT_REFRESH_EXPIRES_IN", "30d") as string,
    },
    MAILER_SENDER:getEnv("MAILER_SENDER"),
    RESEND_API_KEY:getEnv("RESEND_API_KEY"),
    PARSER_URL:getEnv("PARSER_URL","http://localhost:9000/api/v1"),
    PARSER_API_KEY:getEnv("PARSER_API_KEY"),
    GOOGLE_CLIENT_ID:getEnv("GOOGLE_CLIENT_ID"),
    GOOGLE_CLIENT_SECRET:getEnv("GOOGLE_CLIENT_SECRET"),
    LINKEDIN_CLIENT_ID:getEnv("LINKEDIN_CLIENT_ID"),
    LINKEDIN_CLIENT_SECRET:getEnv("LINKEDIN_CLIENT_SECRET"),
    


})


export const config = appConfig()