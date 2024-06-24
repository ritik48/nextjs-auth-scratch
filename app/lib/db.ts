import mongoose from "mongoose";

const connection: { isConnected?: number } = {};

const connectDb = async () => {
    if (connection.isConnected) {
        console.log("using existing connection");
        return;
    }

    console.log("Nex Connection");
    const db = await mongoose.connect(
        "mongodb://127.0.0.1:27017/nextjs-auth-scratch"
    );
    connection.isConnected = db.connections[0].readyState;
};

export { connectDb };
