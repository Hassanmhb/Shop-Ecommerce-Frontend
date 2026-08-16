import React from 'react';
import { Box, Typography, Rating } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const API_BASE = 'http://localhost:8000';

const ProductLikeCard = ({ product }) => {
  const navigate = useNavigate();

  if (!product) return null;

  const productId = product.id || product._id;

  const handleCardClick = () => {
    navigate(`/product/${productId}`);
  };

  let rawImg = '';
  if (Array.isArray(product.images) && product.images.length > 0) {
    rawImg = product.images[0];
  } else if (product.image) {
    rawImg = product.image;
  }

  let imageUrl = 'https://via.placeholder.com/300';
  if (rawImg) {
    if (rawImg.startsWith('http')) {
      imageUrl = rawImg;
    } else {
      const cleanPath = rawImg.startsWith('/') ? rawImg : `/${rawImg}`;
      imageUrl = `${API_BASE}${cleanPath}`;
    }
  }

  const title = product.name || product.title || 'Product Title';

  return (
    <Box
      onClick={handleCardClick}
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: 'pointer',
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)',
        },
      }}
    >
      {/* Aspect-Ratio Box to avoid vertical shrinking */}
      <Box
        sx={{
          width: '100%',
          aspectRatio: '1 / 1',
          backgroundColor: '#F0EEED',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
          p: 2,
          mb: 1.5,
        }}
      >
        <Box
          component="img"
          src={imageUrl}
          alt={title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/300';
          }}
          sx={{
            maxHeight: '100%',
            maxWidth: '100%',
            objectFit: 'contain',
          }}
        />
      </Box>

      {/* Title */}
      <Typography
        variant="subtitle1"
        sx={{
          fontWeight: 700,
          fontSize: { xs: '14px', sm: '16px', md: '18px' },
          color: '#000000',
          mb: 0.5,
          whiteSpace: 'nowrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {title}
      </Typography>

      {/* Rating */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, mb: 0.5 }}>
        <Rating
          value={Number(product.rating) || 4.5}
          precision={0.5}
          readOnly
          size="small"
          sx={{ color: '#FFC700', fontSize: { xs: '16px', sm: '20px' } }}
        />
        <Typography variant="body2" sx={{ fontSize: { xs: '12px', sm: '14px' }, color: '#000', fontWeight: 500 }}>
          {product.rating || 4.5}/<span style={{ color: '#666' }}>5</span>
        </Typography>
      </Box>

      {/* Price & Discounts */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
        <Typography sx={{ fontWeight: 800, fontSize: { xs: '16px', sm: '18px', md: '20px' }, color: '#000000' }}>
          ${product.price}
        </Typography>

        {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
          <>
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: { xs: '16px', sm: '18px', md: '20px' },
                color: '#0000004D',
                textDecoration: 'line-through',
              }}
            >
              ${product.originalPrice}
            </Typography>

            {product.discountPercent > 0 && (
              <Box
                sx={{
                  backgroundColor: '#FF33331A',
                  borderRadius: '62px',
                  px: 1,
                  py: 0.2,
                }}
              >
                <Typography
                  sx={{
                    color: '#FF3333',
                    fontSize: { xs: '10px', sm: '12px' },
                    fontWeight: 600,
                  }}
                >
                  -{product.discountPercent}%
                </Typography>
              </Box>
            )}
          </>
        )}
      </Box>
    </Box>
  );
};

export default ProductLikeCard;