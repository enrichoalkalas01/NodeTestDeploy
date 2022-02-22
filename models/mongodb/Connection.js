const Mongoose = require('mongoose')

const ConnectDB = async () => {
    try {
        // MongoDB Connection
        const Connect = await Mongoose.connect(
            'mongodb+srv://admin:admin123@learningcluster.bqbx0.mongodb.net/LearnDeploy?retryWrites=true&w=majority',
            { useNewUrlParser: true, useUnifiedTopology: true }
        )

        console.log("MongoDB connected : " + Connect.connection.host)
    } catch(err) {
        console.log(err)
    }
}

module.exports = ConnectDB