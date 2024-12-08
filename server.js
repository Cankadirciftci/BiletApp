import {port, env, uri} from './src/config/env/index.js';
import mongoose from 'mongoose';
import app from './src/app.js';

async function connectToDB() {
    try {
        await mongoose.connect(uri);
        console.log('🥂 Connected to MongoDB');
    } catch (error) {
        console.error(`❌ Error connecting to MongoDB: ${error.message}`);
    }
}

const start = async () => {
    try {
        await connectToDB();
        app.listen(port);
        if(env.development){
            console.log(`🚀 Server running at http://localhost:${port}`);
        }
    } catch (error) {
        console.error(`❌ Error starting server: ${error.message}`);
    }
}
start();