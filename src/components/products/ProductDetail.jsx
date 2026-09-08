import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
  Box,
  Typography,
  Button,
  Rating,
  Chip,
  Stack,
  IconButton,
  CircularProgress,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import axios from 'axios';
import { ProductContext } from '../../context/ProductContext';
import Navbar from '../layout/Navbar';
import ProductReviews from './ProductReviews';
import ProductLikeCard from './ProductLikeCard';
import Footer from '../common/Footer';

const API_BASE = 'https://shop-ecommerce-backend-pk6z857yf-hassanmhbs-projects.vercel.app';

const COLOR_OPTIONS = [
  { id: 'olive', value: '#4F533E' },
  { id: 'teal', value: '#314F4A' },
  { id: 'navy', value: '#31344F' },
];

const SIZE_OPTIONS = ['Small', 'Medium', 'Large', 'X-Large'];

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addToCart, loading: contextLoading } = useContext(ProductContext);

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('Large');
  const [selectedColor, setSelectedColor] = useState('#4F533E');
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  // Auth Pop-up Modal States
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [authLoading, setAuthLoading] = useState(false);
  const [authError, setAuthError] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    city: '',
    country: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
    setSelectedImageIndex(0);
    setQuantity(1);

    const fetchSingleProduct = async () => {
      if (products && products.length > 0) {
        const foundProduct = products.find(
          (item) => String(item.id || item._id) === String(id)
        );
        if (foundProduct) {
          setProduct(foundProduct);
          setLoading(false);
          return;
        }
      }

      try {
        setLoading(true);
        const res = await fetch(`${API_BASE}/api/products/${id}`);
        if (res.ok) {
          const data = await res.json();
          setProduct(data.product || data);
        } else {
          setProduct(null);
        }
      } catch (err) {
        console.error('Error fetching product detail:', err);
        setProduct(null);
      } finally {
        setLoading(false);
      }
    };

    if (!contextLoading) {
      fetchSingleProduct();
    }
  }, [id, products, contextLoading]);

  // Handle Add To Cart Click
  const handleAddToCartClick = () => {
    const token = localStorage.getItem('token');
    const user = localStorage.getItem('user');

    if (!token || !user) {
      setOpenAuthModal(true);
    } else {
      addToCart({
        ...product,
        quantity,
        size: selectedSize,
        color: selectedColor,
      });
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // User Registration & Save to MongoDB Atlas
  const handleAuthSubmit = async (e) => {
    e.preventDefault();
    setAuthLoading(true);
    setAuthError('');

    try {
      const res = await axios.post(`${API_BASE}/api/auth/register-user`, formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (res.data && res.data.token) {
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('user', JSON.stringify(res.data.user));

        setOpenAuthModal(false);

        addToCart({
          ...product,
          quantity,
          size: selectedSize,
          color: selectedColor,
        });

        setFormData({ name: '', email: '', password: '', city: '', country: '' });
      }
    } catch (err) {
      console.error('Auth Request Failed:', err);
      const errorMsg = err.response?.data?.message || err.message || 'Something went wrong. Please try again.';
      setAuthError(errorMsg);
    } finally {
      setAuthLoading(false);
    }
  };

  const getBackendImageUrl = (imgPath) => {
    if (!imgPath) return 'https://placehold.co/400x400?text=No+Image';
    let actualPath = typeof imgPath === 'object' ? (imgPath.url || imgPath.secure_url) : imgPath;
    if (!actualPath || typeof actualPath !== 'string') return 'https://placehold.co/400x400?text=No+Image';
    if (actualPath.startsWith('http://') || actualPath.startsWith('https://') || actualPath.startsWith('data:image')) {
      return encodeURI(actualPath);
    }
    const cleanPath = actualPath.startsWith('/') ? actualPath : `/${actualPath}`;
    return encodeURI(`${API_BASE}${cleanPath}`);
  };

  if (loading || contextLoading) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <CircularProgress color="inherit" />
        </Box>
      </Box>
    );
  }

  if (!product) {
    return (
      <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
        <Navbar />
        <Box sx={{ textAlign: 'center', py: 10, px: 2, flex: 1 }}>
          <Typography variant="h5" sx={{ fontWeight: 700, mb: 2 }}>
            Product not found!
          </Typography>
          <Button
            onClick={() => navigate('/')}
            variant="contained"
            sx={{ backgroundColor: 'black', textTransform: 'none', borderRadius: '30px', px: 4 }}
          >
            Back to Home
          </Button>
        </Box>
        <Footer />
      </Box>
    );
  }

  const rawImages = Array.isArray(product.images) && product.images.length > 0
    ? product.images
    : [product.image || product.img].filter(Boolean);

  const rawImageList = rawImages.length > 0 ? rawImages : ['https://placehold.co/400x400?text=No+Image'];

  const displayImagesList = rawImageList.length === 1
    ? [rawImageList[0], rawImageList[0], rawImageList[0]]
    : rawImageList;

  const productImages = displayImagesList.map(getBackendImageUrl);

  const relatedProducts = (products || []).filter((item) => String(item.id || item._id) !== String(id)).slice(0, 4);

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh' }}>
      <Navbar />

      <Box sx={{ maxWidth: '1240px', mx: 'auto', px: { xs: 2, sm: 3, md: 5 }, py: { xs: 2, md: 4 } }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: { xs: 2.5, md: 4 }, color: 'text.secondary', fontSize: '14px', flexWrap: 'wrap' }}>
          <Typography onClick={() => navigate('/')} sx={{ cursor: 'pointer', '&:hover': { color: 'black' }, fontSize: 'inherit' }}>
            Home
          </Typography>
          <Typography sx={{ fontSize: 'inherit' }}>&gt;</Typography>
          <Typography onClick={() => navigate('/')} sx={{ cursor: 'pointer', '&:hover': { color: 'black' }, fontSize: 'inherit' }}>
            Shop
          </Typography>
          <Typography sx={{ fontSize: 'inherit' }}>&gt;</Typography>
          <Typography sx={{ color: 'text.primary', fontWeight: 500, fontSize: 'inherit' }}>
            {product.category || 'T-shirts'}
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 3, md: 4, lg: 5 } }}>
          <Box sx={{ flex: 1.1, display: 'flex', flexDirection: { xs: 'column-reverse', sm: 'row' }, gap: 2 }}>
            <Stack direction={{ xs: 'row', sm: 'column' }} spacing={1.8} sx={{ width: { xs: '100%', sm: '130px' }, minWidth: { sm: '120px' } }}>
              {productImages.slice(0, 3).map((imgUrl, index) => (
                <Box
                  key={index}
                  onClick={() => setSelectedImageIndex(index)}
                  sx={{
                    flex: { xs: 1, sm: '0 0 145px' },
                    height: { xs: '100px', sm: '145px' },
                    backgroundColor: '#F0EEED',
                    borderRadius: '20px',
                    p: 1.5,
                    border: selectedImageIndex === index ? '2px solid #000' : '1px solid transparent',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <Box
                    component="img"
                    src={imgUrl}
                    alt={`Thumbnail ${index + 1}`}
                    sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
                  />
                </Box>
              ))}
            </Stack>

            <Box
              sx={{
                flex: 1,
                backgroundColor: '#F0EEED',
                borderRadius: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                p: { xs: 2, sm: 3 },
                height: { xs: '320px', sm: '470px' },
              }}
            >
              <Box
                component="img"
                src={productImages[selectedImageIndex] || productImages[0]}
                alt={product.name || product.title}
                sx={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
            </Box>
          </Box>

          <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
            <Typography variant="h4" component="h1" sx={{ fontWeight: 900, textTransform: 'uppercase', mb: 1, fontSize: { xs: '26px', sm: '32px', md: '38px' }, lineHeight: 1.1, fontFamily: 'sans-serif' }}>
              {product.name || product.title}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1.5 }}>
              <Rating value={Number(product.rating) || 4.5} precision={0.5} readOnly size="small" />
              <Typography variant="body2" sx={{ fontWeight: 600, fontSize: '14px', color: '#000' }}>
                {product.rating || 4.5}/<span style={{ color: '#606060' }}>5</span>
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, fontSize: { xs: '26px', md: '32px' }, color: '#000' }}>
                ${product.price}
              </Typography>
              {product.originalPrice && Number(product.originalPrice) > Number(product.price) && (
                <Typography variant="h5" sx={{ textDecoration: 'line-through', color: 'rgba(0,0,0,0.3)', fontWeight: 700, fontSize: { xs: '20px', md: '26px' } }}>
                  ${product.originalPrice}
                </Typography>
              )}
              {product.discountPercent > 0 && (
                <Chip label={`-${product.discountPercent}%`} size="small" sx={{ fontWeight: 600, backgroundColor: '#FFEBEB', color: '#FF3333', borderRadius: '62px', height: '26px', fontSize: '12px' }} />
              )}
            </Box>

            <Typography variant="body2" color="text.secondary" sx={{ mb: 2.5, lineHeight: 1.5, fontSize: '14px', color: 'rgba(0,0,0,0.6)' }}>
              {product.description || 'This graphic t-shirt is perfect for any occasion.'}
            </Typography>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2 }}>
              <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 1.2, fontWeight: 400, fontSize: '14px' }}>
                Select Colors
              </Typography>
              <Stack direction="row" spacing={1.5}>
                {COLOR_OPTIONS.map((color) => (
                  <Box
                    key={color.id}
                    onClick={() => setSelectedColor(color.value)}
                    sx={{
                      width: '37px',
                      height: '37px',
                      borderRadius: '50%',
                      backgroundColor: color.value,
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: selectedColor === color.value ? '2px solid #000' : 'none',
                    }}
                  >
                    {selectedColor === color.value && <CheckIcon sx={{ color: 'white', fontSize: '18px' }} />}
                  </Box>
                ))}
              </Stack>
            </Box>

            <Divider sx={{ mb: 2 }} />

            <Box sx={{ mb: 2.5 }}>
              <Typography variant="subtitle2" sx={{ color: 'rgba(0,0,0,0.6)', mb: 1.2, fontWeight: 400, fontSize: '14px' }}>
                Choose Size
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
                {SIZE_OPTIONS.map((size) => {
                  const isSelected = selectedSize === size;
                  return (
                    <Button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      sx={{
                        backgroundColor: isSelected ? 'black' : '#F0F0F0',
                        color: isSelected ? 'white' : 'rgba(0,0,0,0.6)',
                        borderRadius: '62px',
                        textTransform: 'none',
                        px: { xs: 2.5, sm: 3 },
                        py: 1,
                        fontSize: '14px',
                        fontWeight: 500,
                        boxShadow: 'none',
                      }}
                    >
                      {size}
                    </Button>
                  );
                })}
              </Box>
            </Box>

            <Divider sx={{ mb: 2.5 }} />

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#F0F0F0', borderRadius: '62px', px: 1.5, py: 0.8, width: { xs: '110px', sm: '140px' } }}>
                <IconButton size="small" onClick={() => setQuantity((q) => Math.max(1, q - 1))} sx={{ color: 'black', p: 0.5 }}>
                  <RemoveIcon fontSize="small" />
                </IconButton>
                <Typography sx={{ fontWeight: 700, fontSize: '15px' }}>{quantity}</Typography>
                <IconButton size="small" onClick={() => setQuantity((q) => q + 1)} sx={{ color: 'black', p: 0.5 }}>
                  <AddIcon fontSize="small" />
                </IconButton>
              </Box>

              <Button
                variant="contained"
                fullWidth
                onClick={handleAddToCartClick}
                sx={{
                  backgroundColor: 'black',
                  color: 'white',
                  borderRadius: '62px',
                  textTransform: 'none',
                  fontWeight: 500,
                  fontSize: '15px',
                  py: 1.4,
                  boxShadow: 'none',
                  '&:hover': { backgroundColor: '#222' },
                }}
              >
                Add to Cart
              </Button>
            </Box>
          </Box>
        </Box>

        <ProductReviews />

        <Box sx={{ mt: { xs: 6, md: 10 }, mb: { xs: 4, md: 6 } }}>
          <Typography variant="h3" sx={{ textAlign: 'center', fontWeight: 900, fontSize: { xs: '32px', md: '48px' }, mb: { xs: 4, md: 6 }, textTransform: 'uppercase' }}>
            YOU MIGHT ALSO LIKE
          </Typography>
          <Box sx={{ display: 'flex', flexWrap: { xs: 'nowrap', md: 'wrap' }, overflowX: { xs: 'auto', md: 'visible' }, gap: { xs: 2, md: 3 }, justifyContent: { xs: 'flex-start', md: 'center' } }}>
            {relatedProducts.map((relProduct) => (
              <Box key={relProduct.id || relProduct._id} sx={{ flex: { xs: '0 0 190px', sm: '0 0 calc(50% - 12px)', md: '0 0 calc(25% - 18px)' } }}>
                <ProductLikeCard product={relProduct} />
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* User Information Pop-Up Modal */}
      <Dialog
        open={openAuthModal}
        onClose={() => setOpenAuthModal(false)}
        maxWidth="xs"
        fullWidth
        PaperProps={{ sx: { borderRadius: '24px', p: 1.5 } }}
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
          <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '20px' }}>
            Enter Information to Add Cart
          </Typography>
          <IconButton onClick={() => setOpenAuthModal(false)} size="small">
            <CloseIcon />
          </IconButton>
        </DialogTitle>

        <form onSubmit={handleAuthSubmit}>
          <DialogContent sx={{ pt: 1 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>
              Please enter your details. Your data will be saved to MongoDB Atlas.
            </Typography>

            {authError && (
              <Alert severity="error" sx={{ mb: 2, borderRadius: '12px' }}>
                {authError}
              </Alert>
            )}

            <TextField
              margin="dense"
              name="name"
              label="Full Name"
              type="text"
              fullWidth
              required
              value={formData.name}
              onChange={handleInputChange}
              sx={{ mb: 1.5 }}
            />
            <TextField
              margin="dense"
              name="email"
              label="Email Address"
              type="email"
              fullWidth
              required
              value={formData.email}
              onChange={handleInputChange}
              sx={{ mb: 1.5 }}
            />
            <TextField
              margin="dense"
              name="password"
              label="Password"
              type="password"
              fullWidth
              required
              value={formData.password}
              onChange={handleInputChange}
              sx={{ mb: 1.5 }}
            />
            <TextField
              margin="dense"
              name="city"
              label="City Name"
              type="text"
              fullWidth
              required
              value={formData.city}
              onChange={handleInputChange}
              sx={{ mb: 1.5 }}
            />
            <TextField
              margin="dense"
              name="country"
              label="Country Name"
              type="text"
              fullWidth
              required
              value={formData.country}
              onChange={handleInputChange}
            />
          </DialogContent>

          <DialogActions sx={{ px: 3, pb: 2 }}>
            <Button
              type="submit"
              variant="contained"
              fullWidth
              disabled={authLoading}
              sx={{
                backgroundColor: 'black',
                color: 'white',
                borderRadius: '62px',
                py: 1.2,
                textTransform: 'none',
                fontWeight: 600,
                fontSize: '15px',
                '&:hover': { backgroundColor: '#222' },
              }}
            >
              {authLoading ? <CircularProgress size={24} color="inherit" /> : 'Submit & Add to Cart'}
            </Button>
          </DialogActions>
        </form>
      </Dialog>

      <Footer />
    </Box>
  );
};

export default ProductDetail;