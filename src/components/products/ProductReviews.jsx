import React, { useState } from 'react';
import {
  Box,
  Typography,
  Tabs,
  Tab,
  Button,
  Rating,
  IconButton,
  Menu,
  MenuItem,
  Card,
  CardContent,
  Chip,
  Stack,
} from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';

// Mock Reviews Data
const REVIEWS_DATA = [
  {
    id: 1,
    name: 'Samantha D.',
    verified: true,
    rating: 4.5,
    comment:
      '"I absolutely love this t-shirt! The design is unique and the fabric feels so comfortable. As a fellow designer, I appreciate the attention to detail. It\'s become my favorite go-to shirt."',
    date: 'August 14, 2023',
  },
  {
    id: 2,
    name: 'Alex M.',
    verified: true,
    rating: 4,
    comment:
      '"The t-shirt exceeded my expectations! The colors are vibrant and the print quality is top-notch. Being a UI/UX designer myself, I\'m quite picky about aesthetics, and this t-shirt definitely gets a thumbs up from me."',
    date: 'August 15, 2023',
  },
  {
    id: 3,
    name: 'Ethan R.',
    verified: true,
    rating: 4.5,
    comment:
      '"This t-shirt is a must-have for anyone who appreciates good design. The minimalistic yet stylish pattern caught my eye, and the fit is perfect. I can see the designer\'s touch in every aspect of this shirt."',
    date: 'August 16, 2023',
  },
  {
    id: 4,
    name: 'Olivia P.',
    verified: true,
    rating: 4,
    comment:
      '"As a UI/UX enthusiast, I value simplicity and functionality. This t-shirt not only represents those principles but also feels great to wear. It\'s evident that the designer poured their creativity into making this t-shirt stand out."',
    date: 'August 17, 2023',
  },
  {
    id: 5,
    name: 'Liam K.',
    verified: true,
    rating: 4,
    comment:
      '"This t-shirt is a fusion of comfort and creativity. The fabric is soft, and the design speaks volumes about the designer\'s skill. It\'s like wearing a piece of art that reflects my passion for both design and fashion."',
    date: 'August 18, 2023',
  },
  {
    id: 6,
    name: 'Ava H.',
    verified: true,
    rating: 4.5,
    comment:
      '"I\'m not just wearing a t-shirt; I\'m wearing a piece of design philosophy. The intricate details and thoughtful layout of the design make this shirt a conversation starter."',
    date: 'August 19, 2023',
  },
];

