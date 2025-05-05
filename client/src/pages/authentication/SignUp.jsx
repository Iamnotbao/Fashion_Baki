import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import paths from '../../routes/paths';
import './SignIn.css';
import BackGround from "../../assets/images/logo/login.png"

const SignUp = () => {
  const [user, setUser] = useState({ username: '', email: '', password: '', phone: '', address: '' });
  const [showPassword, setShowPassword] = useState(false);
  const baseURL = "/api/auth/register"
  const [errorUser,setErrorUser] = useState(true);
  const[errPop, setErrPop] = useState(false);
  
  const navigation = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setErrPop(false);
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    let response;
    try {
      response = await axios.post(baseURL, user, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log("x",response.data);
      
      if (response.data) {
        localStorage.setItem("email",user.email);
        navigation("/Fashion_Baki/authentication/verify/",{state:{functionName:"account"}});
      }
    } catch (error) {
      console.log(error);
      setErrorUser(error.response.data.message);
      setErrPop(true);
      

    }

  };

  return (
    <div className="login" style={{backgroundImage :`url(${BackGround})`}}>
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        height="100vh"
        spacing={4}
        px={3}
      >

        <Box width={0.3}>
          <Stack
            width="100%"
            maxWidth={410}
            mx="auto"
          >
            <Box width="100%">
              <Typography variant="h3">Sign Up</Typography>
              <Typography mt={1.5} variant="body2" color="text.disabled">
                Join us and start your journey today!
              </Typography>

              <Button
                variant="contained"
                color="secondary"
                size="large"
                fullWidth
                startIcon={<Icon icon="logos:google-icon" />}
                sx={{
                  mt: 4,
                  fontWeight: 600,
                  bgcolor: 'info.main',
                  '& .MuiButton-startIcon': { mr: 1.5 },
                  '&:hover': { bgcolor: 'info.main' },
                }}
              >
                Sign up with Google
              </Button>

              <Divider sx={{ my: 3 }}>or</Divider>

              <Box component="form" onSubmit={handleSubmit}>
              {errPop && errorUser&&(<Typography variant="body1" style={{fontWeight:"Bold", color:"red",textAlign:"center",fontSize:"20px"}}>{errorUser}</Typography>)} 
                <TextField
                  id="username"
                  name="username"
                  type="text"
                  label="Username"
                  value={user.username}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="mail@example.com"
                  autoComplete="username"
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                />
                 <TextField
                  id="fullname"
                  name="fullName"
                  type="text"
                  label="Fullname"
                  value={user.fullName}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="ex:LeTheBao"
                  autoComplete="fullname"
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                />
                <TextField
                  id="email"
                  name="email"
                  type="email"
                  label="Email"
                  value={user.email}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="mail@example.com"
                  autoComplete="email"
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                />
                <TextField
                  id="password"
                  name="password"
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={user.password}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="Min. 8 characters"
                  autoComplete="current-password"
                  sx={{ mt: 2 }}
                  fullWidth
                  required
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          <Icon icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'} />
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField
                  id="phone"
                  name="phone"
                  type="phone"
                  label="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="phone"
                  autoComplete="phone"
                  sx={{ mt: 2 }}
                  fullWidth
                 
                />
                <TextField
                  id="address"
                  name="address"
                  type="address"
                  label="address"
                  value={user.address}
                  onChange={handleInputChange}
                  variant="filled"
                  placeholder="address"
                  autoComplete="address"
                  sx={{ mt: 2 }}
                  fullWidth
                 
                />

                <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
                  Sign Up
                </Button>
              </Box>

              <Typography mt={3} variant="body2" textAlign="center" letterSpacing={0.25}>
                Already have an account?{' '}
                <Link to={paths.signin} color="primary.main" fontWeight={600}>
                  Let's Sign in
                </Link>
              </Typography>
            </Box>
          </Stack>
        </Box>

        {/* <Box
      sx={{
        backgroundImage: `url(images/signup.jpg)`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        width: '100%',
        height: '100vh',
      }}
    >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="center"
        justifyContent="center"
        height="100vh"
        spacing={4}
        px={3}>
        <Box>
          <Typography variant="h3">Baki</Typography>
        </Box>
      </Stack>

    </Box> */}
      </Stack>
    </div>

  );
};

export default SignUp;
