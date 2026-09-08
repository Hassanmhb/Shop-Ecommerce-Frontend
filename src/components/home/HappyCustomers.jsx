import React, { useRef } from 'react';
import { Box, Typography, Container, IconButton, Rating } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

const testimonials = [
  {
    id: 1,
    name: 'Sarah M.',
    rating: 5,
    verified: true,
    review:
      "I'm blown away by the quality and style of the clothes I received from Shop.co. From casual wear to elegant dresses, every piece I've bought has exceeded my expectations.",
  },
  {
    id: 2,
    name: 'Alex K.',
    rating: 5,
    verified: true,
    review:
      "Finding clothes that align with my personal style used to be a challenge until I discovered Shop.co. The range of options they offer is truly remarkable, catering to a variety of tastes and occasions.",
  },
  {
    id: 3,
    name: 'James L.',
    rating: 5,
    verified: true,
    review:
      "As someone who's always on the lookout for unique fashion pieces, I'm thrilled to have stumbled upon Shop.co. The selection of clothes is not only diverse but also on-point with the latest trends.",
  },
  {
    id: 4,
    name: 'Mooen T.',
    rating: 5,
    verified: true,
    review:
      "Shopping here was a seamless experience! The customer support was super helpful, and the delivery was amazingly fast. Highly recommended!",
  },
  {
    id: 5,
    name: 'Emily R.',
    rating: 5,
    verified: true,
    review:
      "The fabric quality is top-notch. Fits perfectly according to the size chart. I will definitely be ordering again very soon!",
  },
];

const HappyCustomers = () => {
  const scrollRef = useRef(null);

  const handleScroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === 'left' ? -380 : 380;
      scrollRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <Box component="section" sx={{ py: { xs: 5, md: 8 }, width: '100%', overflow: 'hidden' }}>
      <Container maxWidth="lg">
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            mb: { xs: 3, md: 5 },
          }}
        >
          <Typography
            variant="h2"
            sx={{
              fontWeight: 900,
              fontFamily: 'sans-serif',
              fontSize: { xs: '28px', sm: '36px', md: '48px' },
              color: '#000000',
              textTransform: 'uppercase',
              letterSpacing: '-1px',
            }}
          >
            OUR HAPPY CUSTOMERS
          </Typography>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton
              onClick={() => handleScroll('left')}
              sx={{
                color: '#000000',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
              }}
            >
              <ArrowBackIcon />
            </IconButton>
            <IconButton
              onClick={() => handleScroll('right')}
              sx={{
                color: '#000000',
                '&:hover': { backgroundColor: 'rgba(0,0,0,0.05)' },
              }}
            >
              <ArrowForwardIcon />
            </IconButton>
          </Box>
        </Box>

        <Box
          ref={scrollRef}
          sx={{
            display: 'flex',
            gap: { xs: 2, md: 3 },
            overflowX: 'auto',
            scrollSnapType: 'x mandatory',
            py: 1,
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {testimonials.map((item) => (
            <Box
              key={item.id}
              sx={{
                flex: {
                  xs: '0 0 280px',
                  sm: '0 0 340px',
                  md: '0 0 380px',
                },
                scrollSnapAlign: 'start',
                backgroundColor: '#FFFFFF',
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                p: { xs: 2.5, md: 3.5 },
                display: 'flex',
                flexDirection: 'column',
                justify: 'flex-start',
                boxSizing: 'border-box',
              }}
            >
              <Rating
                value={item.rating}
                readOnly
                size="small"
                sx={{
                  color: '#FFC107',
                  mb: 1.5,
                }}
              />

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8, mb: 1.5 }}>
                <Typography
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: '16px', md: '20px' },
                    color: '#000000',
                  }}
                >
                  {item.name}
                </Typography>
                {item.verified && (
                  <CheckCircleIcon
                    sx={{
                      color: '#01B763',
                      fontSize: { xs: '18px', md: '20px' },
                    }}
                  />
                )}
              </Box>

              <Typography
                sx={{
                  color: 'rgba(0,0,0,0.6)',
                  fontSize: { xs: '13px', md: '15px' },
                  lineHeight: 1.6,
                  fontFamily: 'sans-serif',
                }}
              >
                "{item.review}"
              </Typography>
            </Box>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default HappyCustomers;