import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  TextField,
  IconButton,
  Divider,
  InputAdornment,
  Alert,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CloseIcon from '@mui/icons-material/Close';

import Navbar from '../components/layout/Navbar';
import Footer from '../components/common/Footer';
import { ProductContext } from '../context/ProductContext';

const API_BASE_URL = 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app';

// Valid promo codes list (Aap apne backend API se bhi match karwa sakte ho)
const PROMO_CODES = {
  'SAVE10': { type: 'percent', value: 0.10, label: '10% OFF' },
  'SHOP20': { type: 'percent', value: 0.20, label: '20% OFF' },
  'HASSAN20': { type: 'percent', value: 0.20, label: '20% OFF' },
  'FLAT50': { type: 'flat', value: 50, label: '$50 OFF' },
};

const CartPage = () => {
  const navigate = useNavigate();
  const { cartItems, updateQuantity, removeFromCart } = useContext(ProductContext);

  const [promoInput, setPromoInput] = useState('');
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Calculations
  const subtotal = cartItems ? cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0) : 0;
  
  // Base 20% discount default calculation
  let discountAmount = Math.round(subtotal * 0.20); 

  // Additional/Custom Promo Discount Calculation
  if (appliedPromo) {
    if (appliedPromo.type === 'percent') {
      discountAmount = Math.round(subtotal * appliedPromo.value);
    } else if (appliedPromo.type === 'flat') {
      discountAmount = Math.min(appliedPromo.value, subtotal);
    }
  }

  const deliveryFee = subtotal > 0 ? 15 : 0;
  const total = Math.max(0, subtotal - discountAmount + deliveryFee);

  // Apply Promo Code Handler
  const handleApplyPromo = () => {
    setPromoError('');
    setPromoSuccess('');

    const cleanCode = promoInput.trim().toUpperCase();

    if (!cleanCode) {
      setPromoError('Please enter a promo code');
      return;
    }

    if (PROMO_CODES[cleanCode]) {
      setAppliedPromo(PROMO_CODES[cleanCode]);
      setPromoSuccess(`Promo code "${cleanCode}" applied successfully! (${PROMO_CODES[cleanCode].label})`);
      setPromoInput('');
    } else {
      setPromoError('Invalid promo code. Try "SHOP20", "SAVE10", or "FLAT50".');
    }
  };

  // Remove Promo Code Handler
  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoSuccess('');
    setPromoError('');
  };

  // Checkout Handler
  const handleGoToCheckout = () => {
    if (!cartItems || cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }

    // Navigate to checkout route with cart details
    navigate('/checkout', {
      state: {
        cartItems,
        subtotal,
        discountAmount,
        deliveryFee,
        total,
        promoCode: appliedPromo ? appliedPromo.label : null,
      },
    });
  };

  const getImageUrl = (imageSrc) => {
    if (!imageSrc) return 'https://via.placeholder.com/150?text=No+Image';

    if (typeof imageSrc === 'object') {
      imageSrc = imageSrc.url || imageSrc.secure_url || imageSrc.path || '';
    }

    if (typeof imageSrc !== 'string' || !imageSrc.trim()) {
      return 'https://via.placeholder.com/150?text=No+Image';
    }

    if (imageSrc.startsWith('http://') || imageSrc.startsWith('https://')) {
      return imageSrc;
    }

    const cleanPath = imageSrc.startsWith('/') ? imageSrc : `/${imageSrc}`;
    return `${API_BASE_URL}${cleanPath}`;
  };

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', width: '100%', overflowX: 'hidden' }}>
      <Navbar />

      {/* Main Outer Container */}
      <Box sx={{ maxWidth: '1240px', width: '100%', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 2, md: 3 }, boxSizing: 'border-box' }}>
        
        {/* Breadcrumb */}
        <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', mb: 2, fontSize: '14px' }}>
          Home &gt;{' '}
          <Typography component="span" sx={{ color: '#000000', fontWeight: 500, fontSize: 'inherit' }}>
            Cart
          </Typography>
        </Typography>

        {/* Title */}
        <Typography
          variant="h3"
          sx={{
            fontWeight: 900,
            mb: { xs: 2.5, md: 3 },
            fontSize: { xs: '28px', sm: '36px', md: '40px' },
            fontFamily: '"Integral CF", "Arial Black", sans-serif',
            letterSpacing: '-0.5px',
          }}
        >
          YOUR CART
        </Typography>

        {/* Flexbox Layout */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: '20px',
            width: '100%',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          {/* Cart Products Container */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '1 1 62%' },
              width: '100%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
              p: { xs: 2, sm: 2.5, md: 3 },
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
                    <Box
                      sx={{
                        display: 'flex',
                        gap: { xs: 1.5, sm: 2 },
                        alignItems: 'stretch',
                        width: '100%',
                      }}
                    >
                      {/* Product Image */}
                      <Box
                        sx={{
                          width: { xs: 90, sm: 110, md: 124 },
                          height: { xs: 90, sm: 110, md: 124 },
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

                      {/* Details & Actions */}
                      <Box
                        sx={{
                          flex: 1,
                          display: 'flex',
                          justifyContent: 'space-between',
                          flexDirection: 'row',
                        }}
                      >
                        {/* Title, Variant, Price */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                          }}
                        >
                          <Box>
                            <Typography
                              variant="h6"
                              sx={{
                                fontWeight: 700,
                                fontSize: { xs: '15px', sm: '18px', md: '20px' },
                                lineHeight: 1.2,
                                color: '#000000',
                              }}
                            >
                              {item.title || item.name}
                            </Typography>
                            <Box sx={{ mt: 0.5 }}>
                              {item.size && (
                                <Typography variant="body2" sx={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
                                  Size: <span style={{ color: '#000' }}>{item.size}</span>
                                </Typography>
                              )}
                              {item.color && (
                                <Typography variant="body2" sx={{ fontSize: '13px', color: 'rgba(0,0,0,0.6)' }}>
                                  Color: <span style={{ color: '#000' }}>{item.color}</span>
                                </Typography>
                              )}
                            </Box>
                          </Box>

                          <Typography
                            variant="h6"
                            sx={{
                              fontWeight: 700,
                              fontSize: { xs: '18px', sm: '22px' },
                              color: '#000000',
                            }}
                          >
                            ${item.price}
                          </Typography>
                        </Box>

                        {/* Delete Button & Quantity Controls */}
                        <Box
                          sx={{
                            display: 'flex',
                            flexDirection: 'column',
                            justifyContent: 'space-between',
                            alignItems: 'flex-end',
                          }}
                        >
                          <IconButton
                            onClick={() => removeFromCart(itemId)}
                            sx={{ color: '#FF3333', p: 0 }}
                          >
                            <DeleteIcon sx={{ fontSize: { xs: '20px', sm: '22px' } }} />
                          </IconButton>

                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              backgroundColor: '#F0F0F0',
                              borderRadius: '62px',
                              px: { xs: 1, sm: 1.5 },
                              py: 0.3,
                            }}
                          >
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(itemId, 'decrease')}
                              sx={{ color: '#000', p: 0.2 }}
                            >
                              <RemoveIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                            <Typography sx={{ fontWeight: 600, px: 1.5, fontSize: '14px' }}>
                              {item.quantity}
                            </Typography>
                            <IconButton
                              size="small"
                              onClick={() => updateQuantity(itemId, 'increase')}
                              sx={{ color: '#000', p: 0.2 }}
                            >
                              <AddIcon sx={{ fontSize: '16px' }} />
                            </IconButton>
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                    {index < cartItems.length - 1 && <Divider sx={{ my: 2.5 }} />}
                  </React.Fragment>
                );
              })
            )}
          </Box>

          {/* Order Summary Box */}
          <Box
            sx={{
              flex: { xs: '1 1 100%', md: '0 0 36%' },
              width: '100%',
              border: '1px solid rgba(0, 0, 0, 0.1)',
              borderRadius: '20px',
              p: { xs: 2.5, sm: 3 },
              display: 'flex',
              flexDirection: 'column',
              gap: 2,
              boxSizing: 'border-box',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 700, fontSize: '20px', color: '#000' }}>
              Order Summary
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '16px' }}>Subtotal</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>${subtotal}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '16px' }}>
                Discount {appliedPromo ? `(${appliedPromo.label})` : '(-20%)'}
              </Typography>
              <Typography sx={{ fontWeight: 700, color: '#FF3333', fontSize: '16px' }}>
                -${discountAmount}
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography sx={{ color: 'rgba(0, 0, 0, 0.6)', fontSize: '16px' }}>Delivery Fee</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '16px' }}>${deliveryFee}</Typography>
            </Box>

            <Divider sx={{ my: 0.5 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Typography sx={{ fontWeight: 500, fontSize: '18px', color: '#000' }}>Total</Typography>
              <Typography sx={{ fontWeight: 700, fontSize: '22px', color: '#000' }}>${total}</Typography>
            </Box>

            {/* Promo Code Notifications */}
            {promoError && (
              <Alert severity="error" sx={{ borderRadius: '12px', fontSize: '13px', py: 0 }}>
                {promoError}
              </Alert>
            )}

            {promoSuccess && (
              <Alert
                severity="success"
                action={
                  <IconButton size="small" onClick={handleRemovePromo}>
                    <CloseIcon fontSize="small" />
                  </IconButton>
                }
                sx={{ borderRadius: '12px', fontSize: '13px', py: 0 }}
              >
                {promoSuccess}
              </Alert>
            )}

            {/* Promo Code Input */}
            <Box sx={{ display: 'flex', gap: 1.5, mt: 1 }}>
              <TextField
                fullWidth
                placeholder="Add promo code"
                value={promoInput}
                onChange={(e) => setPromoInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleApplyPromo()}
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
                onClick={handleApplyPromo}
                sx={{
                  backgroundColor: '#000000',
                  borderRadius: '62px',
                  px: 3.5,
                  textTransform: 'none',
                  fontWeight: 500,
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#333333', boxShadow: 'none' },
                }}
              >
                Apply
              </Button>
            </Box>

            {/* Checkout Button */}
            <Button
              variant="contained"
              fullWidth
              onClick={handleGoToCheckout}
              disabled={!cartItems || cartItems.length === 0}
              endIcon={<ArrowForwardIcon />}
              sx={{
                backgroundColor: '#000000',
                borderRadius: '62px',
                py: 1.8,
                mt: 1,
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                boxShadow: 'none',
                '&:hover': { backgroundColor: '#333333', boxShadow: 'none' },
                '&.Mui-disabled': { backgroundColor: '#CCCCCC' },
              }}
            >
              Go to Checkout
            </Button>
          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default CartPage;