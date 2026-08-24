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
        py: { xs: 0.75, sm: 1 },
        px: { xs: 1, sm: 2 },
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '100%',
        boxSizing: 'border-box',
        overflow: 'hidden',
      }}
    >
      {/* Centered Content Wrapper */}
      <Box 
        sx={{ 
          flex: 1, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          minWidth: 0, 
        }}
      >
        <Typography
          variant="body2"
          sx={{
            textAlign: 'center',
            fontSize: { xs: '10px', sm: '14px' },
            lineHeight: 1.2,
            wordBreak: 'break-word',
          }}
        >
          Sign up and get 20% off to your first order.{' '}
          <Link
            underline="always"
            onClick={handleSignUpClick}
            sx={{
              color: '#FFFFFF',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'inline-block',
              ml: 0.5,
              '&:hover': { opacity: 0.8 },
            }}
          >
            Sign Up Now
          </Link>
        </Typography>
      </Box>

      {/* Close Button */}
      <IconButton
        size="small"
        onClick={() => setShowBanner(false)}
        sx={{
          color: '#FFFFFF',
          p: 0.5,
          ml: 0.5,
          flexShrink: 0,
        }}
        aria-label="close banner"
      >
        <CloseIcon sx={{ fontSize: { xs: '14px', sm: '18px' } }} />
      </IconButton>
    </Box>
  );
};

export default TopBanner;