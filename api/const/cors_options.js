const corsOptions = (origin) => {
    return {
        origin: origin,
        credentials: true,
        methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
        allowedHeaders:['Content-Type', 'Authorization']
    }
   
};

module.exports = corsOptions;