const dotenv = require('dotenv');

dotenv.config();
module.exports.getEnvVars = () => ({
    'NODE_ENV': process.env.NODE_ENV,
    'DB': process.env.DB
});
