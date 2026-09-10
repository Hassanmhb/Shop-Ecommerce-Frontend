import React from 'react';
import { Box, Typography } from '@mui/material';

const brands = [
  { name: 'VERSACE', fontFamily: 'serif' },
  { name: 'ZARA', fontFamily: 'sans-serif', letterSpacing: '4px' },
  { name: 'GUCCI', fontFamily: 'serif' },
  { name: 'PRADA', fontFamily: 'serif', fontWeight: 900 },
  { name: 'Calvin Klein', fontFamily: 'sans-serif' },
];

const BrandsBanner = () => {
  // Infinite scroll loop ke liye list duplicate ki hai
  const extendedBrands = [...brands, ...brands, ...brands];

  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        py: { xs: 3, md: 4 },
        overflow: 'hidden',
        width: '100%',
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        '@keyframes marquee': {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-33.33%)' },
        },
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          gap: { xs: 4, md: 8 },
          whiteSpace: 'nowrap',
          width: 'max-content',
          animation: 'marquee 20s linear infinite',
          '&:hover': {
            animationPlayState: 'paused',
          },
        }}
      >
        {extendedBrands.map((brand, index) => (
          <Typography
            key={index}
            variant="h5"
            sx={{
              color: '#FFFFFF',
              fontWeight: brand.fontWeight || 700,
              fontSize: { xs: '22px', sm: '28px', md: '36px' },
              fontFamily: brand.fontFamily,
              letterSpacing: brand.letterSpacing || '1px',
              textTransform: 'uppercase',
              opacity: 0.9,
              transition: 'opacity 0.2s ease',
              cursor: 'pointer',
              display: 'inline-block',
              px: { xs: 1, md: 2 },
              '&:hover': {
                opacity: 1,
              },
            }}
          >
            {brand.name}
          </Typography>
        ))}
      </Box>
    </Box>
  );
};

export default BrandsBanner;