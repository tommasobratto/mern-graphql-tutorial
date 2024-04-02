import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { gql, useMutation } from "@apollo/client";
import { GET_RECORDS } from "./recordList";

export default function Create() {
    const [form, setForm] = useState({
        name: "",
        position: "",
        level: ""
    });

    const navigate = useNavigate();

    const CREATE_RECORD = gql`
        mutation CreateRecord($name: String!, $position: String, $level: String) {
            createRecord(name: $name, position: $position, level: $level) {
                name,
                position,
                level
            }
        }
    `
    const [createRecord, { data, loading, error }] = useMutation(CREATE_RECORD, {
        refetchQueries: [
            GET_RECORDS,
            "GetRecords"
        ]
    });

    if (!loading && !error && data) {
        setForm({ name: "", position: "", level: "" });
        navigate("/");
    }

    function updateForm(value) {
        return setForm(prev => {
            return { ...prev, ...value };
        });
    }

    async function onSubmit(event) {
        event.preventDefault();

        const { name, position, level } = form 
        createRecord({ 
            variables: {
                name,
                position,
                level        
            }
        });

        setForm({ name: "", position: "", level: "" });
        navigate("/");
    }

    return (
        <div>
            <h3>Create New Record</h3>
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={form.name}
                        onChange={event => updateForm({ name: event.target.value })}>
                    </input>
                </div>
                <div className="form-group">
                    <label htmlFor="position">Position</label>
                    <input
                        type="text"
                        className="form-control"
                        id="position"
                        value={form.position}
                        onChange={event => updateForm({ position: event.target.value })}>
                    </input>
                </div>
                <div className="form-group">
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="positionIntern"
                            name="positionOptions"
                            value="Intern"
                            checked={form.level === "Intern"}
                            onChange={event => updateForm({ level: event.target.value })}>
                        </input>
                        <label htmlFor="positionIntern" className="form-check-label">Intern</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="positionJunior"
                            name="positionOptions"
                            value="Junior"
                            checked={form.level === "Junior"}
                            onChange={event => updateForm({ level: event.target.value })}>
                        </input>
                        <label htmlFor="positionJunior" className="form-check-label">Junior</label>
                    </div>
                    <div className="form-check form-check-inline">
                        <input
                            type="radio"
                            className="form-check-input"
                            id="positionSenior"
                            name="positionOptions"
                            value="Senior"
                            checked={form.level === "Senior"}
                            onChange={event => updateForm({ level: event.target.value })}>
                        </input>
                        <label htmlFor="positionSenior" className="form-check-label">Senior</label>
                    </div>
                </div>
                <div className="form-group">
                    <input 
                        type="submit"
                        value="Create person"
                        className="btn btn-primary"/>
                </div>
            </form>
        </div>
    );
}