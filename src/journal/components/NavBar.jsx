import { AppBar, Grid, IconButton, Toolbar, Typography } from '@mui/material';
import { LogoutOutlined, MenuOutlined } from '@mui/icons-material';
import Box from '@mui/material/Box';



export const NavBar = ({ drawerWidth = 240 }) => {
  return (
    <AppBar 
        position='fixed'
        sx={{ 
            width: { sm: `calc(100% - ${ drawerWidth }px)` },
            ml: { sm: `${ drawerWidth }px` }
         }}
    >
        <Toolbar>
            <IconButton
                color='inherit'
                edge="start"
                sx={{ mr: 2, display: { sm: 'none' } }}
            >
                <MenuOutlined />
            </IconButton>

            <Grid container direction='row' justifyContent='space-between' alignItems='center'>
                <Typography variant='h6' noWrap component='div'> Conductores </Typography>

                <IconButton color='error'>
                
                    <Box onClick={() => {
                        console.log('asdf')
                        localStorage.setItem('auth', false);

                            window.location.href = "/auth/login";
                        }}
                    >
                        <LogoutOutlined />

                    </Box>
                    
                </IconButton>
            </Grid>

        </Toolbar>
    </AppBar>
  )
}