const ProductReviews = () => {
  const [tabValue, setTabValue] = useState(1); // Default active tab: Rating & Reviews
  const [sortAnchorEl, setSortAnchorEl] = useState(null);
  const [sortBy, setSortBy] = useState('Latest');
  const [visibleCount, setVisibleCount] = useState(6);

  // Tab change handler
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Sort dropdown menu handlers
  const handleSortClick = (event) => {
    setSortAnchorEl(event.currentTarget);
  };

  const handleSortClose = (option) => {
    if (option) setSortBy(option);
    setSortAnchorEl(null);
  };

  return (
    <Box sx={{ mt: { xs: 6, md: 10 }, mb: 8 }}>
      {/* ------------------- SECTION TABS ------------------- */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          variant="fullWidth"
          textColor="inherit"
          TabIndicatorProps={{
            style: { backgroundColor: '#000000', height: '2px' },
          }}
          sx={{
            '& .MuiTab-root': {
              textTransform: 'none',
              fontWeight: 500,
              fontSize: { xs: '14px', sm: '16px', md: '18px' },
              color: 'text.secondary',
              pb: 2,
              '&.Mui-selected': {
                color: '#000000',
                fontWeight: 600,
              },
            },
          }}
        >
          <Tab label="Product Details" />
          <Tab label="Rating & Reviews" />
          <Tab label="FAQs" />
        </Tabs>
      </Box>

      {/* TAB CONTENT: PRODUCT DETAILS */}
      {tabValue === 0 && (
        <Box sx={{ py: 3, px: 1, color: 'text.secondary' }}>
          <Typography variant="body1">
            Product specification and details content goes here.
          </Typography>
        </Box>
      )}

      {/* TAB CONTENT: RATING & REVIEWS */}
      {tabValue === 1 && (
        <Box>
          {/* Header Controls (Title, Filter, Sort, Write Review) */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 2,
              mb: 3,
            }}
          >
            {/* Left: Title & Count */}
            <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, fontSize: { xs: '18px', sm: '22px' } }}
              >
                All Reviews
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: 'text.secondary', fontSize: '14px' }}
              >
                ({REVIEWS_DATA.length})
              </Typography>
            </Box>

            {/* Right: Actions Buttons (Flex with Wrap support) */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                flexWrap: 'wrap',
              }}
            >
              {/* Filter Button */}
              <IconButton
                sx={{
                  backgroundColor: '#F0F0F0',
                  color: 'black',
                  width: '44px',
                  height: '44px',
                  '&:hover': { backgroundColor: '#E5E5E5' },
                }}
              >
                <TuneIcon sx={{ fontSize: '20px' }} />
              </IconButton>

              {/* Sort Dropdown */}
              <Button
                onClick={handleSortClick}
                endIcon={<KeyboardArrowDownIcon />}
                sx={{
                  backgroundColor: '#F0F0F0',
                  color: 'black',
                  borderRadius: '62px',
                  textTransform: 'none',
                  px: 2.5,
                  py: 1.2,
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': { backgroundColor: '#E5E5E5' },
                }}
              >
                {sortBy}
              </Button>
              <Menu
                anchorEl={sortAnchorEl}
                open={Boolean(sortAnchorEl)}
                onClose={() => handleSortClose(null)}
              >
                <MenuItem onClick={() => handleSortClose('Latest')}>Latest</MenuItem>
                <MenuItem onClick={() => handleSortClose('Highest Rating')}>
                  Highest Rating
                </MenuItem>
                <MenuItem onClick={() => handleSortClose('Lowest Rating')}>
                  Lowest Rating
                </MenuItem>
              </Menu>

              {/* Write Review Button */}
              <Button
                variant="contained"
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '62px',
                  textTransform: 'none',
                  px: { xs: 2.5, sm: 3 },
                  py: 1.2,
                  fontWeight: 500,
                  fontSize: '14px',
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#222', boxShadow: 'none' },
                }}
              >
                Write a Review
              </Button>
            </Box>
          </Box>

          {/* ------------------- REVIEWS GRID ------------------- */}
          <Box
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 2.5,
            }}
          >
            {REVIEWS_DATA.slice(0, visibleCount).map((review) => (
              <Card
                key={review.id}
                variant="outlined"
                sx={{
                  // Flex properties for responsive grid layout
                  flex: {
                    xs: '1 1 100%', // 1 item per row on mobile
                    md: '1 1 calc(50% - 20px)', // 2 items per row on desktop
                  },
                  borderRadius: '20px',
                  borderColor: '#E5E5E5',
                  boxShadow: 'none',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3.5 } }}>
                  {/* Rating & Context Menu */}
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      mb: 1.5,
                    }}
                  >
                    <Rating
                      value={review.rating}
                      precision={0.5}
                      readOnly
                      sx={{ color: '#FFC633', fontSize: '22px' }}
                    />
                    <IconButton size="small" sx={{ color: 'text.disabled' }}>
                      <MoreHorizIcon />
                    </IconButton>
                  </Box>

                  {/* Name & Verification Badge */}
                  <Box
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 0.8,
                      mb: 1.5,
                    }}
                  >
                    <Typography
                      variant="subtitle1"
                      sx={{ fontWeight: 700, fontSize: '16px', lineHeight: 1 }}
                    >
                      {review.name}
                    </Typography>
                    {review.verified && (
                      <CheckCircleIcon
                        sx={{ color: '#01AB31', fontSize: '18px' }}
                      />
                    )}
                  </Box>

                  {/* Review Text */}
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      lineHeight: 1.6,
                      mb: 2.5,
                      fontSize: '14px',
                      fontStyle: 'normal',
                    }}
                  >
                    {review.comment}
                  </Typography>

                  {/* Date */}
                  <Typography
                    variant="caption"
                    sx={{
                      color: 'text.secondary',
                      fontWeight: 500,
                      fontSize: '14px',
                    }}
                  >
                    Posted on {review.date}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>

          {/* ------------------- LOAD MORE BUTTON ------------------- */}
          {visibleCount < REVIEWS_DATA.length && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
              <Button
                variant="outlined"
                onClick={() => setVisibleCount((prev) => prev + 6)}
                sx={{
                  color: 'black',
                  borderColor: '#E5E5E5',
                  borderRadius: '62px',
                  textTransform: 'none',
                  px: 5,
                  py: 1.5,
                  fontWeight: 500,
                  fontSize: '14px',
                  '&:hover': {
                    borderColor: 'black',
                    backgroundColor: 'transparent',
                  },
                }}
              >
                Load More Reviews
              </Button>
            </Box>
          )}
        </Box>
      )}

      {/* TAB CONTENT: FAQS */}
      {tabValue === 2 && (
        <Box sx={{ py: 3, px: 1, color: 'text.secondary' }}>
          <Typography variant="body1">
            Frequently Asked Questions content goes here.
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default ProductReviews;