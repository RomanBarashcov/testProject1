module.exports = (origin) => {
    return {
        "Access-Control-Allow-Origin": origin,
        "Access-Control-Allow-Methods": "GET, POST, OPTIONS, PUT, PATCH, DELETE",
        "Access-Control-Allow-Headers": "X-Requested-With,content-type,origin,Origin",
        "Access-Control-Allow-Credentials": true
    }
}