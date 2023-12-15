import { HomeTwoTone, EditTwoTone, CheckCircleTwoTone } from '@ant-design/icons';
import { Menu } from 'antd';
import { useState } from 'react';
import { Outlet, Link } from 'react-router-dom';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';



// const Header = () => {
//     const [current, setCurrent] = useState('h');
//     const onClick = (e) => {
//         console.log('click ', e);
//         setCurrent(e.key);
//     };
//     return (
//         <>
//             <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal">
//                 <Menu.Item key="h" icon={<HomeTwoTone />}>
//                     <Link to="/">Home</Link>
//                 </Menu.Item>
//                 <Menu.Item key="r" icon={<EditTwoTone />} style={{ marginLeft: 'auto' }}>
//                     <Link to="/register">Register</Link>
//                 </Menu.Item>
//                 <Menu.Item key="l" icon={<CheckCircleTwoTone />} >
//                     <Link to="/login">Login</Link>
//                 </Menu.Item>
//             </Menu>
//             <Outlet />
//         </>

//     )note

const Header = () => {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Box sx={{ display: "flex", gap: 2 }}>
                        <Button component={Link} variant="outline" color="primary" to="/home">
                            Home
                        </Button>
                        <Button component={Link} variant="ouitline" color="primary" to="/register">
                            Register
                        </Button>
                    </Box>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
export default Header;