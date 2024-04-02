import { MongoClient } from "mongodb";
const Db = process.env.ATLAS_URI;
const client = new MongoClient(Db);

var _db;

export function connectToServer(callback) {
    try {
        _db = client.db("MernTest");
        if (_db) {
            console.log("Successfully connected to MongoDB.");
        }
    } catch (error) {
        callback(error);
        console.log("Error connecting to MongoDB: " + error);
    }
}

export function getDb() {
    return _db;
}

const connection = {
    connectToServer,
    getDb
};

export default connection;