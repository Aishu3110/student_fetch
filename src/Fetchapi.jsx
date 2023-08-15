import React from "react";
import { useState, useEffect } from "react";

const Fetchapi = () => {
    const [data, setdata] = useState("");
    const [newdata, setnewdata] = useState({
        name: "",
        registerno: "",
        email: "",
        dob: "",
        degree: "",
        specialization: "",
        year: "",
        contactno: "",
        status: true,
    });
    const fetchtodo_list = () => {
        fetch('https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/student_details')
            .then((res) => res.json())
            .then((json) => {
                console.log(json);
                setdata([json]);
            })
            .catch((error) => console.error(error));
    };
    useEffect(() => {
        fetchtodo_list();
    }, [])

    const handlenew = () => {
        console.log(newdata)
        const request = {
            method: "POST",
            headers: {
                "content_type": "application/json"
            },
            body: JSON.stringify(newdata)
        };
        console.log(request.body)
        fetch('https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/student_details', request)
            .then((res) => res.json())
            .then((json) => {
                alert("successfully created");
                setdata([...data, json]);
            })
            .catch((error) => console.error(error));
    }

    const delete_todo = (id) => {
        const request = {
            method: "DELETE",
            headers: {
                'content-Type': 'application/json'
            },
        };
        fetch(`https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/student_details/${id}`, request)
            .then((res) => res.json())
            .then((json) => {
                fetchtodo_list();
                alert("record deleted successfully")
            })
            .catch((error) => console.error(error));
    };

    const edit_todo = (todo) => {
        setnewdata(todo)
    }
    const handlecancel = () => {
        setnewdata({
            name: "",
            registerno: "",
            email: "",
            dob: "",
            degree: "",
            specialization: "",
            year: "",
            contactno: "",
            status: true,
        })
    }
    const handleupdate = (id) => {
        const request = {
            method: "PUT",
            headers: {
                "content-Type": "application/json"
            },
            body: JSON.stringify(newdata)
        };
        fetch(`https://64da1fefe947d30a260acfd9.mockapi.io/api/v2/student_details/${id}`, request)
            .then((res) => res.json())
            .then((json) => {
                alert("Updated successfully");
                fetchtodo_list();
                handlecancel()
            }).catch((error) => console.error(error));
    }
    return (
        <>
            <div className="layout">
                <h1>Fetch Todo</h1>
                <div className="inputbox" >
                    <input value={newdata.name} placeholder="Enter a name"
                        onChange={(e) => setnewdata({ ...newdata, name: e.target.value })} /> <br />

                    <input value={newdata.registerno} placeholder="Enter a register no"
                        onChange={(e) => setnewdata({ ...newdata, registerno: e.target.value })} /><br />

                    <input value={newdata.email} placeholder="Enter a email"
                        onChange={(e) => setnewdata({ ...newdata, email: e.target.value })} /><br />

                    <input value={newdata.dob} placeholder="Enter a dob"
                        onChange={(e) => setnewdata({ ...newdata, dob: e.target.value })} /> <br />

                    <input value={newdata.degree} placeholder="Enter a degree"
                        onChange={(e) => setnewdata({ ...newdata, degree: e.target.value })} /><br />

                    <input value={newdata.specialization} placeholder="Enter a specialization"
                        onChange={(e) => setnewdata({ ...newdata, specialization: e.target.value })} /><br />

                    <input value={newdata.year} placeholder="Enter a year"
                        onChange={(e) => setnewdata({ ...newdata, year: e.target.value })} /><br />

                    <input value={newdata.contactno} placeholder="Enter a contact no"
                        onChange={(e) => setnewdata({ ...newdata, contactno: e.target.value })} /><br />
                </div>
            </div>
            <div className="buttonpress">
                {newdata.id ?
                    <>  <button onClick={() => handleupdate(newdata.id)}>Update</button>
                        <button onClick={() => handlecancel()}>Cancel</button></> :
                    <button onClick={() => handlenew()}>create new</button>
                }
            </div>
            <ol>
                {data ? (
                    data.map((todo, index) => {
                        return (
                            <li key={`index ${index}`}>
                                <label>
                                    Name : {todo.name}<br />
                                    <span>Registerno : {todo.registerno}</span><br />
                                    <span>Email : {todo.email}</span><br />
                                    <span>DOB : {todo.dob}</span><br />
                                    <span>Degree : {todo.degree}</span><br />
                                    <span>Specalization : {todo.specialization}</span><br />
                                    <span>Year : {todo.year}</span><br />
                                    <span>Contactno : {todo.contactno}</span><br />
                                </label>
                                <button onClick={() => delete_todo(todo.id)}>Delete</button>
                                <button onClick={() => edit_todo(todo)}>Edit</button>
                            </li>
                        )
                    })
                ) :
                    <li>datas not found </li>}
            </ol>
        </>
    )
}
export default Fetchapi;
