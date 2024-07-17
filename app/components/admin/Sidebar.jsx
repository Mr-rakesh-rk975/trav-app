//  /components/admin/Sidebar.jsx

'use client';
import React from 'react';
import { Drawer, List, ListItem, ListItemText, ListItemIcon } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTachometerAlt, faUsers, faSuitcase, faClipboardList, faTag, faCogs, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const Sidebar = ({ open, onToggle }) => {
  const router = useRouter();
  const iconStyle = { fontSize: '1.25rem', width: '20px', height: '20px' }; // Consistent icon size

  const handleLogout = () => {
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('role');
    router.push('/login');
  };

  return (
    <Drawer
      variant="persistent"
      open={open}
      sx={{
        '& .MuiDrawer-paper': {
          top: '64px', // Adjust based on the height of the navbar
          height: 'calc(100% - 64px)', // Adjust based on the height of the navbar
          width: 240,
          boxSizing: 'border-box',
          transition: 'width 0.3s',
        },
      }}
    >
      <List>
        <Link href="/admin/dashboard" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faTachometerAlt} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
        </Link>
        <Link href="/admin/users" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faUsers} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Users" />
          </ListItem>
        </Link>
        <Link href="/admin/packages" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faSuitcase} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Packages" />
          </ListItem>
        </Link>
        <Link href="/admin/bookings" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faClipboardList} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Bookings" />
          </ListItem>
        </Link>
        <Link href="/admin/coupons" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faTag} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Coupons" />
          </ListItem>
        </Link>
        <Link href="/admin/settings" passHref>
          <ListItem button>
            <ListItemIcon><FontAwesomeIcon icon={faCogs} style={iconStyle} /></ListItemIcon>
            <ListItemText primary="Settings" />
          </ListItem>
        </Link>
        <ListItem button onClick={handleLogout}>
          <ListItemIcon><FontAwesomeIcon icon={faSignOutAlt} style={iconStyle} /></ListItemIcon>
          <ListItemText primary="Logout" />
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
