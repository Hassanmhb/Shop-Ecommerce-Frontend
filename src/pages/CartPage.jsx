import React, { useState, useContext } from 'react';
import {
  Box,
  Typography,
  Grid,
  Button,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/common/Footer';
import { ProductContext } from '../context/ProductContext';

// Backend Server Base URL
const API_BASE_URL = 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app';

const CartPage = () => {
  const { cartItems, updateQuantity, removeFromCart } = useContext(ProductContext);
  const [promoCode, setPromoCode] = useState('');

  const subtotal = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountRate = 0.2; // 20% Discount
  const discountAmount = Math.round(subtotal * discountRate);
  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = subtotal - discountAmount + deliveryFee;

  // Enhanced Image URL Helper Function
  const getImageUrl = (imageSrc) => {
    if (!imageSrc) return 'https://via.placeholder.com/150?text=No+Image';

    // Cloudinary Object / Nested Object handle karne ke liye
    if (typeof imageSrc === 'object') {
      imageSrc = imageSrc.url || imageSrc.secure_url || imageSrc.path || '';
    }

    if (typeof imageSrc !== 'string' || !imageSrc.trim()) {
      return 'https://via.placeholder.com/150?text=No+Image';
    }

    // Direct Cloudinary / HTTP External Links Check
    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }

    // Relative Path Check for Local/Backend uploads
    const cleanPath = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{ maxWidth: '1240px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 } }}>
        <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2, fontSize: '14px' }}>
          Home &gt;{' '}
          <Typography component="span" sx={{ color: '#000000', fontWeight: 500, fontSize: 'inherit' }}>
            Cart
          </Typography>
        </Typography>

        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: { xs: 2.5, md: 3 },
            fontSize: { xs: '28px', sm: '36px', md: '40px' },
            letterSpacing: '-0.5px',
          }}
        >
          YOUR CART
        </Typography>

        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ justifyContent: 'space-between', alignItems: 'flex-start' }}>
          {/* Cart Items List */}
          <Grid item xs={12} md={7} lg={7.2}>
            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                p: { xs: 2, sm: 2.5, md: 3 },
                width: '100%',
                boxSizing: 'border-box',
              }}
            >
              {!cartItems || cartItems.length === 0 ? (
                <Typography align="center" sx={{ py: 6, color: 'text.secondary', fontWeight: 500 }}>
                  Your cart is empty
                </Typography>
              ) : (
                cartItems.map((item, index) => {
                  const itemId = item.id || item._id;
                  const itemImg = item.image || (item.images && item.images[0]);

                  return (
                    <React.Fragment key={`${itemId}-${index}`}>
                      <Box sx={{ display: 'flex', gap: { xs: 1.5, sm: 2 }, alignItems: 'center', width: '100%' }}>
                        <Box
                          sx={{
                            width: { xs: 80, sm: 100, md: 110 },
                            height: { xs: 80, sm: 100, md: 110 },
                            borderRadius: '12px',
                            backgroundColor: '#F0EEED',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            overflow: 'hidden',
                            flexShrink: 0,
                            p: 1,
                          }}
                        >
                          <Box
                            component="img"
                            src={getImageUrl(itemImg)}
                            alt={item.title || item.name || 'Product'}
                            onError={(e) => {
                              e.target.onerror = null;
                              e.target.src = 'https://via.placeholder.com/150?text=No+Image';
                            }}
                            sx={{
                              width: '100%',
                              height: '100%',
                              objectFit: 'contain',
                              mixBlendMode: 'multiply',
                            }}
                          />
                        </Box>

                        <Box
                          sx={{
                            flex: 1,
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            height: { xs: 80, sm: 100, md: 110 },
                          }}
                        >
                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                fontSize: { xs: '14px', sm: '17px', md: '19px' },
                                lineHeight: 1.2,
                                color: '#000',
                              }}
                            >
                              {item.title || item.name}
                            </Typography>

                            <IconButton
                              onClick={() => removeFromCart(itemId)}
                              sx={{ color: '#FF3333', p: 0.5 }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>

                          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.2 }}>
                            {item.size && (
                              <Typography variant="body2" sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                                Size: <span style={{ color: '#000' }}>{item.size}</span>
                              </Typography>
                            )}
                            {item.color && (
                              <Typography variant="body2" sx={{ fontSize: '12px', color: 'rgba(0,0,0,0.6)' }}>
                                Color: <span style={{ color: '#000' }}>{item.color}</span>
                              </Typography>
                            )}
                          </Box>

                          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: { xs: '16px', sm: '20px' } }}>
                              ${item.price}
                            </Typography>

                            <Box
                              sx={{
                                display: 'flex',
                                alignItems: 'center',
                                backgroundColor: '#F0F0F0',
                                borderRadius: '62px',
                                px: 1,
                                py: 0.3,
                              }}
                            >
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(itemId, 'decrease')}
                                sx={{ color: '#000', p: 0.2 }}
                              >
                                <RemoveIcon fontSize="small" />
                              </IconButton>
                              <Typography sx={{ fontWeight: 600, px: 1, fontSize: '14px' }}>
                                {item.quantity}
                              </Typography>
                              <IconButton
                                size="small"
                                onClick={() => updateQuantity(itemId, 'increase')}
                                sx={{ color: '#000', p: 0.2 }}
                              >
                                <AddIcon fontSize="small" />
                              </IconButton>
                            </Box>
                          </Box>
                        </Box>
                      </Box>
                      {index < cartItems.length - 1 && <Divider sx={{ my: 2 }} />}
                    </React.Fragment>
                  );
                })
              )}
            </Box>
          </Grid>

          {/* Order Summary */}
          <Grid item xs={12} md={5} lg={4.5}>
            <Box
              sx={{
                border: '1px solid rgba(0, 0, 0, 0.1)',
                borderRadius: '20px',
                p: { xs: 2, sm: 2.5, md: 3 },
                display: 'flex',
                flexDirection: 'column',
                gap: 2,
              }}
            >
              <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px' }}>
                Order Summary
              </Typography>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>Subtotal</Typography>
                <Typography sx={{ fontWeight: 700 }}>${subtotal}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>Discount (-20%)</Typography>
                <Typography sx={{ fontWeight: 700, color: '#FF3333' }}>-${discountAmount}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)' }}>Delivery Fee</Typography>
                <Typography sx={{ fontWeight: 700 }}>${deliveryFee}</Typography>
              </Box>

              <Divider />

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography sx={{ fontWeight: 700, fontSize: '18px' }}>Total</Typography>
                <Typography sx={{ fontWeight: 700, fontSize: '22px' }}>${total}</Typography>
              </Box>

              <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
                <TextField
                  fullWidth
                  placeholder="Add promo code"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LocalOfferOutlinedIcon sx={{ color: 'rgba(0, 0, 0, 0.4)' }} />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      backgroundColor: '#F0F0F0',
                      borderRadius: '62px',
                      fontSize: '14px',
                      '& fieldset': { border: 'none' },
                    },
                  }}
                />
                <Button
                  variant="contained"
                  sx={{
                    backgroundColor: '#000000',
                    borderRadius: '62px',
                    px: 3,
                    textTransform: 'none',
                    fontWeight: 500,
                    '&:hover': { backgroundColor: '#333333' },
                  }}
                >
                  Apply
                </Button>
              </Box>

              <Button
                variant="contained"
                fullWidth
                endIcon={<ArrowForwardIcon />}
                sx={{
                  backgroundColor: '#000000',
                  borderRadius: '62px',
                  py: 1.5,
                  textTransform: 'none',
                  fontSize: '16px',
                  fontWeight: 500,
                  '&:hover': { backgroundColor: '#333333' },
                }}
              >
                Go to Checkout
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
      <Footer />
    </Box>
  );
};

export default CartPage;