import { Button, Grid, TextField } from '@mui/material';
import { AuthLayout } from '../layout/AuthLayout';
import { useState } from 'react';


export const LoginPage = () => {

  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    
    if( usuario === 'admin' && password === 'admin' ) {
   
      localStorage.setItem('auth', true);
      window.location.href = "/";
    }
    else{
      alert('Usuario o contraseña incorrectos');
    }
  }


  return (
    <AuthLayout title="Login">
      <form>
          <Grid container>
            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Usuario" 
                type="text" 
                placeholder='correo@google.com' 
                fullWidth
                value={ usuario }
                onChange={ (e) => setUsuario(e.target.value) }
              />
            </Grid>

            <Grid item xs={ 12 } sx={{ mt: 2 }}>
              <TextField 
                label="Contraseña" 
                type="password" 
                placeholder='Contraseña' 
                fullWidth
                value={ password }
                onChange={ (e) => setPassword(e.target.value) }
              />
            </Grid>
            
            <Grid container spacing={ 2 } sx={{ mb: 2, mt: 1 }}>
              <Grid item xs={ 12 } sm={ 12 }>
                <Button variant='contained' fullWidth onClick={handleSubmit}>
                  Login
                </Button>
                
              </Grid>
              
            </Grid>

          </Grid>


        </form>

    </AuthLayout>
  )
}
