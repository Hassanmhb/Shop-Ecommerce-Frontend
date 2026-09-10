import React, { useState, useContext } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControl,
  Paper,
  Avatar,
  Badge,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
  CircularProgress,
} from '@mui/material';
import Navbar from '../components/layout/Navbar';
import Footer from '../components/common/Footer';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import CloseIcon from '@mui/icons-material/Close';
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import CreditCardOutlinedIcon from '@mui/icons-material/CreditCardOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { ProductContext } from '../context/ProductContext';

// Standard Environment Variable Fallback
const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { clearCart } = useContext(ProductContext);

  const checkoutData = location.state || {};
  const { cartItems = [], subtotal = 0, discountAmount = 0, deliveryFee = 0, total = 0, promoCode } = checkoutData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    paymentMethod: 'COD',
  });

  const [errors, setErrors] = useState({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
  });

  const [shakingField, setShakingField] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const triggerFieldShake = (fieldName) => {
    setShakingField(fieldName);
    setTimeout(() => {
      setShakingField('');
    }, 500);
  };

  const validateField = (name, value) => {
    let errorMsg = '';
    
    if (!value.trim()) {
      errorMsg = 'This field is required';
    } else {
      if (name === 'email') {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value)) errorMsg = 'Enter a valid email address';
      }
      if (name === 'phone') {
        const phoneRegex = /^03\d{9}$/;
        if (!phoneRegex.test(value)) errorMsg = 'Must be 11 digits starting with 03';
      }
    }

    setErrors((prev) => ({ ...prev, [name]: errorMsg }));
    return errorMsg;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'phone') {
      const onlyNums = value.replace(/\D/g, '');
      if (onlyNums.length <= 11) {
        setFormData({ ...formData, phone: onlyNums });
        const err = validateField('phone', onlyNums);
        if (err) triggerFieldShake('phone');
      }
      return;
    }

    setFormData({ ...formData, [name]: value });
    const err = validateField(name, value);
    if (err) triggerFieldShake(name);
  };

  const handlePlaceOrder = async (e) => {
    e.preventDefault();

    const fieldList = ['fullName', 'email', 'phone', 'address', 'city'];
    let firstErrorField = '';

    fieldList.forEach((field) => {
      const err = validateField(field, formData[field]);
      if (err && !firstErrorField) {
        firstErrorField = field;
      }
    });

    if (firstErrorField) {
      triggerFieldShake(firstErrorField);
      return;
    }

    setLoading(true);

    const orderPayload = {
      fullName: formData.fullName,
      name: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      customerDetails: {
        name: formData.fullName,
        fullName: formData.fullName,
        email: formData.email,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
      },
      orderItems: cartItems.map((item) => ({
        product: item._id || item.id,
        title: item.title || item.name,
        quantity: item.quantity,
        price: item.price,
        image: item.image || item.img,
      })),
      totalAmount: total,
      paymentMethod: formData.paymentMethod === 'COD' ? 'COD' : 'Card',
    };

    try {
      const res = await fetch(`${API_BASE}/api/orders/create`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(orderPayload),
      });

      const data = await res.json();

      if (res.ok) {
        setIsSuccessOpen(true);
        if (clearCart) clearCart();
      } else {
        alert(data.message || 'Order placement failed. Please try again.');
      }
    } catch (error) {
      alert('Network error: Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    navigate('/');
  };

  const getShakeStyle = (fieldName) => ({
    '& .MuiOutlinedInput-root': { borderRadius: '12px' },
    animation: shakingField === fieldName ? 'singleShake 0.4s ease-in-out' : 'none',
    '@keyframes singleShake': {
      '0%, 100%': { transform: 'translateX(0)' },
      '20%, 60%': { transform: 'translateX(-6px)' },
      '40%, 80%': { transform: 'translateX(6px)' },
    },
  });

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box sx={{ backgroundColor: '#F9FAFB', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center', p: 3 }}>
          <Paper elevation={0} sx={{ p: 5, textAlign: 'center', maxWidth: 450, borderRadius: '24px', border: '1px solid #E5E7EB' }}>
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>No checkout data found!</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
              Please add items to your cart before proceeding to checkout.
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '62px', py: 1.5, fontWeight: 700, textTransform: 'none', '&:hover': { backgroundColor: '#333' } }}
              onClick={() => navigate('/cart')}
            >
              Back to Cart
            </Button>
          </Paper>
        </Box>
        <Footer />
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#FAFAFA', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />

      <Box sx={{ maxWidth: '1180px', mx: 'auto', px: { xs: 2, sm: 3, md: 4 }, py: { xs: 3, md: 5 }, width: '100%', flex: 1 }}>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2, fontSize: '13px' }}>
          <Box component={Link} to="/cart" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
            Cart
          </Box>
          {' > '}
          <Box component="span" sx={{ color: '#000', fontWeight: 600 }}>Checkout</Box>
        </Typography>

        <Typography variant="h4" sx={{ fontWeight: 900, mb: 4, letterSpacing: '-0.5px', fontFamily: '"Integral CF", sans-serif', textTransform: 'uppercase' }}>
          Checkout
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column-reverse', md: 'row' }, gap: { xs: 3, md: 5 }, alignItems: 'flex-start' }}>
          
          <Box
            component="form"
            onSubmit={handlePlaceOrder}
            noValidate
            sx={{
              flex: 1,
              width: '100%',
              display: 'flex',
              flexDirection: 'column',
              gap: 3,
            }}
          >
            <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: '20px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, fontSize: '18px' }}>
                Shipping Information
              </Typography>
              
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <TextField
                  label="Full Name"
                  name="fullName"
                  required
                  fullWidth
                  value={formData.fullName}
                  onChange={handleChange}
                  error={Boolean(errors.fullName)}
                  helperText={errors.fullName}
                  sx={getShakeStyle('fullName')}
                />

                <Box sx={{ display: 'flex', gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
                  <TextField
                    label="Email Address"
                    name="email"
                    type="email"
                    required
                    fullWidth
                    value={formData.email}
                    onChange={handleChange}
                    error={Boolean(errors.email)}
                    helperText={errors.email}
                    sx={getShakeStyle('email')}
                  />

                  <TextField
                    label="Phone Number"
                    name="phone"
                    required
                    fullWidth
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="03001234567"
                    error={Boolean(errors.phone)}
                    helperText={errors.phone || 'Format: 03XXXXXXXXX (11 digits)'}
                    inputProps={{ maxLength: 11 }}
                    sx={getShakeStyle('phone')}
                  />
                </Box>

                <TextField
                  label="Street Address"
                  name="address"
                  required
                  fullWidth
                  value={formData.address}
                  onChange={handleChange}
                  error={Boolean(errors.address)}
                  helperText={errors.address}
                  sx={getShakeStyle('address')}
                />

                <TextField
                  label="City"
                  name="city"
                  required
                  fullWidth
                  value={formData.city}
                  onChange={handleChange}
                  error={Boolean(errors.city)}
                  helperText={errors.city}
                  sx={getShakeStyle('city')}
                />
              </Box>
            </Paper>

            <Paper elevation={0} sx={{ p: { xs: 2.5, sm: 3.5 }, borderRadius: '20px', border: '1px solid #E5E7EB', backgroundColor: '#FFFFFF' }}>
              <Typography variant="h6" sx={{ fontWeight: 800, mb: 2, fontSize: '18px' }}>
                Payment Method
              </Typography>

              <FormControl fullWidth>
                <RadioGroup name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
                    <Paper
                      elevation={0}
                      onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'COD' } })}
                      sx={{
                        p: 2,
                        borderRadius: '14px',
                        border: '2px solid',
                        borderColor: formData.paymentMethod === 'COD' ? '#000000' : '#E5E7EB',
                        backgroundColor: formData.paymentMethod === 'COD' ? '#F9FAFB' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <LocalShippingOutlinedIcon sx={{ color: formData.paymentMethod === 'COD' ? '#000' : '#6B7280' }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Cash on Delivery (COD)</Typography>
                          <Typography variant="caption" color="text.secondary">Pay with cash when your package is delivered</Typography>
                        </Box>
                      </Box>
                      <Radio checked={formData.paymentMethod === 'COD'} value="COD" sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />
                    </Paper>

                    <Paper
                      elevation={0}
                      onClick={() => handleChange({ target: { name: 'paymentMethod', value: 'Card' } })}
                      sx={{
                        p: 2,
                        borderRadius: '14px',
                        border: '2px solid',
                        borderColor: formData.paymentMethod === 'Card' ? '#000000' : '#E5E7EB',
                        backgroundColor: formData.paymentMethod === 'Card' ? '#F9FAFB' : '#FFFFFF',
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        transition: 'all 0.2s ease',
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <CreditCardOutlinedIcon sx={{ color: formData.paymentMethod === 'Card' ? '#000' : '#6B7280' }} />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Credit / Debit Card</Typography>
                          <Typography variant="caption" color="text.secondary">Secure online payment via card</Typography>
                        </Box>
                      </Box>
                      <Radio checked={formData.paymentMethod === 'Card'} value="Card" sx={{ color: '#000', '&.Mui-checked': { color: '#000' } }} />
                    </Paper>
                  </Box>
                </RadioGroup>
              </FormControl>
            </Paper>

            <Button
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '62px',
                py: 2,
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'none',
                boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                '&:hover': { backgroundColor: '#222222' },
                '&:disabled': { backgroundColor: '#9CA3AF' },
              }}
            >
              {loading ? (
                <CircularProgress size={26} sx={{ color: '#FFFFFF' }} />
              ) : (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LockOutlinedIcon fontSize="small" />
                  <span>Place Order (${total})</span>
                </Box>
              )}
            </Button>
          </Box>

          <Paper
            elevation={0}
            sx={{
              flex: { md: '0 0 400px' },
              width: '100%',
              borderRadius: '20px',
              border: '1px solid #E5E7EB',
              p: { xs: 2.5, sm: 3 },
              backgroundColor: '#FFFFFF',
              position: { md: 'sticky' },
              top: '20px',
            }}
          >
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 2.5, fontSize: '18px' }}>
              Order Summary
            </Typography>

            <Box sx={{ maxHeight: '320px', overflowY: 'auto', pr: 1, mb: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
              {cartItems.map((item, idx) => {
                const itemImg = item.image || item.img || item.src;
                const itemTitle = item.title || item.name || 'Product';
                return (
                  <Box key={idx} sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Badge badgeContent={item.quantity} color="dark" sx={{ '& .MuiBadge-badge': { backgroundColor: '#000', color: '#fff', fontWeight: 700 } }}>
                      <Avatar
                        src={itemImg}
                        alt={itemTitle}
                        variant="rounded"
                        sx={{ width: 56, height: 56, borderRadius: '10px', border: '1px solid #F3F4F6', backgroundColor: '#F9FAFB' }}
                      />
                    </Badge>

                    <Box sx={{ flex: 1, minWidth: 0 }}>
                      <Typography variant="body2" sx={{ fontWeight: 700, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {itemTitle}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        Qty: {item.quantity} × ${item.price}
                      </Typography>
                    </Box>

                    <Typography variant="body2" sx={{ fontWeight: 800 }}>
                      ${item.price * item.quantity}
                    </Typography>
                  </Box>
                );
              })}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.2 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Subtotal</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>${subtotal}</Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">
                  Discount {promoCode ? `(${promoCode})` : ''}
                </Typography>
                <Typography variant="body2" sx={{ color: '#EF4444', fontWeight: 700 }}>
                  -${discountAmount}
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
                <Typography variant="body2" sx={{ fontWeight: 700 }}>
                  {deliveryFee === 0 ? 'FREE' : `$${deliveryFee}`}
                </Typography>
              </Box>

              <Divider sx={{ my: 1 }} />

              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 900, color: '#000000' }}>
                  ${total}
                </Typography>
              </Box>
            </Box>
          </Paper>

        </Box>
      </Box>

      <Dialog
        open={isSuccessOpen}
        onClose={handleCloseSuccess}
        PaperProps={{
          sx: {
            borderRadius: '28px',
            p: 2,
            maxWidth: '440px',
            width: '100%',
            textAlign: 'center',
          },
        }}
      >
        <IconButton
          onClick={handleCloseSuccess}
          sx={{ position: 'absolute', right: 16, top: 16, color: 'text.secondary' }}
        >
          <CloseIcon />
        </IconButton>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 3 }}>
          <Box sx={{ backgroundColor: '#ECFDF5', borderRadius: '50%', p: 2, display: 'flex' }}>
            <CheckCircleOutlineOutlined sx={{ fontSize: '64px', color: '#10B981' }} />
          </Box>
          
          <Typography variant="h5" sx={{ fontWeight: 900, color: '#111827', letterSpacing: '-0.3px' }}>
            Order Placed Successfully!
          </Typography>

          <Typography variant="body2" sx={{ color: '#4B5563', lineHeight: 1.6 }}>
            Thank you for your purchase, <strong>{formData.fullName}</strong>! Your order total is <strong>${total}</strong>. We will send a confirmation email to <strong>{formData.email}</strong>.
          </Typography>

          <Button
            variant="contained"
            fullWidth
            onClick={handleCloseSuccess}
            sx={{
              backgroundColor: '#000000',
              borderRadius: '62px',
              py: 1.5,
              mt: 1,
              textTransform: 'none',
              fontSize: '15px',
              fontWeight: 700,
              '&:hover': { backgroundColor: '#222222' },
            }}
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default CheckoutPage;