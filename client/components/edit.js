import { useMutation, gql, useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router";
import Loader from "./loader";

export default function Edit() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: "",
        records: []
    });

    const params = useParams();
    const navigate = useNavigate();
    let [isLoading, setLoading] = useState(false);

    const UPDATE_RECORD = gql`
        mutation UpdateRecord($id: ID!, $name: String, $position: String, $level: String) {
            updateRecord(id: $id, name: $name, position: $position, level: $level) {
                id,
                name,
                position,
                level
            }
        }
    `

    const GET_RECORD = gql`
        query GetRecord($id: ID!) {
            record(id: $id) {
                id,
                name,
                position,
                level
            }
        }
    `
    const [getRecord, { data, loading, error }] = useLazyQuery(GET_RECORD, { variables: { id: params.id.toString() } });

    useEffect(loading => {
        (async () => {
            const { loading, error, data } = await getRecord();
    
            setLoading(loading);
    
            if (!loading && !error && data) {
                const { name, position, level } = data.record;
                setForm({
                    name, 
                    position, 
                    level
                });
            }
        })();
    }, [params.id, navigate, loading]);

    const [updateRecord, updateRecordResult] = useMutation(UPDATE_RECORD, {
        refetchQueries: [
            GET_RECORD,
            "GetRecord"
        ]
    });

    function updateForm(value) {
        return setForm(prev => {
            return {
                ...prev,
                ...value
            };
        });
    }

    async function onSubmit() {
        const { name, position, level } = form;
        const id = params.id.toString();

        updateRecord({ variables: { id, name, position, level } });

        navigate("/");
    }

    return (
        <div>
            <div>
                <Loader isLoading={isLoading} />
            </div>
            <h3>Update Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={(event) => updateForm({ name: event.target.value })}></input>
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position: </label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={(event) => updateForm({ position: event.target.value })}>
                    </input>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionIntern"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={(event) => updateForm({ level: event.target.value })}
                        />
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionJunior"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="positionOptions"
                            id="positionSenior"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={(e) => updateForm({ level: e.target.value })}
                        />
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <br />

                <div className="form-group">
                    <input
                        type="submit"
                        value="Update Record"
                        className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}
