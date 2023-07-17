import React from 'react'
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const navigate = useNavigate();

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
                    <Typography style={{ color: 'black' }}>Coursera</Typography>
                </div>
                <div>
                    <Button variant="contained"
                        onClick={() => {
                            navigate('/login')
                        }}
                    >Login</Button>
                    <Button variant="contained"
                        onClick={() => {
                            navigate('/signin')
                        }}
                    >SignIn</Button>
                </div>
            </AppBar>
        </div>
    )
}

export default Navbar
