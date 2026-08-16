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
  return (
    <Box
      sx={{
        backgroundColor: '#000000',
        color: '#FFFFFF',
        py: { xs: 3, md: 4 },
        px: { xs: 2, md: 8 },
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: { xs: 'center', sm: 'space-around' },
        gap: { xs: 3, md: 6 },
      }}
    >
      {brands.map((brand, index) => (
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
            '&:hover': {
              opacity: 1,
            },
          }}
        >
          {brand.name}
        </Typography>
      ))}
    </Box>
  );
};

export default BrandsBanner;