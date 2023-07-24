import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
const AddCourse = () => {
    const [title,setTitle] = useState("")
    const [description,setDescription] = useState("")
    const [price,setPrice] = useState("")
    const [image,setImage] = useState("")
    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            paddingTop: '200px'
        }}>
            <Card variant="outlined" style={{
                padding: '3rem',
                width: '300px',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            }}>
                <h2>Welcome SignIn Please</h2>
                <div>
                    <TextField
                        id="coursename"
                        label="Course Name"
                        variant="outlined"
                        onChange={(event) => {
                            setTitle(event.target.value)
                        }}
                    />
                    <br />
                    <TextField
                        id="description"
                        label="Description"
                        variant="outlined"
                        onChange={(event) => {
                            setDescription(event.target.value)
                        }}
                    />
                    <br />
                    <TextField
                        id="price"
                        label="Price"
                        variant="outlined"
                        onChange={(event) => {
                            setPrice(event.target.value)
                        }}
                    />
                    <br />
                    <TextField
                        id="imageLink"
                        label="ImageLink"
                        variant="outlined"
                        onChange={(event) => {
                            setImage(event.target.value)
                        }}
                    />
                </div>
                <div style={{
                    marginRight: '138px'
                }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            fetch('http://localhost:3000/admin/courses', {
                                method: "POST",
                                body: JSON.stringify({
                                    title,
                                    description,
                                    price,
                                    image:"",
                                    published:"true"
                                }),
                                headers: {
                                    "Content-type": "application/json",
                                    "Authorization": "Bearer " + localStorage.getItem("token")
                                }
                            }).then((response) => {
                                response.json().then((data) => {
                                    alert("Course Added!!!")
                                })
                            })
                        }}
                    >ADD</Button>
                </div>
            </Card>
        </div>
    )
}

export default AddCourse
