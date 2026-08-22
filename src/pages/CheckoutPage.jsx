import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  TextField,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Divider,
  Dialog,
  DialogContent,
  IconButton,
} from '@mui/material';
import Navbar from '../components/layout/Navbar';
import { CheckCircleOutlineOutlined } from '@mui/icons-material';
import Footer from '../components/common/Footer';
import CloseIcon from '@mui/icons-material/Close';

const CheckoutPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // CartPage se aaya hua data receive kar rahe hain
  const checkoutData = location.state || {};
  const { cartItems = [], subtotal = 0, discountAmount = 0, deliveryFee = 0, total = 0, promoCode } = checkoutData;

  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    address: '',
    city: '',
    paymentMethod: 'cod',
  });

  // Modal State
  const [isSuccessOpen, setIsSuccessOpen] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    // Native alert ki jagah professional popup open karenge
    setIsSuccessOpen(true);
  };

  const handleCloseSuccess = () => {
    setIsSuccessOpen(false);
    navigate('/'); // Home page par redirect karega
  };

  if (!cartItems || cartItems.length === 0) {
    return (
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5">No checkout data found!</Typography>
        <Button sx={{ mt: 2 }} onClick={() => navigate('/cart')}>Back to Cart</Button>
      </Box>
    );
  }

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar/>
      <Box sx={{ maxWidth: '1100px', mx: 'auto', px: { xs: 2, md: 4 }, py: 4 }}>
        <Typography variant="h4" sx={{ fontWeight: 800, mb: 4, fontFamily: '"Integral CF", sans-serif' }}>
          CHECKOUT
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 4 }}>
          {/* Shipping Form */}
          <Box component="form" onSubmit={handlePlaceOrder} sx={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Typography variant="h6" sx={{ fontWeight: 700 }}>Shipping Details</Typography>
            <TextField label="Full Name" name="fullName" required fullWidth value={formData.fullName} onChange={handleChange} />
            <TextField label="Email Address" name="email" type="email" required fullWidth value={formData.email} onChange={handleChange} />
            <TextField label="Address" name="address" required fullWidth value={formData.address} onChange={handleChange} />
            <TextField label="City" name="city" required fullWidth value={formData.city} onChange={handleChange} />

            <FormControl sx={{ mt: 2 }}>
              <FormLabel sx={{ fontWeight: 700, color: '#000' }}>Payment Method</FormLabel>
              <RadioGroup name="paymentMethod" value={formData.paymentMethod} onChange={handleChange}>
                <FormControlLabel value="cod" control={<Radio />} label="Cash on Delivery (COD)" />
                <FormControlLabel value="card" control={<Radio />} label="Credit / Debit Card" />
              </RadioGroup>
            </FormControl>

            <Button
              type="submit"
              variant="contained"
              sx={{ backgroundColor: '#000', borderRadius: '62px', py: 1.5, mt: 2, '&:hover': { backgroundColor: '#333' } }}
            >
              Place Order (${total})
            </Button>
          </Box>

          {/* Order Summary Box */}
          <Box sx={{ flex: '0 0 380px', border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', p: 3, height: 'fit-content' }}>
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 2 }}>Order Summary</Typography>
            
            {cartItems.map((item, idx) => (
              <Box key={idx} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                  {item.title || item.name} x {item.quantity}
                </Typography>
                <Typography variant="body2" sx={{ fontWeight: 600 }}>
                  ${item.price * item.quantity}
                </Typography>
              </Box>
            ))}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Subtotal</Typography>
              <Typography variant="body2" fontWeight={600}>${subtotal}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">
                Discount {promoCode ? `(${promoCode})` : ''}
              </Typography>
              <Typography variant="body2" color="error" fontWeight={600}>-${discountAmount}</Typography>
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2" color="text.secondary">Delivery Fee</Typography>
              <Typography variant="body2" fontWeight={600}>${deliveryFee}</Typography>
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Typography variant="subtitle1" fontWeight={700}>Total</Typography>
              <Typography variant="subtitle1" fontWeight={700}>${total}</Typography>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Professional Success Dialog Modal */}
      <Dialog
        open={isSuccessOpen}
        onClose={handleCloseSuccess}
        PaperProps={{
          sx: {
            borderRadius: '24px',
            p: 2,
            maxWidth: '450px',
            width: '100%',
            textAlign: 'center',
          },
        }}
      >
        <IconButton
          onClick={handleCloseSuccess}
          sx={{ position: 'absolute', right: 16, top: 16, color: 'rgba(0,0,0,0.5)' }}
        >
          <CloseIcon/>
        </IconButton>

        <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, pt: 3 }}>
          <CheckCircleOutlineOutlined sx={{ fontSize: '80px', color: '#00C853' }} />
          
          <Typography variant="h5" sx={{ fontWeight: 800, color: '#000000' }}>
            Order Placed Successfully!
          </Typography>

          <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.6)', lineHeight: 1.6 }}>
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
              fontSize: '16px',
              fontWeight: 600,
              '&:hover': { backgroundColor: '#333333' },
            }}
          >
            Continue Shopping
          </Button>
        </DialogContent>
      </Dialog>

      <Footer/>
    </Box>
  );
};

export default CheckoutPage;