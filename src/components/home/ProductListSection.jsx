import React, { useContext } from 'react';
import { Box, Typography, Button, Container } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ProductContext } from '../../context/ProductContext';
import ProductCard from '../common/ProductCard';

// Live Vercel Backend URL
const API_BASE = 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app';

const ProductListSection = () => {
  const context = useContext(ProductContext);
  const products = context?.products || [];
  const navigate = useNavigate();

  // Helper Function: Relative path ko Backend URL ke sath attach karna
  const getFullImageUrl = (imgPath) => {
    if (!imgPath) return 'https://via.placeholder.com/300';
    if (imgPath.startsWith('http')) return imgPath;
    const cleanPath = imgPath.startsWith('/') ? imgPath : `/${imgPath}`;
    return `${API_BASE}${cleanPath}`;
  };

  // 5th se 8th product (Index 4 se 8)
  const topSellingList = products.slice(4, 8);

  return (
    <Box sx={{ py: { xs: 4, md: 8 }, borderBottom: '1px solid #E5E5E5', width: '100%' }}>
      <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3, md: 4 } }}>
        {/* Section Title */}
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            fontWeight: 900,
            fontSize: { xs: '28px', sm: '36px', md: '48px' },
            fontFamily: 'sans-serif',
            mb: { xs: 3, md: 6 },
            letterSpacing: '-1px',
            textTransform: 'uppercase',
          }}
        >
          TOP SELLING
        </Typography>

        {/* Cards Container */}
        <Box
          sx={{
            display: 'flex',
            flexWrap: { xs: 'nowrap', md: 'wrap' },
            overflowX: { xs: 'auto', md: 'visible' },
            gap: { xs: 2, md: 3 },
            pb: { xs: 1, md: 0 },
            scrollSnapType: { xs: 'x mandatory', md: 'none' },
            '&::-webkit-scrollbar': { display: 'none' },
            msOverflowStyle: 'none',
            scrollbarWidth: 'none',
          }}
        >
          {topSellingList.map((product) => {
            const productId = product.id || product._id;
            
            const rawImg = Array.isArray(product.images) && product.images.length > 0 
              ? product.images[0] 
              : product.image;
              
            const formattedImage = getFullImageUrl(rawImg);

            const normalizedProduct = {
              ...product,
              id: productId,
              name: product.name || product.title,
              title: product.title || product.name,
              image: formattedImage,
              rating: product.rating ?? 0,
              price: product.price ?? 0,
              originalPrice: product.originalPrice ?? product.compareAtPrice ?? null,
              discountPercent: product.discountPercent ?? product.discount ?? 0,
            };

            return (
              <Box
                key={productId}
                onClick={() => navigate(`/product/${productId}`)}
                sx={{
                  flex: {
                    xs: '0 0 190px',
                    sm: '0 0 calc(50% - 12px)',
                    md: '0 0 calc(25% - 18px)'
                  },
                  minWidth: 0,
                  scrollSnapAlign: 'start',
                  cursor: 'pointer',
                  transition: 'transform 0.2s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-4px)'
                  }
                }}
              >
                <ProductCard product={normalizedProduct} />
              </Box>
            );
          })}
        </Box>

        {/* View All Button */}
        <Box sx={{ textAlign: 'center', mt: { xs: 3, md: 5 } }}>
          <Button
            variant="outlined"
            onClick={() => navigate('/style')}
            sx={{
              color: '#000000',
              borderColor: 'rgba(0,0,0,0.1)',
              borderRadius: '62px',
              px: { xs: 4, sm: 7 },
              py: 1.5,
              textTransform: 'none',
              fontWeight: 600,
              fontSize: '14px',
              width: { xs: '100%', sm: 'auto' },
              '&:hover': {
                backgroundColor: '#F0F0F0',
                borderColor: '#000000',
              },
            }}
          >
            View All
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default ProductListSection;