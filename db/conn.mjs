import { MongoClient } from 'mongodb';

const connectionString = process.env.ATLAS_URI;
console.log(`${connectionString}`);
const client = new MongoClient(connectionString);

let conn;
try {
    conn = await client.connect();

    console.log('Successfully connected to Mongo');
} catch (err) {
    console.log(err);
    throw err;
}

let db = conn.db('sample_training');

export default db;