import React from 'react'
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Card from '@mui/material/Card';
const Login = () => {
  return (
    <div style={{
        display:'flex',
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center',
        paddingTop:'100px'
    }}>
        <h2>Welcome Back,Please login</h2>
        <Card 
            variant="outlined"
            style={{
            padding:'3rem',
            width:'300px',
            display:'flex',
            flexDirection:'column',
            justifyContent:'center',
            alignItems:'center'
        }}>
            <div>
                <TextField id="username" label="Email" variant="outlined" />
                <br /><br />
                <TextField id="password" label="Password" variant="outlined" />
            </div>
            <br />
            <div style={{
                marginRight:'138px'
            }}>
                <Button 
                variant="contained"
                onClick={()=>{
                    let username = document.getElementById('username')
                    let password = document.getElementById('password')
                }}
                >Login</Button>
            </div>
        </Card>
    </div>
  )
}

export default Login
