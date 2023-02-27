require('dotenv').config();

module.exports ={
    apiURL: process.env.API_URL,
    dbUser: process.env.DB_USER,
    dbPassword: process.env.DB_PASSWORD,
    dbHost: process.env.DB_HOST,
    port: process.env.PORT || 3001,
    request: 50
}