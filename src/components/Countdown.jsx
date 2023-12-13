import { useState, useEffect } from 'react';
import { GrPowerReset } from "react-icons/gr";
import { RxCross2 } from "react-icons/rx";
import { FaPlay, FaPause } from "react-icons/fa";
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';

const Countdown = () => {
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [open, setOpen] = useState(false);

  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  useEffect(() => {
    let interval;

    if (isRunning) {
      interval = setInterval(() => {
        if (totalSeconds > 0) {
          setTotalSeconds(totalSeconds - 1);
        } else {
          clearInterval(interval);
          setIsRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRunning, totalSeconds]);

  const handleStart = () => {
    if (!isRunning && totalSeconds > 0) {
      setIsRunning(true);
      setOpen(true);
    }
  };

  const handleReset = () => {
    setIsRunning(false);
    setTotalSeconds(0);
    setOpen(false);
  };

  const handlePause = () => {
    setIsRunning(false);
    setOpen(true);
  };

  const handleInputChange = (event) => {
    const inputValue = parseInt(event.target.value, 10);
    if (!isNaN(inputValue)  && inputValue >= 0) {
      setTotalSeconds(inputValue * 60);
      setIsRunning(false);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  const action = (
    <>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <RxCross2 />
      </IconButton>
    </>
  );

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box
        sx={{
          flexGrow: 1,
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <Box
          component="form"
          noValidate
          autoComplete="off"
          sx={{ marginBottom: 2 }}
        >
          <TextField fullWidth id="outlined-basic" label="Enter Minutes" variant="outlined" type="number" onChange={handleInputChange} />
        </Box>
        <Typography variant="h2" gutterBottom>
          {String(hours).padStart(2, '0')}:{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}
        </Typography>
        <Stack spacing={2} direction="row">
          <Button variant="contained" size="large" onClick={handleStart} disabled={isRunning}>
            <FaPlay />
          </Button>
          <Button variant="contained" size="large" onClick={handleReset}>
            <GrPowerReset />
          </Button>
          <Button variant="contained" size="large" onClick={handlePause} disabled={!isRunning}>
            <FaPause />
          </Button>
        </Stack>
      </Box>
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        message={isRunning ? "Timer Started" : "Timer Paused"}
        action={action}
      />
    </Container>
  );
}

export default Countdown;