import React, { useState } from 'react';
import { Card, CardMedia, CardContent, Typography, Box, Rating } from '@mui/material';
import { toast } from 'react-toastify';

const ProductCard = ({ product }) => {
  // Product ki initial rating context/backend se le rahe hain, default 0
  const [ratingValue, setRatingValue] = useState(product?.rating || 4);

  const handleRatingChange = (event, newValue) => {
    event.stopPropagation(); // Card click event (navigation) ko rokne ke liye
    if (newValue !== null) {
      setRatingValue(newValue);
      toast.success(`You rated ${newValue} stars for ${product?.title || 'product'}!`, {
        position: 'bottom-right',
        autoClose: 2000,
      });
      
      // OPTIONAL: Yahan aap backend / API endpoint par call karke updated rating save kar sakte hain
      // fetch(`${API_BASE}/api/products/${product.id}/rate`, { method: 'POST', body: JSON.stringify({ rating: newValue }) });
    }
  };

  return (
    <Card
      sx={{
        maxWidth: '100%',
        borderRadius: '20px',
        boxShadow: 'none',
        border: '1px solid #F0F0F0',
        backgroundColor: '#F0F0F0',
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Box sx={{ position: 'relative', pt: '100%', backgroundColor: '#F0F0F0' }}>
        <CardMedia
          component="img"
          image={product?.image || 'https://placehold.co/300x300?text=No+Image'}
          alt={product?.title || 'Product'}
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'contain',
            p: 2,
          }}
        />
      </Box>

      <CardContent sx={{ flexGrow: 1, p: 2 }}>
        <Typography
          variant="h6"
          noWrap
          sx={{
            fontWeight: 700,
            fontSize: '16px',
            mb: 0.5,
            color: '#000000',
          }}
        >
          {product?.title || 'Product Title'}
        </Typography>

        {/* Dynamic Interactive Rating Component */}
        <Box
          sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}
          onClick={(e) => e.stopPropagation()} // Stop navigation on click
        >
          <Rating
            name={`product-rating-${product?.id}`}
            value={ratingValue}
            precision={0.5}
            onChange={handleRatingChange}
            size="small"
            sx={{
              color: '#FFC107',
            }}
          />
          <Typography variant="body2" sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)', fontWeight: 600 }}>
            {ratingValue}/5
          </Typography>
        </Box>

        <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '18px', color: '#000000' }}>
          ${product?.price || '0.00'}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default ProductCard;