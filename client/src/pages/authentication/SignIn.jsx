import { Icon } from '@iconify/react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import Divider from '@mui/material/Divider';
import FormControlLabel from '@mui/material/FormControlLabel';
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import paths from '../../routes/paths';
import { useAuthentication } from './AuthProvider';
import './SignIn.css';
import BackGround from "../../assets/images/logo/login.png"
import GoogleAuthentication from './GoogleAuthentication';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { googleAuthentication } from '../../services/authenticationServices';



const SignIn = () => {
  const [user, setUser] = useState({ usernameOrEmail: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const baseURL = "/api/auth/login"
  const [errorUser, setErrorUser] = useState(true);
  const [errPop, setErrPop] = useState(false);
  const navigation = useNavigate();
  const { login } = useAuthentication();
  const [isGoogle, setIsGoogle] = useState(false);
  const clientId = "52237736446-l0nv46sq881vrsjfs7d9as2e43586h9h.apps.googleusercontent.com";
  const [accessToken,setAccessToken] = useState({});
  console.log("err", errorUser);
  console.log(accessToken);
  


  const handleInputChange = (e) => {
    e.preventDefault();
    setUser({ ...user, [e.target.name]: e.target.value });
    // setErrPop(false);
  };
  const handleGoogle = () => {
    setIsGoogle(!isGoogle);
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    let response;
    try {
      response = await axios.post(baseURL, user, {
        headers: {
          'Content-Type': 'application/json'
        }, withCredentials: true
      })

      if (response.data) {
        localStorage.setItem("username", response.data.username);
        login(response.data.username);
        navigation("/Fashion_Baki/")
      }
    } catch (error) {
      console.log(error);
      setErrorUser(error.response.data.message);
      setErrPop(true);
    }

  };
  const handleTest = () => {
    console.log(rootPaths.signup);

  }
  useEffect(()=>{
    if(accessToken){
      const loginByGoogle =async()=>{
        try {
          const response = await googleAuthentication(accessToken);
          login(response.username);
          navigation("/Fashion_Baki/")
        } catch (error) {
            console.log(error);          
        }
      }
      loginByGoogle();
    }
  },[accessToken])
  return (
    <div className="login" style={{ backgroundImage: `url(${BackGround})` }} >
      <Stack
        direction={{ xs: 'column', md: 'row' }}
        alignItems="flex-start"
        height="100vh"
        spacing={4}
        px={3}
      >
        <Box width={0.3} py={6} ml={0}>
          <Stack width="100%"
            maxWidth={410}
            mx="auto">
            <Typography variant="h3">Sign In</Typography>
            <Typography mt={1.5} variant="body2" color="text.disabled">
              {/* Enter your email and password to sign in! */}
            </Typography>
            <GoogleOAuthProvider clientId={clientId} >
              <GoogleAuthentication setToken={setAccessToken}/>
            </GoogleOAuthProvider>
            <Divider sx={{ my: 3 }}>or</Divider>

            <Box component="form" onSubmit={handleSubmit}>
              {errPop && errorUser && (<Typography variant="body1" style={{ fontWeight: "Bold", color: "red", textAlign: "center", fontSize: "20px" }}>{errorUser}</Typography>)}
              <TextField
                id="username"
                name="usernameOrEmail"
                type="text"
                label="username"
                value={user.usernameOrEmail}
                onChange={handleInputChange}
                variant="filled"
                placeholder="mail@example.com"
                autoComplete="email"
                sx={{ mt: 3 }}
                fullWidth
                autoFocus
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
                sx={{ mt: 6 }}
                fullWidth
                required
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={{
                        opacity: user.password ? 1 : 0,
                        pointerEvents: user.password ? 'auto' : 'none',
                      }}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={() => setShowPassword(!showPassword)}
                        sx={{ border: 'none', bgcolor: 'transparent !important' }}
                        edge="end"
                      >
                        <Icon
                          icon={showPassword ? 'ic:outline-visibility' : 'ic:outline-visibility-off'}
                          color="neutral.main"
                        />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Stack mt={1.5} alignItems="center" justifyContent="space-between">
                <FormControlLabel
                  control={<Checkbox id="checkbox" name="checkbox" size="medium" color="primary" />}
                  label="Keep me logged in"
                  sx={{ ml: -0.75 }}
                />
                <Link to={"/Fashion_Baki/authentication/forgot_password"} fontSize="body2.fontSize" fontWeight={600}>
                  Forgot password?
                </Link>
              </Stack>

              <Button type="submit" variant="contained" size="large" sx={{ mt: 3 }} fullWidth>
                Sign In
              </Button>
            </Box>

            <Typography
              mt={3}
              variant="body2"
              textAlign={{ xs: 'center', md: 'left' }}
              letterSpacing={0.25}
            >
              Not registered yet?{' '}
              <Link to={paths.signup} color="primary.main" fontWeight={600} onClick={handleTest}>
                Create an Account
              </Link>
            </Typography>
          </Stack>

        </Box>
        {/* <Box width={0.6}
        sx={{
          backgroundImage: `url(images/signup.jpg)`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
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

export default SignIn;
