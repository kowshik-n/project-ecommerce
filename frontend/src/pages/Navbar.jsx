import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Login, Logout, Shop2, Store } from '@mui/icons-material';
import { Fade } from '@mui/material';

import { Link, useNavigate } from 'react-router-dom';
import { Avatar, Badge, Divider, Drawer, ListItemIcon } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { styled } from 'styled-components';
import { NavLogo } from '../utils/styles';

import Cart from './customer/components/Cart';
import Search from './customer/components/Search';
import ProductsMenu from './customer/components/ProductsMenu';
import { updateCustomer } from '../redux/userHandle';

// Update the theme colors
const theme = {
    colors: {
        primary: '#6c5ce7',
        primaryDark: '#5541e5',
        secondary: '#ff4757',
        accent: '#ffd32a',
        white: '#ffffff',
        text: {
            primary: '#2d3436',
            secondary: '#636e72',
            light: '#b2bec3'
        },
        background: {
            light: '#f8f9fa',
            white: '#ffffff'
        },
        hover: {
            light: 'rgba(255,255,255,0.1)',
            dark: 'rgba(0,0,0,0.05)'
        }
    }
};

const Navbar = () => {
    const { currentUser, currentRole } = useSelector(state => state.user);

    const totalQuantity = currentUser && currentUser.cartDetails && currentUser.cartDetails.reduce((total, item) => total + item.quantity, 0);

    const navigate = useNavigate()
    const dispatch = useDispatch();

    React.useEffect(() => {
        if (currentRole === "Customer") {
            console.log(currentUser);
            dispatch(updateCustomer(currentUser, currentUser._id));
        }
    }, [currentRole, currentUser, dispatch])

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const [anchorElSign, setAnchorElSign] = React.useState(null);

    const open = Boolean(anchorElUser);
    const openSign = Boolean(anchorElSign);

    const [isCartOpen, setIsCartOpen] = React.useState(false);

    // Cart
    const handleOpenCart = () => {
        setIsCartOpen(true);
    };

    const handleCloseCart = () => {
        setIsCartOpen(false);
    };

    // Navigation Menu
    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    // User Menu
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    // Signin Menu
    const handleOpenSigninMenu = (event) => {
        setAnchorElSign(event.currentTarget);
    };

    const handleCloseSigninMenu = () => {
        setAnchorElSign(null);
    };

    const homeHandler = () => {
        navigate("/")
    };

    return (
        <AppBar position="sticky" elevation={0}>
            <Container maxWidth="xl" sx={{ 
                background: `linear-gradient(to right, ${theme.colors.primary}, ${theme.colors.primaryDark})`,
                padding: '0.5rem 0',
                minHeight: '64px',
            }}>
                <Toolbar disableGutters sx={{ 
                    justifyContent: 'space-between',
                    minHeight: { xs: '64px', md: '64px' },
                    gap: 2
                }}>
                    {/* Logo Section */}
                    <HomeContainer>
                        <Typography
                            variant="h6"
                            noWrap
                            sx={{
                                display: 'flex',
                                fontFamily: '"Poppins", sans-serif',
                                fontWeight: 700,
                                fontSize: { xs: '1.3rem', md: '1.5rem' },
                                color: theme.colors.white,
                                textDecoration: 'none',
                                alignItems: 'center',
                                gap: 1,
                                letterSpacing: '-0.5px'
                            }}
                        >
                            <LocalMallIcon sx={{ 
                                display: { xs: 'none', md: 'flex' }, 
                                fontSize: '2rem',
                                filter: 'drop-shadow(0 2px 2px rgba(0,0,0,0.2))'
                            }} />
                            <NavLogo
                                to="top"
                                activeClass="active"
                                spy={true}
                                smooth={true}
                                offset={-70}
                                duration={500}
                                onClick={homeHandler}
                                style={{ 
                                    display: 'flex', 
                                    flexDirection: 'column', 
                                    alignItems: 'flex-start',
                                    lineHeight: 1.1
                                }}
                            >
                                E-Mart
                                <Typography 
                                    variant="caption" 
                                    sx={{ 
                                        fontSize: '11px', 
                                        fontStyle: 'italic',
                                        color: theme.colors.yellow,
                                        display: { xs: 'none', md: 'block' },
                                        fontWeight: 500,
                                        letterSpacing: '0.5px',
                                        textShadow: '0 1px 2px rgba(0,0,0,0.2)'
                                    }}
                                >
                                </Typography>
                            </NavLogo>
                        </Typography>
                    </HomeContainer>

                    {/* Search Bar */}
                    <Box sx={{ 
                        flex: 1,
                        maxWidth: '680px',
                        display: 'flex',
                        backgroundColor: theme.colors.white,
                        borderRadius: '4px',
                        overflow: 'hidden',
                        boxShadow: '0 2px 4px 0 rgba(0,0,0,.23)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            boxShadow: '0 3px 6px 0 rgba(0,0,0,.28)'
                        }
                    }}>
                        <Search />
                    </Box>

                    {/* Right Section */}
                    <Box sx={{ 
                        display: 'flex', 
                        alignItems: 'center',
                        gap: { xs: 2, md: 3.5 }
                    }}>
                        {currentRole === null &&
                            <>
                                <Button
                                    variant="contained"
                                    onClick={handleOpenSigninMenu}
                                    sx={{
                                        backgroundColor: theme.colors.white,
                                        color: theme.colors.primary,
                                        textTransform: 'none',
                                        padding: '6px 40px',
                                        fontWeight: 600,
                                        borderRadius: '2px',
                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                                        transition: 'all 0.3s ease',
                                        '&:hover': {
                                            backgroundColor: theme.colors.background.light,
                                            boxShadow: '0 3px 6px rgba(0,0,0,0.15)'
                                        }
                                    }}
                                >
                                    Login
                                </Button>
                                {/* Sign in Menu */}
                                <Menu
                                    anchorEl={anchorElSign}
                                    id="sign-menu"
                                    open={openSign}
                                    onClose={handleCloseSigninMenu}
                                    onClick={handleCloseSigninMenu}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: styles.styledPaper,
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => navigate("/Customerlogin")}>
                                        <Avatar />
                                        Sign in as customer
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate("/Sellerlogin")}>
                                        <ListItemIcon>
                                            <Store fontSize="small" />
                                        </ListItemIcon>
                                        Sign in as seller
                                    </MenuItem>
                                </Menu>
                            </>
                        }

                        {currentRole === "Customer" && (
                            <>
                                <Tooltip 
                                    title="Cart" 
                                    arrow 
                                    TransitionComponent={Fade}
                                    TransitionProps={{ timeout: 600 }}
                                >
                                    <IconButton 
                                        onClick={handleOpenCart}
                                        sx={{ 
                                            color: theme.colors.white,
                                            padding: '8px',
                                            transition: 'transform 0.2s ease',
                                            '&:hover': {
                                                transform: 'scale(1.1)',
                                                backgroundColor: theme.colors.hover.light
                                            }
                                        }}
                                    >
                                        <Badge 
                                            badgeContent={totalQuantity} 
                                            color="error"
                                            sx={{
                                                '& .MuiBadge-badge': {
                                                    backgroundColor: theme.colors.secondary,
                                                    color: theme.colors.white,
                                                    fontWeight: 600,
                                                    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                                }
                                            }}
                                        >
                                            <ShoppingCartIcon sx={{ fontSize: '1.8rem' }} />
                                        </Badge>
                                    </IconButton>
                                </Tooltip>

                                <Box 
                                    sx={{ 
                                        display: 'flex',
                                        alignItems: 'center',
                                        cursor: 'pointer',
                                        padding: '4px 8px',
                                        borderRadius: '4px',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                            backgroundColor: theme.colors.hover.light
                                        }
                                    }}
                                    onClick={handleOpenUserMenu}
                                >
                                    <Avatar 
                                        sx={{ 
                                            width: 35, 
                                            height: 35,
                                            backgroundColor: theme.colors.primaryDark,
                                            fontSize: '1rem',
                                            fontWeight: 600,
                                            boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                                        }}
                                    >
                                        {String(currentUser.name).charAt(0)}
                                    </Avatar>
                                    <Typography 
                                        sx={{ 
                                            ml: 1, 
                                            color: theme.colors.white,
                                            display: { xs: 'none', md: 'block' },
                                            fontSize: '15px',
                                            fontWeight: 500
                                        }}
                                    >
                                        {currentUser.name.split(' ')[0]}
                                    </Typography>
                                </Box>

                                {/* User Profile Menu */}
                                <Menu
                                    anchorEl={anchorElUser}
                                    id="account-menu"
                                    open={open}
                                    onClose={handleCloseUserMenu}
                                    onClick={handleCloseUserMenu}
                                    PaperProps={{
                                        elevation: 0,
                                        sx: styles.styledPaper,
                                    }}
                                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                                >
                                    <MenuItem onClick={() => navigate("/Profile")}>
                                        <Avatar sx={{ backgroundColor: theme.colors.primaryDark }} />
                                        Profile
                                    </MenuItem>
                                    <MenuItem onClick={() => navigate("/Orders")}>
                                        <ListItemIcon>
                                            <Shop2 fontSize="small" />
                                        </ListItemIcon>
                                        My Orders
                                    </MenuItem>
                                    <Divider />
                                    <MenuItem onClick={() => navigate("/Logout")}>
                                        <ListItemIcon>
                                            <Logout fontSize="small" />
                                        </ListItemIcon>
                                        Logout
                                    </MenuItem>
                                </Menu>
                            </>
                        )}
                    </Box>

                </Toolbar>
            </Container>

            {/* Categories Bar */}
            <Box 
                sx={{ 
                    backgroundColor: theme.colors.white,
                    boxShadow: '0 2px 4px -2px rgba(0,0,0,.12)',
                    display: { xs: 'none', md: 'block' }
                }}
            >
                <Container maxWidth="xl">
                    <Box sx={{ 
                        display: 'flex',
                        gap: 5,
                        py: 1.2,
                        '& > *': {
                            color: theme.colors.text.primary,
                            fontSize: '14.5px',
                            fontWeight: 500,
                            textTransform: 'none',
                            transition: 'all 0.2s ease',
                            '&:hover': {
                                color: theme.colors.primary,
                                transform: 'translateY(-1px)'
                            }
                        }
                    }}>
                        <ProductsMenu dropName="Categories" />
                        <ProductsMenu dropName="Products" />
                    </Box>
                </Container>
            </Box>

            {/* Cart Drawer */}
            <Drawer
                anchor="right"
                open={isCartOpen}
                onClose={handleCloseCart}
                sx={{
                    '& .MuiDrawer-paper': {
                        width: { xs: '100%', sm: '400px' },
                        boxSizing: 'border-box',
                        boxShadow: '-4px 0 20px rgba(0,0,0,0.15)',
                        background: theme.colors.white,
                        borderLeft: 'none'
                    },
                }}
            >
                <Cart setIsCartOpen={setIsCartOpen} />
            </Drawer>
        </AppBar>
    );
}

