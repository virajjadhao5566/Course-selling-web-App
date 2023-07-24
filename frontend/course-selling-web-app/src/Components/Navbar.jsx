import React, { useEffect, useState } from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();
    const [userEmail, setUserEmail] = useState(null)
    useEffect(() => {
        fetch('http://localhost:3000/admin/me', {
            headers: {
                "Authorization": "Bearer " + localStorage.getItem("token")
            }
        }).then((response) => {
            response.json().then((data) => {
                setUserEmail(data.username)
            })
        })
    }, [])
    if (userEmail) {
        return (
            <div>
                <AppBar style={{
                    display: 'flex',
                    flexDirection: 'row',
                    backgroundColor: 'white',
                    justifyContent: 'space-between',
                    height: '50px',
                    alignItems: 'center'
                }}>
                    <div>
                        <Typography
                            style={{
                                color: 'black',
                                marginLeft: '10px',
                                fontSize: '1.1rem'
                            }}
                        >Coursera</Typography>
                    </div>
                    <div style={{
                        display:'flex'
                    }}>
                        <div style={{
                            color:"black",
                            marginRight:'20px',
                            marginTop:'5px',
                            fontSize:"20px"
                        }}>
                            {userEmail}
                        </div>
                        <Button variant="contained"
                            onClick={() => {
                                localStorage.setItem("token",null)
                                window.location = "/signin"
                            }}
                            style={{
                                marginRight: '10px'
                            }}
                        >LogOut</Button>
                    </div>
                </AppBar>
            </div>
        )
    }
    return (
        <div>
            <AppBar style={{
                display: 'flex',
                flexDirection: 'row',
                backgroundColor: 'white',
                justifyContent: 'space-between',
                height: '50px',
                alignItems: 'center'
            }}>
                <div>
                    <Typography
                        style={{
                            color: 'black',
                            marginLeft: '10px',
                            fontSize: '1.1rem'
                        }}
                    >Coursera</Typography>
                </div>
                <div>
                    <Button
                        variant="contained"
                        onClick={() => {
                            navigate('/login')
                        }}
                        style={{
                            marginRight: '10px'
                        }}
                    >Login</Button>
                    <Button variant="contained"
                        onClick={() => {
                            navigate('/signin')
                        }}
                        style={{
                            marginRight: '10px'
                        }}
                    >SignIn</Button>
                </div>
            </AppBar>
        </div>
    )
}

export default Navbar
