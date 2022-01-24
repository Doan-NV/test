const mongoose = require('mongoose');

const getMongoURI = () => {
    var connectionURI = `${process.env.DB_PROTOCOL}://${process.env.DB_HOST}/${process.env.DB_DATABASE}?retryWrites=true&w=majority`;
    return connectionURI;
};
async function connect(){
    try {
        const url = getMongoURI();
        const connectOptions = {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            maxPoolSize: process.env.DB_CNN_POOLSIZE || 10,
            serverSelectionTimeoutMS: process.env.DB_SERVER_SELECTION_TIMEOUT || 120000,
            connectTimeoutMS: process.env.DB_CONNECT_TIMEOUT || 60000
        };
        await mongoose.connect(url, connectOptions);
        console.log('connected database success!')
    } catch (error) {
        console.log(error);
    }
}

module.exports = {connect};