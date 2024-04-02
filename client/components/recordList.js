import React, { useEffect, useState } from  "react";
import { Link } from "react-router-dom";
import Loader from "./loader";
import { useQuery, gql, useMutation } from "@apollo/client";

const Record = (props) => {
    return (
        <tr>
            <td>{props.record.name}</td>
            <td>{props.record.position}</td>
            <td>{props.record.level}</td>
            <td>
                <Link className="btn btn-link" to={`/edit/${props.record.id}`}>Edit</Link> |
                <button className="btn btn-link"
                    onClick={() => {
                        props.deleteRecord(props.record.id)
                    }}>
                    Delete
                </button>
            </td>
        </tr>
    );
};

export const GET_RECORDS = gql`
    query GetRecords {
        records {
            name
            position
            level
            id
        }
    }
`

const DELETE_RECORD = gql`
    mutation DeleteRecord($id: ID!) {
        deleteRecord(id: $id)
    }
`

export default function RecordList() {
    const { loading, error, data } = useQuery(GET_RECORDS);

    let records = [];
    if (data && data.records) {
        records = data.records;
    }

    const [deleteRecordById] = useMutation(DELETE_RECORD, {
        refetchQueries: [
            GET_RECORDS,
            "GetRecords"
        ]
    });

    async function deleteRecord(id) {
        deleteRecordById({ variables: { id } });
    }

    function recordList() {
        return records.map(record => {
            return (
                <Record
                    record={record}
                    deleteRecord={() => deleteRecord(record.id)}
                    key={record.id}
                />
            );
        });
    }

    return (
        <div>
            <Loader isLoading={loading} />
            <h3>Record List</h3>
            <table className="table table-striped" style={{ marginTop: 20 }}>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Position</th>
                        <th>Level</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>{recordList()}</tbody>
            </table>
        </div>
    );
}