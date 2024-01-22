import React from 'react'
import { AppBar, Button, Grid, Toolbar, Typography, Box } from '@mui/material'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { authActions } from '../store'
const Navbar = () => {

  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  console.log('state', isLoggedIn)
  return (
    <div>
      <AppBar sx={{ background: '#00589f;', color: 'white',fontWeight:'bold',position:'sticky',top:'0'}}>
        <Toolbar>
          <Link to='/'><Typography variant='h5' color={'white'}><img src='https://i.postimg.cc/gjmKr5r3/Screenshot-2023-12-14-102123-removebg-preview.png' className='img-fluid' width='150px'/></Typography></Link>
          <Box display="flex" marginLeft='auto'>
            {!isLoggedIn && (
              <Link to='/auth'><Button sx={{backgroundImage: 'linear-gradient(135deg, #F48617, #EDA83C);',border:0,borderRadius:'3',padding:'5px 10px',color:'white'}}>Login</Button></Link>
            )}
            {isLoggedIn && (
              <>
                <Link to='/create-jobs'><Button sx={{backgroundImage: 'linear-gradient(135deg, #F48617, #EDA83C);',border:0,borderRadius:'3',margin:'2',padding:'5px 10px',color:'white'}}>Register Org</Button></Link>
                <Button onClick={() => dispatch(authActions.logout())} LinkComponent={Link} to='/' variant='contained' sx={{backgroundImage: 'linear-gradient(135deg, #F48617, #EDA83C);',border:0,borderRadius:'3',padding:'5px 10px',color:'white'}}>Logout</Button>
              </>
            )}

          </Box>

        </Toolbar>
      </AppBar>
    </div>
  )
}

export default Navbar
