const corsOptions = {
    origin: false,
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'],
    allowedHeaders:['Content-Type', 'Authorization']
};

module.exports = corsOptions;