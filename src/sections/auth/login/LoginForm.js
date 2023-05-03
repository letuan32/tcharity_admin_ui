import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Link, Stack, IconButton, InputAdornment, TextField, Checkbox } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// components
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

export default function LoginForm() {
    const serverUrl =  process.env.REACT_APP_ENV === "Development" ? "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC-9t_7hpKVhgnjs6T_67CAALOk--su2A" : "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDC-9t_7hpKVhgnjs6T_67CAALOk--su2A"
    const gatewayUrl =  process.env.REACT_APP_ENV === "Development" ? "https://localhost:7010/" : process.env.REACT_APP_API_GATEWAY
    const firebaseIdentityUrl = process.env.REACT_APP_GG_IDENTITY_TOOLKIT_URL;
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const handleClick = async () => {
      try {

          const loggedInResponse = await fetch(
              `${firebaseIdentityUrl  }accounts:signInWithPassword?key=${  process.env.REACT_APP_FIREBASE_AUTHEN_KEY}`,
              {
                  method: "POST",
                  body: JSON.stringify({email, password, returnSecureToken: true}),
                  headers: {"Content-Type": "application/json"}
              });

          if (loggedInResponse.ok) {
              const loggedIn = await loggedInResponse.json();
              localStorage.setItem('token', loggedIn.idToken);
              localStorage.setItem('user', loggedIn.displayName);
              localStorage.setItem('refreshToken', loggedIn.refreshToken);
              localStorage.setItem('userId', loggedIn.localId);

              navigate('/dashboard', {replace: true})


          } else {
              alert("Login failed")
              window.location.reload();
          }
      } catch (err) {
          console.error(err);
      }
      navigate('/dashboard', {replace: true});
  };

  const handEmailChange = (event) => {
        setEmail(event.target.value);
  }
  const handPasswordChange = (event) => {
        setPassword(event.target.value);
  }

  return (
    <>
      <Stack spacing={3}>
        <TextField onChange={handEmailChange} value={email} name="email" label="Email address" />

        <TextField
            onChange={handPasswordChange}
            value={password}
          name="password"
          label="Password"
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                  <Iconify icon={showPassword ? 'eva:eye-fill' : 'eva:eye-off-fill'} />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      </Stack>

      <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ my: 2 }}>
        <Checkbox name="remember" label="Remember me" />
        <Link variant="subtitle2" underline="hover">
          Forgot password?
        </Link>
      </Stack>

      <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleClick}>
        Login
      </LoadingButton>
    </>
  );
}
