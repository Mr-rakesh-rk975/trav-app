// // /components/admin/AdminNavbar.jsx

// 'use client';
// import React, { useState } from 'react';
// import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Box } from '@mui/material';
// import { Search as SearchIcon, Notifications as NotificationsIcon, Language as LanguageIcon, AccountCircle as AccountCircleIcon, Menu as MenuIcon } from '@mui/icons-material';
// import { styled, alpha } from '@mui/material/styles';
// import Sidebar from './Sidebar';

// const Search = styled('div')(({ theme }) => ({
//   position: 'relative',
//   borderRadius: theme.shape.borderRadius,
//   backgroundColor: alpha(theme.palette.common.white, 0.15),
//   '&:hover': {
//     backgroundColor: alpha(theme.palette.common.white, 0.25),
//   },
//   marginLeft: theme.spacing(2),
//   marginRight: theme.spacing(2),
//   width: '100%',
//   [theme.breakpoints.up('md')]: {
//     marginLeft: theme.spacing(3),
//     marginRight: theme.spacing(3),
//     width: 'auto',
//   },
// }));

// const SearchIconWrapper = styled('div')(({ theme }) => ({
//   padding: theme.spacing(0, 2),
//   height: '100%',
//   position: 'absolute',
//   pointerEvents: 'none',
//   display: 'flex',
//   alignItems: 'center',
//   justifyContent: 'center',
// }));

// const StyledInputBase = styled(InputBase)(({ theme }) => ({
//   color: 'inherit',
//   '& .MuiInputBase-input': {
//     padding: theme.spacing(1, 1, 1, 0),
//     paddingLeft: `calc(1em + ${theme.spacing(4)})`,
//     transition: theme.transitions.create('width'),
//     width: '100%',
//     [theme.breakpoints.up('md')]: {
//       width: '40ch',
//     },
//   },
// }));

// const AdminNavbar = () => {
//   const [sidebarOpen, setSidebarOpen] = useState(false);

//   const handleToggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <Box sx={{ display: 'flex' }}>
//       <AppBar position="fixed" sx={{ width: '100%', zIndex: 1300 }}>
//         <Toolbar sx={{ justifyContent: 'space-between' }}>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton color="inherit" aria-label="open drawer" onClick={handleToggleSidebar} edge="start" sx={{ marginRight: 2 }}>
//               <MenuIcon />
//             </IconButton>
//             <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
//               Admin Dashboard
//             </Typography>
//           </Box>
//           <Search>
//             <SearchIconWrapper>
//               <SearchIcon />
//             </SearchIconWrapper>
//             <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} />
//           </Search>
//           <Box sx={{ display: 'flex', alignItems: 'center' }}>
//             <IconButton color="inherit">
//               <Badge badgeContent={4} color="error">
//                 <NotificationsIcon />
//               </Badge>
//             </IconButton>
//             <IconButton color="inherit">
//               <LanguageIcon />
//             </IconButton>
//             <IconButton edge="end" color="inherit">
//               <AccountCircleIcon />
//             </IconButton>
//           </Box>
//         </Toolbar>
//       </AppBar>
//       <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
//       <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px', width: '100%' }}>
//         {/* Add your main content here */}
//       </Box>
//     </Box>
//   );
// };

// export default AdminNavbar;




'use client';
import React, { useState, useEffect } from 'react';
import { AppBar, Toolbar, Typography, IconButton, InputBase, Badge, Box } from '@mui/material';
import { Search as SearchIcon, Notifications as NotificationsIcon, Language as LanguageIcon, AccountCircle as AccountCircleIcon, Menu as MenuIcon } from '@mui/icons-material';
import { styled, alpha } from '@mui/material/styles';
import Sidebar from './Sidebar';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginLeft: theme.spacing(2),
  marginRight: theme.spacing(2),
  width: '100%',
  [theme.breakpoints.up('md')]: {
    marginLeft: theme.spacing(3),
    marginRight: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '40ch',
    },
  },
}));

const AdminNavbar = () => {
  const [sidebarOpen, setSidebarOpen] = useState(() => {
    // Ensure initial state is read from localStorage only once
    const savedSidebarState = localStorage.getItem('sidebarOpen');
    return savedSidebarState !== null ? JSON.parse(savedSidebarState) : false;
  });

  useEffect(() => {
    localStorage.setItem('sidebarOpen', JSON.stringify(sidebarOpen));
  }, [sidebarOpen]);

  const handleToggleSidebar = () => {
    setSidebarOpen(prevState => !prevState);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <AppBar position="fixed" sx={{ width: '100%', zIndex: 1300 }}>
        <Toolbar sx={{ justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit" aria-label="open drawer" onClick={handleToggleSidebar} edge="start" sx={{ marginRight: 2 }}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" noWrap component="div" sx={{ display: { xs: 'none', md: 'block' } }}>
              Admin Dashboard
            </Typography>
          </Box>
          <Search>
            <SearchIconWrapper>
              <SearchIcon />
            </SearchIconWrapper>
            <StyledInputBase placeholder="Search…" inputProps={{ 'aria-label': 'search' }} style={{width: '100%'}}/>
          </Search>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton color="inherit">
              <Badge badgeContent={4} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
            <IconButton color="inherit">
              <LanguageIcon />
            </IconButton>
            <IconButton edge="end" color="inherit">
              <AccountCircleIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Sidebar open={sidebarOpen} onToggle={handleToggleSidebar} />
      <Box component="main" sx={{ flexGrow: 1, p: 3, marginTop: '64px', width: '100%' }}>
        {/* Add your main content here */}
      </Box>
    </Box>
  );
};

export default AdminNavbar;
