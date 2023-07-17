const mongoose = require("mongoose");

const connectToDataBase = async () => {
    await mongoose.connect(
        `mongodb+srv://bmalkes:${process.env.DB_PASSWORD}@cluster0.bhjbykd.mongodb.net/HOMECHALLENGE`
    );
};

module.exports = connectToDataBase;
