import React, { useState, useContext, useEffect } from 'react';
import {
  Box,
  Typography,
  InputBase,
  Badge,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import CloseIcon from '@mui/icons-material/Close';
import { useNavigate, useLocation } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';

const Navbar = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [user, setUser] = useState({});
  const [token, setToken] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);
  const { totalCartCount } = useContext(ProductContext);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    const storedUser = localStorage.getItem('user');
    setToken(storedToken);
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        setUser({});
      }
    } else {
      setUser({});
    }
  }, [location]);

  const handleDrawerToggle = () => setMobileOpen((prev) => !prev);
  const handleCartClick = () => navigate('/cart');

  // Profile Icon Click Handler (Smart Redirect for Local & Live Vercel Admin)
  const handleProfileClick = (event) => {
    const currentToken = localStorage.getItem('token');
    const currentUserStr = localStorage.getItem('user');

    const isLocal = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
    const adminBaseUrl = isLocal 
      ? 'http://localhost:5175' 
      : 'https://admin-dashboard-seven-beta-63.vercel.app';

    // Agar token valid hai, tabhi Auth Callback query ke saath redirection karein
    if (currentToken && currentUserStr && currentUserStr !== '{}') {
      window.location.href = `${adminBaseUrl}/auth-callback?token=${currentToken}&user=${encodeURIComponent(currentUserStr)}`;
    } else {
      // Direct Admin Login Route par redirect karein jab user logged in na ho
      window.location.href = `${adminBaseUrl}/login`;
    }
  };

  const handleMenuClose = () => setAnchorEl(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser({});
    setToken(null);
    handleMenuClose();
    navigate('/login');
  };

  const handleSearchSubmit = (e) => {
    if (e.key === 'Enter' && searchTerm.trim()) {
      navigate(`/category?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchOpen(false);
    }
  };

  const handleNavClick = (item) => {
    if (item.type === 'route') {
      navigate(item.path);
    } else {
      if (location.pathname !== '/') {
        navigate('/', { state: { targetId: item.id } });
        setTimeout(() => {
          const element = document.getElementById(item.id);
          if (element) element.scrollIntoView({ behavior: 'smooth' });
        }, 150);
      } else {
        const element = document.getElementById(item.id);
        if (element) element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  const navLinks = [
    { label: 'Shop', id: 'dress-style', type: 'scroll', hasDropdown: true },
    { label: 'On Sale', id: 'top-selling', type: 'scroll', hasDropdown: false },
    { label: 'New Arrivals', id: 'new-arrivals', type: 'scroll', hasDropdown: false },
    { label: 'Brands', path: '/category', type: 'route', hasDropdown: false },
  ];

  return (
    <Box
      component="header"
      sx={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        py: 2,
        backgroundColor: '#FFFFFF',
        borderBottom: '1px solid #E5E5E5',
        gap: { xs: 1, sm: 2, md: 3, lg: 5 },
      }}
    >
      {/* Brand & Mobile Hamburger */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#000000', p: 0.5 }}
        >
          <MenuIcon sx={{ fontSize: '26px' }} />
        </IconButton>

        <Typography
          variant="h5"
          onClick={() => navigate('/')}
          sx={{
            fontWeight: 900,
            letterSpacing: '-1px',
            fontFamily: '"Integral CF", "Arial Black", sans-serif',
            fontSize: { xs: '20px', sm: '26px', lg: '32px' },
            cursor: 'pointer',
            userSelect: 'none',
            color: '#000000',
            lineHeight: 1,
          }}
        >
          SHOP.CO
        </Typography>
      </Box>

      {/* Desktop Navigation */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          gap: { md: 2, lg: 3.5 },
          whiteSpace: 'nowrap',
        }}
      >
        {navLinks.map((item) => (
          <Box
            key={item.label}
            onClick={() => handleNavClick(item)}
            sx={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              color: '#000000',
              py: 0.5,
              '&::after': {
                content: '""',
                position: 'absolute',
                width: '0%',
                height: '2px',
                bottom: 0,
                left: 0,
                backgroundColor: '#000000',
                transition: 'width 0.3s ease-in-out',
              },
              '&:hover::after': { width: '100%' },
            }}
          >
            <Typography sx={{ fontWeight: 400, fontSize: { md: '14px', lg: '16px' } }}>
              {item.label}
            </Typography>
            {item.hasDropdown && <KeyboardArrowDownIcon sx={{ fontSize: '18px', ml: 0.3 }} />}
          </Box>
        ))}
      </Box>

      {/* Desktop Search Bar */}
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          backgroundColor: '#F0F0F0',
          borderRadius: '62px',
          px: 2,
          py: 0.8,
          flexGrow: 1,
          maxWidth: '580px',
        }}
      >
        <SearchIcon sx={{ color: '#888888', mr: 1, fontSize: '20px' }} />
        <InputBase
          placeholder="Search for products..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyDown={handleSearchSubmit}
          fullWidth
          sx={{
            fontSize: '14px',
            color: '#000000',
            '& input::placeholder': { color: '#888888', opacity: 1 },
          }}
        />
      </Box>

      {/* Action Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 } }}>
        <IconButton
          onClick={() => setSearchOpen((prev) => !prev)}
          sx={{ display: { xs: 'flex', md: 'none' }, color: '#000000', p: 1 }}
        >
          {searchOpen ? <CloseIcon /> : <SearchIcon />}
        </IconButton>

        <IconButton onClick={handleCartClick} sx={{ color: '#000000', p: 1 }}>
          <Badge
            badgeContent={totalCartCount}
            color="primary"
            sx={{ '& .MuiBadge-badge': { fontSize: '10px', height: '16px', minWidth: '16px' } }}
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: { xs: '22px', sm: '24px' } }} />
          </Badge>
        </IconButton>

        {/* Profile Icon with Redirect Handling */}
        <IconButton onClick={handleProfileClick} sx={{ color: '#000000', p: 1 }}>
          <AccountCircleOutlinedIcon sx={{ fontSize: { xs: '22px', sm: '24px' } }} />
        </IconButton>
      </Box>

      {/* Mobile Search Input Popup */}
      {searchOpen && (
        <Box
          sx={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            backgroundColor: '#FFFFFF',
            px: 2,
            py: 1.5,
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
            zIndex: 99,
            display: { xs: 'flex', md: 'none' },
            alignItems: 'center',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#F0F0F0',
              borderRadius: '62px',
              px: 2,
              py: 0.8,
              width: '100%',
            }}
          >
            <SearchIcon sx={{ color: '#888888', mr: 1, fontSize: '20px' }} />
            <InputBase
              placeholder="Search for products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleSearchSubmit}
              fullWidth
              autoFocus
              sx={{ fontSize: '14px' }}
            />
          </Box>
        </Box>
      )}

      {/* Mobile Sidebar Navigation Drawer */}
      <Drawer
        anchor="left"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        PaperProps={{ sx: { width: '280px', p: 2.5 } }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Typography variant="h6" sx={{ fontWeight: 900, fontFamily: 'sans-serif' }}>
            SHOP.CO
          </Typography>
          <IconButton onClick={handleDrawerToggle} size="small">
            <CloseIcon />
          </IconButton>
        </Box>
        <Divider sx={{ mb: 2 }} />
        <List disablePadding>
          {navLinks.map((item) => (
            <ListItem key={item.label} disablePadding sx={{ mb: 1 }}>
              <ListItemButton
                onClick={() => {
                  handleDrawerToggle();
                  handleNavClick(item);
                }}
                sx={{ borderRadius: '8px', py: 1, '&:hover': { backgroundColor: '#F5F5F5' } }}
              >
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{ fontWeight: 500, fontSize: '16px' }}
                />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </Box>
  );
};

export default Navbar;