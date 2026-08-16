import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { toast } from 'react-toastify';
import heroImage from '../../assets/heroim.jpg';

const HeroSection = () => {
  const handleShopNow = () => {
    toast.success('Redirecting to Shop Collection!', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#F2F0F1',
        pt: { xs: 4, sm: 5, lg: 6 },
        pb: 0,
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', lg: '550px' },
        height: { xs: 'auto', lg: 'calc(100vh - 80px)' },
      }}
    >
      {/* Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
          height: '100%',
          position: 'relative',
          justifyContent: 'space-between',

          '@media (min-width: 1024px)': {
            flexDirection: 'row',
            alignItems: 'stretch',
          },
        }}
      >
        {/* Left Content Box */}
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            zIndex: 3,
            pb: { xs: 4, lg: 6 },

            '@media (min-width: 1024px)': {
              width: '55%',
              maxWidth: '620px',
            },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '32px', sm: '42px', md: '48px', lg: '56px', xl: '64px' },
              fontWeight: 900,
              lineHeight: 1.0,
              textTransform: 'uppercase',
              mb: 2.5,
              color: '#000000',
              letterSpacing: '-1px',
              textAlign: { xs: 'center', lg: 'left' },
            }}
          >
            Find Clothes That Matches Your Style
          </Typography>

          <Typography
            variant="body1"
            sx={{
              color: 'rgba(0, 0, 0, 0.6)',
              fontSize: { xs: '14px', sm: '16px' },
              mb: 4,
              lineHeight: 1.6,
              maxWidth: { xs: '100%', sm: '500px' },
              mx: { xs: 'auto', lg: 0 },
              textAlign: { xs: 'center', lg: 'left' },
            }}
          >
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </Typography>

          <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
            <Button
              variant="contained"
              onClick={handleShopNow}
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '62px',
                px: { xs: 5, sm: 6 },
                py: 1.8,
                fontSize: '16px',
                textTransform: 'none',
                fontWeight: 500,
                boxShadow: 'none',
                width: { xs: '100%', sm: '210px' },
                mb: { xs: 5, lg: 6 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* Stats Bar */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: { xs: 'wrap', sm: 'nowrap' },
              justifyContent: { xs: 'center', lg: 'flex-start' },
              alignItems: 'center',
              gap: { xs: 2, sm: 3, lg: 4 },
              width: '100%',
            }}
          >
            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '24px', sm: '28px', lg: '36px' }, color: '#000000' }}>
                200+
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: { xs: '12px', sm: '13px' }, whiteSpace: 'nowrap' }}>
                International Brands
              </Typography>
            </Box>

            <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.15)', height: '45px', display: { xs: 'none', sm: 'block' } }} />

            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '24px', sm: '28px', lg: '36px' }, color: '#000000' }}>
                2,000+
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: { xs: '12px', sm: '13px' }, whiteSpace: 'nowrap' }}>
                High-Quality Products
              </Typography>
            </Box>

            <Box sx={{ borderRight: '1px solid rgba(0, 0, 0, 0.15)', height: '45px', display: { xs: 'none', sm: 'block' } }} />

            <Box sx={{ textAlign: { xs: 'center', lg: 'left' } }}>
              <Typography variant="h4" sx={{ fontWeight: 700, fontSize: { xs: '24px', sm: '28px', lg: '36px' }, color: '#000000' }}>
                30,000+
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: { xs: '12px', sm: '13px' }, whiteSpace: 'nowrap' }}>
                Happy Customers
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Right Side Image Area - Absolute Positioned on Desktop */}
        <Box
          sx={{
            width: '100%',
            position: 'relative',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            zIndex: 1,

            '@media (min-width: 1024px)': {
              width: '50%',
              position: 'absolute',
              right: 0,
              bottom: 0,
              top: 0,
              justifyContent: 'flex-end',
              pointerEvents: 'none',
            },
          }}
        >
          {/* Small Sparkle */}
          <AutoAwesomeIcon
            sx={{
              position: 'absolute',
              top: { xs: '30%', lg: '40%' },
              left: { xs: '5%', lg: '10%' },
              fontSize: { xs: '36px', lg: '56px' },
              color: '#000000',
              zIndex: 3,
            }}
          />

          {/* Big Sparkle */}
          <AutoAwesomeIcon
            sx={{
              position: 'absolute',
              top: { xs: '2%', lg: '5%' },
              right: { xs: '5%', lg: '5%' },
              fontSize: { xs: '52px', lg: '80px' },
              color: '#000000',
              zIndex: 3,
            }}
          />

          {/* Hero Image - Maximum Size Fix */}
          <Box
            component="img"
            src={heroImage}
            alt="Hero Fashion Models"
            loading="lazy"
            sx={{
              display: 'block',
              width: '100%',
              height: 'auto',
              maxHeight: { xs: '400px', sm: '500px', lg: 'none' },

              // Desktop CSS Rules to keep image BIG & AT THE BOTTOM
              '@media (min-width: 1024px)': {
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'top center',
              },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;