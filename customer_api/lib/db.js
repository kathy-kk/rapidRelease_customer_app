const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB).then(() => {
    console.log('Successfully conneceted to the database');
}).catch(err => {
    console.log(err);
    console.log('Could not connect to the database. Existing now ...');
    process.exit();
});