const HomeContainer = styled.div`
  display: flex;
  cursor: pointer;
  align-items: center;
  min-width: fit-content;
  padding: 4px 8px;
  border-radius: 4px;
  transition: all 0.2s ease;
  
  &:hover {
    background-color: rgba(255,255,255,0.1);
  }
`;

const styles = {
    styledPaper: {
        overflow: 'visible',
        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
        mt: 1.5,
        borderRadius: '2px',
        '& .MuiMenuItem-root': {
            padding: '12px 24px',
            fontSize: '14px',
            '&:hover': {
                backgroundColor: theme.colors.hover.grey
            }
        },
        '& .MuiDivider-root': {
            margin: '8px 0',
        },
        '&:before': {
            content: '""',
            display: 'block',
            position: 'absolute',
            top: 0,
            right: 14,
            width: 10,
            height: 10,
            bgcolor: theme.colors.white,
            transform: 'translateY(-50%) rotate(45deg)',
            zIndex: 0,
        },
    }
}

// Update the styled components with new styles
const NavbarContainer = styled(AppBar)`
  && {
    background: ${theme.colors.primary};
    box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  }
`;

const ToolbarStyled = styled(Toolbar)`
  && {
    padding: 8px 24px;
    gap: 24px;
    
    @media (max-width: 600px) {
      padding: 8px 16px;
      gap: 16px;
    }
  }
`;

