const mongoose = require('mongoose');
const Movie = require('./Models/Movie')

require('dotenv').config();

async function findAll() {
    try {
        const movies = await Movie.find({});
        
        for(const movie of movies) {
            const title = movie.title;
            let shortTitle = "";
            
            for(let ctr = 0 ; ctr < title.length ; ctr++) {
                if(title[ctr] === '(' || title[ctr] === ':') break;
                shortTitle += title[ctr];
            }

            movie.shortTitle = shortTitle;

            await movie.save();
            
            console.log("Short Title Added for " + movie.shortTitle)
        }

        console.log("All movies are done, stopping the code execution");
        process.exit();

    }
    catch(err) {
        console.error(err);
    }
}

async function connectToMongoDB() {
    try {
        console.log("Trying to connect to MongoDB");
        await mongoose.connect(process.env.MONGO_URL);
        console.log("Connected to MongoDB");
        findAll();
    }
    catch(err) {
        console.error(err);
    }
}

connectToMongoDB();
