import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Typography,
  Grid,
  Button,
  Rating,
  Chip,
  IconButton,
  Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/common/Footer';
import { ProductContext } from '../context/ProductContext';

const API_BASE_URL = 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app';
const FALLBACK_IMAGE = 'https://placehold.co/400x400?text=No+Image';

const ProductDetails = () => {
  const { id } = useParams();
  const { products, addToCart } = useContext(ProductContext);

  const [product, setProduct] = useState(null);
  const [selectedImage, setSelectedImage] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [quantity, setQuantity] = useState(1);

  // Helper Function for Image Processing
  const getImageUrl = (imageSrc) => {
    if (!imageSrc) return FALLBACK_IMAGE;

    if (typeof imageSrc === 'object') {
      imageSrc = imageSrc.url || imageSrc.secure_url || imageSrc.path || '';
    }

    if (typeof imageSrc !== 'string' || !imageSrc.trim()) {
      return FALLBACK_IMAGE;
    }

    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }

    const cleanPath = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  useEffect(() => {
    if (products && products.length > 0) {
      const foundProduct = products.find((p) => (p.id || p._id).toString() === id.toString());
      if (foundProduct) {
        setProduct(foundProduct);

        // Normalize images array
        const imagesArr = Array.isArray(foundProduct.images) && foundProduct.images.length > 0
          ? foundProduct.images
          : foundProduct.image
          ? [foundProduct.image]
          : [];

        if (imagesArr.length > 0) {
          setSelectedImage(imagesArr[0]);
        }
      }
    }
  }, [id, products]);

  if (!product) {
    return (
      <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
        <Navbar />
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <Typography variant="h5">Loading product details...</Typography>
        </Box>
        <Footer />
      </Box>
    );
  }

  const galleryImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : product.image
    ? [product.image]
    : [FALLBACK_IMAGE];

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', width: '100%' }}>
      <Navbar />
      <Box sx={{ maxWidth: '1240px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 4 } }}>
        <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 3 }}>
          Home &gt; Shop &gt; <span style={{ color: '#000', fontWeight: 500 }}>{product.title || product.name}</span>
        </Typography>

        <Grid container spacing={4}>
          {/* Image Gallery Section */}
          <Grid item xs={12} md={6}>
            <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
              {/* Thumbnails */}
              <Box sx={{ display: 'flex', flexDirection: { xs: 'row', sm: 'column' }, gap: 1.5, overflowX: 'auto' }}>
                {galleryImages.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: { xs: 70, sm: 90 },
                      height: { xs: 70, sm: 90 },
                      borderRadius: '16px',
                      backgroundColor: '#F0EEED',
                      cursor: 'pointer',
                      border: selectedImage === img ? '2px solid #000' : '1px solid transparent',
                      overflow: 'hidden',
                      p: 1,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Box
                      component="img"
                      src={getImageUrl(img)}
                      alt="thumbnail"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = FALLBACK_IMAGE;
                      }}
                      sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                    />
                  </Box>
                ))}
              </Box>

              {/* Main Image */}
              <Box
                sx={{
                  flex: 1,
                  height: { xs: 320, sm: 420, md: 480 },
                  backgroundColor: '#F0EEED',
                  borderRadius: '20px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                  p: 2,
                }}
              >
                <Box
                  component="img"
                  src={getImageUrl(selectedImage)}
                  alt={product.title || product.name}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = FALLBACK_IMAGE;
                  }}
                  sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                />
              </Box>
            </Box>
          </Grid>

          {/* Product Details Section */}
          <Grid item xs={12} md={6}>
            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, fontSize: { xs: '24px', sm: '32px' } }}>
              {product.title || product.name}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
              <Rating value={product.rating || 4.5} precision={0.5} readOnly />
              <Typography variant="body2" sx={{ fontWeight: 500 }}>
                {product.rating || 4.5}/5
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 700 }}>
                ${product.price}
              </Typography>
              {product.oldPrice && (
                <>
                  <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'rgba(0,0,0,0.4)', fontWeight: 700 }}>
                    ${product.oldPrice}
                  </Typography>
                  <Chip label="-20%" color="error" size="small" sx={{ borderRadius: '62px', fontWeight: 600 }} />
                </>
              )}
            </Box>

            <Typography variant="body2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 3, lineHeight: 1.6 }}>
              {product.description || 'This item is crafted from premium quality fabric for superior daily comfort.'}
            </Typography>

            <Divider sx={{ my: 2 }} />

            {/* Action Buttons */}
            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', backgroundColor: '#F0F0F0', borderRadius: '62px', px: 1.5 }}>
                <IconButton onClick={() => setQuantity((q) => Math.max(1, q - 1))}>
                  <RemoveIcon />
                </IconButton>
                <Typography sx={{ px: 2, fontWeight: 600 }}>{quantity}</Typography>
                <IconButton onClick={() => setQuantity((q) => q + 1)}>
                  <AddIcon />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={() => addToCart({ ...product, quantity, size: selectedSize, color: selectedColor })}
                sx={{
                  backgroundColor: '#000000',
                  borderRadius: '62px',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  '&:hover': { backgroundColor: '#333333' },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default ProductDetails;