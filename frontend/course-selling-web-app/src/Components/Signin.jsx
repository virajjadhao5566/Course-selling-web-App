import React, { useState } from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
const Signin = () => {
    const [username,setUsername] = useState("");
    const [password,setPassword] = useState("");
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
                        id="username" 
                        label="Email" 
                        variant="outlined" 
                        onChange={(event)=>{
                            setUsername(event.target.value)
                        }}
                    />
                    <br />
                    <TextField 
                        id="password" 
                        label="Password" 
                        variant="outlined" 
                        onChange={(event)=>{
                            setPassword(event.target.value)
                        }}
                    />
                </div>
                <div style={{
                    marginRight: '138px'
                }}>
                    <Button
                        variant="contained"
                        onClick={() => {
                            fetch('http://localhost:3000/admin/signup', {
                                method: "POST",
                                body: JSON.stringify({
                                    username,
                                    password
                                }),
                                headers: {
                                    "Content-type": "application/json"
                                }
                            }).then((response)=>{
                                response.json().then((data)=>{
                                    localStorage.setItem("token",data.token)
                                    window.location = "/"
                                })
                            })
                        }}
                    >SignIn</Button>
                </div>
            </Card>
        </div>
    )
}

export default Signin