const LogoContainer = styled(Box)`
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  padding: 8px;
  border-radius: 8px;
  transition: all 0.3s ease;
  
  &:hover {
    background: ${theme.colors.hover.light};
  }
`;

const LogoText = styled(Typography)`
  && {
    font-family: 'Poppins', sans-serif;
    font-weight: 700;
    font-size: 1.5rem;
    color: ${theme.colors.white};
    letter-spacing: -0.5px;
  }
`;

const SearchContainer = styled(Box)`
  flex: 1;
  max-width: 680px;
  background: ${theme.colors.white};
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 4px 12px rgba(0,0,0,0.15);
  }
`;

const ActionButtons = styled(Box)`
  display: flex;
  align-items: center;
  gap: 16px;
`;

const LoginButton = styled(Button)`
  && {
    background: ${theme.colors.white};
    color: ${theme.colors.primary};
    padding: 6px 24px;
    font-weight: 600;
    border-radius: 8px;
    text-transform: none;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${theme.colors.background.light};
      transform: translateY(-2px);
      box-shadow: 0 4px 12px rgba(0,0,0,0.1);
    }
  }
`;

const CartButton = styled(IconButton)`
  && {
    color: ${theme.colors.white};
    padding: 8px;
    transition: all 0.3s ease;
    
    &:hover {
      background: ${theme.colors.hover.light};
      transform: scale(1.1);
    }
  }
`;

