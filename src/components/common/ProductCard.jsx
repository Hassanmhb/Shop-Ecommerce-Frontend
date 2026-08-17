import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const BACKEND_URL = 'http://localhost:8000';

  const normalizedProduct = product || {};
  const productName = normalizedProduct.name || normalizedProduct.title || 'Product';
  const productRating = Number(normalizedProduct.rating ?? 0);
  const productPrice = normalizedProduct.price ?? 0;
  const originalPrice = normalizedProduct.originalPrice ?? normalizedProduct.compareAtPrice ?? null;
  const discountPercent = normalizedProduct.discountPercent ?? normalizedProduct.discount ?? 0;

  const rawImagePath = Array.isArray(normalizedProduct.images) && normalizedProduct.images.length > 0
    ? normalizedProduct.images[0]
    : normalizedProduct.image || normalizedProduct.img || '';

  const getImageUrl = (path) => {
    if (!path) return 'https://via.placeholder.com/300?text=No+Image';

    const imagePath = String(path).trim();
    if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) return imagePath;
    if (imagePath.startsWith('//')) return `https:${imagePath}`;

    const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
    return encodeURI(`${BACKEND_URL}${cleanPath}`);
  };

  // Card par click handler
  const handleCardClick = () => {
    const productId = normalizedProduct._id || normalizedProduct.id;
    if (productId) {
      navigate(`/product/${productId}`);
    }
  };

  return (
    <Card 
      elevation={0} 
      onClick={handleCardClick}
      sx={{ 
        width: '100%', 
        borderRadius: { xs: '12px', sm: '20px' }, 
        border: 'none',
        backgroundColor: 'transparent',
        overflow: 'hidden',
        cursor: 'pointer', // Hover style cursor
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'translateY(-4px)'
        }
      }}
    >
      <Box 
        sx={{ 
          width: '100%', 
          height: { xs: '160px', sm: '220px', md: '280px' }, 
          backgroundColor: '#F0EEED', 
          borderRadius: { xs: '12px', sm: '20px' },
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          overflow: 'hidden',
          p: { xs: 1, sm: 2 }
        }}
      >
        <CardMedia
          component="img"
          image={getImageUrl(rawImagePath)}
          alt={product?.name || 'Product Image'}
          sx={{
            width: '100%',
            height: '100%',
            objectFit: 'contain'
          }}
          onError={(e) => {
            e.target.onerror = null; 
            e.target.src = 'https://via.placeholder.com/300?text=Image+Not+Found';
          }}
        />
      </Box>

      <CardContent sx={{ p: { xs: '8px 0px', sm: '12px 0px' }, '&:last-child': { pb: 0 } }}>
        <Typography 
          variant="subtitle1" 
          sx={{ 
            fontWeight: 700, 
            fontSize: { xs: '12px', sm: '15px', md: '16px' }, 
            lineHeight: 1.2,
            mb: 0.5 
          }} 
          noWrap
        >
          {productName}
        </Typography>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, mb: 0.5 }}>
          <Rating 
            value={productRating} 
            precision={0.5} 
            size="small" 
            readOnly 
            sx={{ fontSize: { xs: '12px', sm: '16px' } }}
          />
          <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '10px', sm: '12px' }, fontWeight: 600 }}>
            {productRating}/5
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 0.5, sm: 1 }, flexWrap: 'wrap' }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: { xs: '14px', sm: '18px', md: '20px' } }}>
            ${productPrice}
          </Typography>

          {originalPrice && originalPrice > productPrice && (
            <Typography variant="body2" sx={{ color: 'text.secondary', textDecoration: 'line-through', fontWeight: 600, fontSize: { xs: '11px', sm: '14px' } }}>
              ${originalPrice}
            </Typography>
          )}

          {discountPercent > 0 && (
            <Box 
              sx={{ 
                backgroundColor: 'rgba(255, 51, 51, 0.1)', 
                color: '#FF3333', 
                px: { xs: 0.6, sm: 1 }, 
                py: { xs: 0.1, sm: 0.3 }, 
                borderRadius: '62px', 
                fontSize: { xs: '9px', sm: '11px' }, 
                fontWeight: 700 
              }}
            >
              -{discountPercent}%
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ProductCard;