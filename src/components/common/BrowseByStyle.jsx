import React from 'react';
import { Box, Typography, Grid } from '@mui/material';

// Local Images Import
import casualImg from '../home/imgfrontend/Frame 62.png';
import formalImg from '../home/imgfrontend/Frame 63.png';
import partyImg from '../home/imgfrontend/Frame 64.png';
import gymImg from '../home/imgfrontend/image 11.png';

const categories = [
  { id: 'casual', image: casualImg, mdSpan: 4 },
  { id: 'formal', image: formalImg, mdSpan: 8 },
  { id: 'party',  image: partyImg,  mdSpan: 8 },
  { id: 'gym',    image: gymImg,    mdSpan: 4 },
];

const BrowseByStyle = () => {
  return (
    <Box
      sx={{
        backgroundColor: '#F0F0F0',
        borderRadius: { xs: '20px', md: '40px' },
        p: { xs: 2, sm: 3, md: 6 },
        maxWidth: '1240px',
        width: '100%',
        mx: 'auto',
        my: 4,
        boxSizing: 'border-box',
      }}
    >
      <Typography
        variant="h4"
        align="center"
        fontWeight="800"
        sx={{
          fontFamily: 'Integral CF, sans-serif',
          fontSize: { xs: '22px', sm: '32px', md: '48px' },
          mb: { xs: 3, md: 5 },
          letterSpacing: '-0.5px',
          color: '#000',
        }}
      >
        BROWSE BY DRESS STYLE
      </Typography>

      <Grid container spacing={{ xs: 2, md: 3 }}>
        {categories.map((cat) => (
          <Grid item xs={12} md={cat.mdSpan} key={cat.id}>
            <Box
              sx={{
                position: 'relative',
                // Mobile par responsive height (aspectRatio), Desktop par exact 289px
                height: { xs: 'auto', md: '289px' },
                aspectRatio: { xs: '310 / 190', sm: '16 / 9', md: 'unset' },
                width: '100%',
                borderRadius: '20px',
                overflow: 'hidden',
                backgroundColor: '#FFFFFF',
                cursor: 'pointer',
                transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                '&:hover': {
                  transform: 'scale(1.02)',
                },
              }}
            >
              {/* Background Image */}
              <Box
                component="img"
                src={cat.image}
                alt={cat.id}
                sx={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  // Mobile par center align taakay side gaps na aayen
                  objectPosition: { xs: 'center center', md: 'top right' },
                  display: 'block',
                }}
              />
            </Box>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default BrowseByStyle;