const UserAvatar = styled(Avatar)`
  && {
    width: 35px;
    height: 35px;
    background: ${theme.colors.primaryDark};
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
    
    &:hover {
      transform: scale(1.1);
      box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    }
  }
`;

const CategoryBar = styled(Box)`
  && {
    background: ${theme.colors.white};
    box-shadow: 0 2px 4px rgba(0,0,0,0.05);
    
    @media (max-width: 768px) {
      display: none;
    }
  }
`;

const CategoryContainer = styled(Box)`
  display: flex;
  gap: 32px;
  padding: 12px 24px;
  
  & > * {
    color: ${theme.colors.text.primary};
    font-size: 14px;
    font-weight: 500;
    transition: all 0.2s ease;
    
    &:hover {
      color: ${theme.colors.primary};
      transform: translateY(-1px);
    }
  }
`;

// Update the StyledMenu styles
const StyledMenu = {
  paper: {
    overflow: 'visible',
    filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.15))',
    mt: 1.5,
    borderRadius: '8px',
    '& .MuiMenuItem-root': {
      padding: '12px 24px',
      fontSize: '14px',
      transition: 'all 0.2s ease',
      '&:hover': {
        background: theme.colors.background.light,
        color: theme.colors.primary
      }
    },
    '&:before': {
      content: '""',
      display: 'block',
      position: 'absolute',
      top: 0,
      right: 14,
      width: 10,
      height: 10,
      bgcolor: theme.colors.white,
      transform: 'translateY(-50%) rotate(45deg)',
      zIndex: 0,
    },
  }
};

export default Navbar;