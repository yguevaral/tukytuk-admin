import React, { useState, useEffect } from 'react';
import { Grid, Typography } from '@mui/material';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import Avatar from '@mui/material/Avatar';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Button from '@mui/material/Button';
import ImageList from '@mui/material/ImageList';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ImageListItem from '@mui/material/ImageListItem';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';

import { JournalLayout } from '../layout/JournalLayout';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NothingSelectedView } from '../views';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 800,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const JournalPage = () => {

  const [drivers, setDrivers] = useState([]);

  const [motivoRechazo, setMotivoRechazo] = useState('');
  const [driverRechado, setDriverRechado] = useState('');

  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const getDrivers = async () => {
    const response = await fetch('http://52.87.214.235/api/usuarios/driver/adminListDriverPending');
    const data = await response.json();
    setDrivers(data.driversUser);
  }

  const setStatusDrive = async (uid, driver_status, commentsAdmin) => {
    await fetch('http://52.87.214.235/api/usuarios/driver/adminListDriverSetStatus', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({

        "driver": uid,
        "driver_status": driver_status,
        "commentsAdmin": commentsAdmin
       })
    });
    //const data = await response.json();
    getDrivers();
  }

  const handleRechazarDriver = async () => {
    setStatusDrive(driverRechado, 'R', motivoRechazo);
    handleClose();
    setMotivoRechazo('');
    setDriverRechado('');
    getDrivers();
  }


  useEffect(() => {
    getDrivers();
  }, []);

  return (
    <JournalLayout>

      {/* <Typography>Sint id officia amet velit do aliqua aliqua est ea velit minim voluptate duis laboris. Esse esse consectetur ullamco excepteur ullamco amet. Mollit est nostrud nisi irure magna dolor eiusmod aliquip aliqua nostrud incididunt enim. Velit ipsum laborum Lorem anim laboris aute ullamco ipsum do adipisicing irure.</Typography> */}


      {/* <NothingSelectedView /> */}

      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="start"
        justifyContent="start"
        sx={{ minHeight: 'calc(100vh - 110px)', padding: '10px', backgroundColor: '#f5f5f5', borderRadius: 3 }}
      >

        <Grid item xs={12}>
          <Typography color="black" variant='h5'>Conductores Pendientes de Aprobar</Typography>
        </Grid>
        <Grid item xs={12} lg={12} sx={{ width: '100%', marginTop: 2 }}>
          <List sx={{ width: '100%' }} md={{ width: '100%' }} >
          {drivers.map((driverUser) => {
            return (
              <>
                <ListItem alignItems="flex-start" key={driverUser.driver.uid}>
                  
                  <Accordion sx={{ width: '100%' }} >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel3-content"
                        id="panel3-header"
                      >
                        <ListItemAvatar>  
                          <Avatar alt="Remy Sharp" src={driverUser.driver.imageProfile} />
                        </ListItemAvatar>
                        <ListItemText
                          primary={driverUser.usuarioDB.nombre}
                          secondary={
                            <React.Fragment>
                              <Typography
                                component="span"
                                variant="body2"
                                sx={{ color: 'text.primary', display: 'inline' }}
                              >
                                {driverUser.usuarioDB.email}
                              </Typography>
                            </React.Fragment>
                          }
                        />
                      </AccordionSummary>
                      <AccordionDetails>
                        <Typography variant='h7'>Telefono: {driverUser.usuarioDB.telefono}</Typography><br></br>
                        <Typography variant='h7'>Direccion: {driverUser.driver.address}</Typography><br></br>
                        <Typography variant='h7'>Placa: {driverUser.driver.plate}</Typography><br></br>
                        <Typography variant='h7'># Municipal: {driverUser.driver.locallicense}</Typography><br></br>
                        <ImageList cols={3} sx={{ width: '100%', height: 'auto' }}>
                          <ImageListItem key={driverUser.driver.uid}>
                              <img
                                src={driverUser.driver.imageProfile}
                                loading="lazy"
                              />
                              <ImageListItemBar
                                title="Perfil"
                                subtitle="Conductor"
                                position="below"
                              />
                          </ImageListItem>
                          <ImageListItem key={driverUser.driver.uid}>
                            <img
                              src={driverUser.driver.imageDPI1}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title="DPI"
                              subtitle="Frontal Conductor"
                              position="below"
                            />
                          </ImageListItem>
                          <ImageListItem key={driverUser.driver.uid}>
                            <img
                              src={driverUser.driver.imageDPI2}
                              loading="lazy"
                            />
                            <ImageListItemBar
                              title="DPI"
                              subtitle="Posterior Conductor"
                              position="below"
                            />
                          </ImageListItem>
                          
                        </ImageList>

                      </AccordionDetails>
                      <AccordionActions>
                        <Button variant='outlined' onClick={ () => {
                          setDriverRechado(driverUser.driver.uid);
                          handleOpen();
                        } }>Rechazar</Button>
                        <Button variant='contained' onClick={()=> {
                          setStatusDrive(driverUser.driver.uid, 'A', '');
                          handleClose();
                          setMotivoRechazo('');
                          setDriverRechado('');
                          getDrivers();
                        }}>Aprobar</Button>
                      </AccordionActions>
                  </Accordion>
                </ListItem>
                
              </>
            );
          })}
        
        </List>
        </Grid>
      </Grid>


      


      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Quieres Rechazar los documentos de este conductor?
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Motivo:
          </Typography>
  
          <Box sx={{ width: 500, maxWidth: '100%', marginBottom: 3 }}>
            <TextField  rows={4} label="Comentarios para el Conductor" fullWidth  id="fullWidth"
              value={motivoRechazo}
              onChange={(event) => {
                setMotivoRechazo(event.target.value);
              }} />
          </Box>

          <Button variant='contained' onClick={handleRechazarDriver}>Rechazar</Button>
          <Button variant='outlined' onClick={handleClose}>Cancelar</Button>
        </Box>
      </Modal>

    </JournalLayout>
  )
}
