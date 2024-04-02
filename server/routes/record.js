import { Router } from "express";

const recordRoutes = Router();

import { getDb } from "../db/connection.js";

import { ObjectId } from "mongodb";

const handleGetRecordsOperation = async (request, result) => {
    try {
        let db_connect = getDb("employees");
        const records = db_connect
            .collection("records")
            .find({});

        const allRecords = await records.toArray();

        await result.json(allRecords);
    } catch (error) {
        throw error;
    }
};

recordRoutes.route("/record").get(handleGetRecordsOperation);

const handleGetSpecificRecordOperation = async (request, result) => {
    try {
        let db_connect = getDb();
        let myquery = { _id: new ObjectId(request.params.id) };
        const findRecord = db_connect
            .collection("records")
            .findOne(myquery);
        const record = await findRecord;
        
        await result.json(record);
    } catch (error) {
        throw error;
    }
};

recordRoutes.route("/record/:id").get(handleGetSpecificRecordOperation);

const handleAddRecordOperation = async (request, result) => {
    try {
        let db_connect = getDb();
        let myobj = {
            name: request.body.name,
            position: request.body.position,
            level: request.body.level
        };

        const insertRecord = db_connect.collection("records").insertOne(myobj);
        const insertRecordResult = await insertRecord;

        await result.json(insertRecordResult);
    } catch (error) {
        throw error;
    }
};

recordRoutes.route("/record/add").post(handleAddRecordOperation);

const handleUpdateRecordOperation = async (request, result) => {
    try {
        let db_connect = getDb();
        let myquery = { _id: new ObjectId(request.params.id) };
        let newvalues = {
            $set: {
                name: request.body.name,
                position: request.body.position,
                level: request.body.level
            }
        };

        const updateRecord = db_connect
            .collection("records")
            .updateOne(myquery, newvalues);

        const updateRecordResult = await updateRecord;
        console.log("1 document updated");
        await result.json(updateRecordResult);
    } catch (error) {
        throw error;
    }
};

recordRoutes.route("/update/:id").post(handleUpdateRecordOperation);

const handleDeleteRecordOperation = async (request, result) => {
    try {
        let db_connect = getDb();
        let myquery = { _id: new ObjectId(request.params.id) };
        const deleteRecord = db_connect.collection("records").deleteOne(myquery);

        const deleteRecordResult = await deleteRecord;
        console.log("1 document deleted");
        result.json(deleteRecordResult);
    } catch (error) {
        throw error;
    }
};

recordRoutes.route("/:id").delete(handleDeleteRecordOperation);

export default recordRoutes;