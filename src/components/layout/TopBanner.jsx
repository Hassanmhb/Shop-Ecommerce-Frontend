import React, { useState } from 'react';
import { Box, Typography, IconButton, Link } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { toast } from 'react-toastify';

const TopBanner = () => {
  const [showBanner, setShowBanner] = useState(true);

  if (!showBanner) return null;

  const handleSignUpClick = (e) => {
    e.preventDefault();
    toast.info("Sign up discount activated!", { position: "top-right" });
  };

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        py: 1,
        px: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        fontSize: '14px',
      }}
    >
      <Typography variant="body2" sx={{ textAlign: 'center', fontSize: { xs: '12px', sm: '14px' } }}>
        Sign up and get 20% off to your first order.{' '}
        <Link
          underline="always"
          onClick={handleSignUpClick}
          sx={{
            color: '#FFFFFF',
            fontWeight: 'bold',
            cursor: 'pointer',
            ml: 0.5,
            '&:hover': { opacity: 0.8 }
          }}
        >
          Sign Up Now
        </Link>
      </Typography>

      <IconButton
        size="small"
        onClick={() => setShowBanner(false)}
        sx={{
          color: '#FFFFFF',
          position: 'absolute',
          right: { xs: 8, md: 16 },
        }}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </Box>
  );
};

export default TopBanner;