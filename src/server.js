require('dotenv').config();
const app = require('./app');
const initModel = require('./models/initModel');
const { db } = require('./database/config');



db.authenticate()
    .then(() => console.log('Database connected!...🛰️'))
    .catch((err) => console.log(err));

initModel();

db.sync()
    .then(() => console.log('DataBase synchronized!...📡'))
    .catch((err) => console.log(err));

const PORT = process.env.PORT || 3997;
app.listen(PORT, () => { 
    console.log(`Server running on port ${PORT}...🚀`);
});


