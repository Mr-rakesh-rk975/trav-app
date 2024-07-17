// 'use client';
// import React, { useState } from 'react';
// import { useRouter } from 'next/navigation';
// import { Container, TextField, Button, Typography } from '@mui/material';

// const Login = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const router = useRouter();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     setError('');

//     try {
//       const res = await fetch('/api/auth/login', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();
//       if (res.ok) {
//         localStorage.setItem('token', data.token);
//         router.push('/admin/dashboard');
//       } else {
//         setError(data.message);
//       }
//     } catch (error) {
//       setError('An error occurred. Please try again.');
//     }
//   };

//   return (
//     <Container maxWidth="sm">
//       <Typography variant="h4" gutterBottom>
//         Login
//       </Typography>
//       {error && <Typography color="error">{error}</Typography>}
//       <form onSubmit={handleLogin}>
//         <TextField
//           label="Email"
//           type="email"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />
//         <TextField
//           label="Password"
//           type="password"
//           variant="outlined"
//           fullWidth
//           margin="normal"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           Login
//         </Button>
//       </form>
//     </Container>
//   );
// };

// export default Login;









'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Typography } from '@mui/material';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        sessionStorage.setItem('token', data.token);
        sessionStorage.setItem('role', data.role); // Store role in sessionStorage
        if (data.role === 'admin') {
          router.push('/admin/dashboard');
        } else {
          router.push('/');
        }
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError('An error occurred. Please try again.');
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleLogin}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          margin="normal"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          margin="normal"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </form>
    </Container>
  );
};

export default Login;
