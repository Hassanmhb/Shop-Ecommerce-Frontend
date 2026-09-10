import React, { useState, useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import { toast } from 'react-toastify';
import heroImage from '../../assets/heroim.jpg';

const STATS_DATA = [
  [
    { number: '200+', label: 'International Brands' },
    { number: '2,000+', label: 'High-Quality Products' },
    { number: '30,000+', label: 'Happy Customers' },
  ],
  [
    { number: '250+', label: 'Top Fashion Designers' },
    { number: '5,000+', label: 'Verified Reviews' },
    { number: '50,000+', label: 'Worldwide Orders' },
  ],
  [
    { number: '150+', label: 'Exclusive Outlets' },
    { number: '12,000+', label: 'Styles Delivered' },
    { number: '99%', label: 'Customer Satisfaction' },
  ],
];

const HeroSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(true);

  const handleShopNow = () => {
    toast.success('Redirecting to Shop Collection!', {
      position: 'bottom-right',
      autoClose: 3000,
    });
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setFade(false);

      setTimeout(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % STATS_DATA.length);
        setFade(true);
      }, 300);
    }, 4000);

    return () => clearInterval(timer);
  }, []);

  const currentStats = STATS_DATA[currentIndex];

  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#F2F0F1',
        pt: { xs: 4, sm: 5, md: 6 },
        pb: 0,
        px: { xs: 2, sm: 4, md: 6, lg: 8 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: 'auto', md: '550px' },
        height: { xs: 'auto', md: 'calc(100vh - 80px)' },
        maxHeight: { md: '650px', lg: '700px', xl: '800px' },
      }}
    >
      {/* Wrapper */}
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: { xs: 'center', md: 'stretch' },
          width: '100%',
          height: '100%',
          position: 'relative',
          justifyContent: 'space-between',
          maxWidth: '1440px',
          mx: 'auto',
        }}
      >
        {/* Left Content Box */}
        <Box
          sx={{
            width: { xs: '100%', md: '55%' },
            maxWidth: { md: '550px', lg: '620px' },
            display: 'flex',
            flexDirection: 'column',
            justify: 'center',
            zIndex: 3,
            pb: { xs: 4, md: 6 },
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: { xs: '32px', sm: '42px', md: '44px', lg: '56px', xl: '60px' },
              fontWeight: 900,
              lineHeight: 1.0,
              textTransform: 'uppercase',
              mb: 2.5,
              color: '#000000',
              letterSpacing: '-1px',
              textAlign: { xs: 'center', md: 'left' },
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
              mx: { xs: 'auto', md: 0 },
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            Browse through our diverse range of meticulously crafted garments, designed to bring out your individuality and cater to your sense of style.
          </Typography>

          <Box sx={{ textAlign: { xs: 'center', md: 'left' } }}>
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
                mb: { xs: 5, md: 6 },
                transition: 'all 0.3s ease',
                '&:hover': {
                  backgroundColor: '#333333',
                },
              }}
            >
              Shop Now
            </Button>
          </Box>

          {/* Animated Stats Bar */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              justifyContent: { xs: 'center', md: 'flex-start' },
              alignItems: 'center',
              gap: { xs: 2, sm: 3, lg: 4 },
              width: '100%',
              opacity: fade ? 1 : 0,
              transform: fade ? 'translateY(0)' : 'translateY(10px)',
              transition: 'opacity 0.3s ease, transform 0.3s ease',
            }}
          >
            {currentStats.map((stat, idx) => (
              <React.Fragment key={idx}>
                <Box sx={{ textAlign: { xs: 'center', md: 'left' }, minWidth: { xs: '100px', sm: 'auto' } }}>
                  <Typography
                    variant="h4"
                    sx={{
                      fontWeight: 700,
                      fontSize: { xs: '24px', sm: '28px', lg: '36px' },
                      color: '#000000',
                    }}
                  >
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: 'rgba(0, 0, 0, 0.6)',
                      fontSize: { xs: '12px', sm: '13px' },
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {stat.label}
                  </Typography>
                </Box>

                {idx < currentStats.length - 1 && (
                  <Box
                    sx={{
                      borderRight: '1px solid rgba(0, 0, 0, 0.15)',
                      height: '45px',
                      display: {
                        xs: idx === 1 ? 'none' : 'block',
                        sm: 'block',
                      },
                    }}
                  />
                )}
              </React.Fragment>
            ))}
          </Box>
        </Box>

        {/* Right Side Image Area */}
        <Box
          sx={{
            width: { xs: '100%', md: '45%', lg: '50%' },
            position: { xs: 'relative', md: 'absolute' },
            right: { md: 0 },
            bottom: { md: 0 },
            top: { md: 0 },
            display: 'flex',
            justify: { xs: 'center', md: 'flex-end' },
            alignItems: 'flex-end',
            pointerEvents: { md: 'none' },
            zIndex: 1,
          }}
        >
          <AutoAwesomeIcon
            sx={{
              position: 'absolute',
              top: { xs: '30%', md: '35%' },
              left: { xs: '5%', md: '5%', lg: '10%' },
              fontSize: { xs: '36px', md: '44px', lg: '56px' },
              color: '#000000',
              zIndex: 3,
            }}
          />

          <AutoAwesomeIcon
            sx={{
              position: 'absolute',
              top: { xs: '2%', md: '5%' },
              right: { xs: '5%', md: '2%' },
              fontSize: { xs: '52px', md: '64px', lg: '80px' },
              color: '#000000',
              zIndex: 3,
            }}
          />

          <Box
            component="img"
            src={heroImage}
            alt="Hero Fashion Models"
            loading="lazy"
            sx={{
              display: 'block',
              width: '100%',
              height: { xs: 'auto', md: '100%' },
              maxHeight: { xs: '400px', sm: '500px', md: '100%' },
              objectFit: { md: 'contain' },
              objectPosition: { md: 'bottom right' },
            }}
          />
        </Box>
      </Box>
    </Box>
  );
};

export default HeroSection;