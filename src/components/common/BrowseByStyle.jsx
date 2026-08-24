import React from 'react';
import { Box, Typography } from '@mui/material';

// Local images ko import karein
import casualImg from '../imgfrontend/image 11.png';
import formalImg from '../imgfrontend/Frame 62.png';
import partyImg from '../imgfrontend/Frame 64.png';
import gymImg from '../imgfrontend/Frame 63.png';

const categories = [
  {
    id: 'casual',
    title: 'Casual',
    image: casualImg,
    span: { xs: 12, md: 4 },
  },
  {
    id: 'formal',
    title: 'Formal',
    image: formalImg,
    span: { xs: 12, md: 8 },
  },
  {
    id: 'party',
    title: 'Party',
    image: partyImg,
    span: { xs: 12, md: 8 },
  },
  {
    id: 'gym',
    title: 'Gym',
    image: gymImg,
    span: { xs: 12, md: 4 },
  },
];

const BrowseByStyle = () => {
  return (
    <Box
      component="section"
      sx={{
        backgroundColor: '#F0F0F0',
        borderRadius: { xs: '16px', sm: '24px', md: '32px' },
        px: { xs: '12px', sm: '24px', md: '40px' },
        py: { xs: '20px', sm: '32px', md: '36px' },
        maxWidth: '1200px',
        width: { xs: 'calc(100% - 24px)', md: '100%' },
        mx: 'auto',
        my: { xs: 2, md: 3 },
        boxSizing: 'border-box',
      }}
    >
      {/* Title */}
      <Typography
        variant="h3"
        align="center"
        sx={{
          fontWeight: 900,
          fontFamily: 'sans-serif',
          mb: { xs: 2, sm: 3, md: 3.5 },
          textTransform: 'uppercase',
          color: '#000000',
          fontSize: { xs: '22px', sm: '30px', md: '36px', lg: '40px' },
          lineHeight: 1.15,
        }}
      >
        BROWSE BY DRESS STYLE
      </Typography>

      {/* Grid Container */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(12, 1fr)' },
          gap: { xs: '12px', sm: '16px', md: '20px' },
        }}
      >
        {categories.map((item) => (
          <Box
            key={item.id}
            sx={{
              gridColumn: {
                xs: 'span 12',
                md: `span ${item.span.md}`,
              },
              position: 'relative',
              height: { xs: '150px', sm: '170px', md: '190px', lg: '210px' },
              backgroundColor: '#FFFFFF',
              borderRadius: { xs: '12px', sm: '16px', md: '20px' },
              overflow: 'hidden',
              cursor: 'pointer',
              transition: 'transform 0.25s ease, box-shadow 0.25s ease',
              '&:hover': {
                transform: 'translateY(-3px)',
                boxShadow: '0 8px 18px rgba(0,0,0,0.08)',
              },
            }}
          >
            {/* Card Title */}
            <Typography
              sx={{
                position: 'absolute',
                top: { xs: '12px', sm: '16px', md: '20px' },
                left: { xs: '12px', sm: '20px', md: '28px' },
                fontWeight: 800,
                fontSize: { xs: '18px', sm: '22px', md: '28px' },
                color: '#000000',
                zIndex: 2,
              }}
            >
              {item.title}
            </Typography>

            {/* Model Image */}
            <Box
              component="img"
              src={item.image}
              alt={item.title}
              sx={{
                position: 'absolute',
                top: 0,
                right: 0,
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                objectPosition: 'right top',
                zIndex: 1,
                pointerEvents: 'none',
              }}
            />
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default BrowseByStyle;