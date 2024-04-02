import { getDb } from "./db/connection.js";
import { ObjectId } from "mongodb";

const resolvers = {
    Record: {
        id: parent => parent.id ?? parent._id
    },
    Query: {
        async record(_, { id }) {
            let collection = await getDb().collection("records");
            let query = { _id: new ObjectId(id) };

            return await collection.findOne(query);
        },
        async records(_, __, context) {
            let collection = await getDb().collection("records");
            const records = await collection.find({}).toArray();
            
            return records;
        }
    },
    Mutation: {
        async createRecord(_, { name, position, level }, context) {
            let collection = await getDb().collection("records");
            const insert = await collection.insertOne({ name, position, level });
            if (insert.acknowledged) {
                return { name, position, level, id: insert.insertedId };
            }

            return null;
        },
        async updateRecord(_, args, context) {
            const id = new ObjectId(args.id);
            let query = { _id: new ObjectId(id) };
            let collection = await getDb().collection("records");
            const update = await collection.updateOne(
                query,
                { $set: { ...args } }
            );

            if (update.acknowledged) {
                const result = await collection.findOne(query);
                
                return result;
            }

            return null;
        },
        async deleteRecord(_, { id }, context) {
            let collection = await getDb().collection("records");
            const dbDelete = await collection.deleteOne({ _id: new ObjectId(id) });

            return dbDelete.acknowledged && dbDelete.deletedCount === 1;
        }
    }
};

export default resolvers;