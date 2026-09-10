import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Box,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  Button,
  Pagination,
  MenuItem,
  Select,
  FormControl,
  Divider,
  CircularProgress,
  IconButton,
  Drawer,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import TuneIcon from '@mui/icons-material/Tune';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';

import Navbar from '../components/layout/Navbar'; 
import Footer from '../components/common/Footer'; 
import ProductCard from '../components/common/ProductCard';

const IS_LOCAL = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const API_BASE_URL = IS_LOCAL 
  ? 'http://localhost:8000' 
  : 'https://admin-dashboard-seven-beta-63.vercel.app'; 

const API = axios.create({
  baseURL: API_BASE_URL,
});

const getFullImageUrl = (imgPath) => {
  if (!imgPath) return 'https://placehold.co/300x300?text=No+Image';
  let actualPath = typeof imgPath === 'object' ? (imgPath.url || imgPath.secure_url) : imgPath;
  if (!actualPath || typeof actualPath !== 'string') return 'https://placehold.co/300x300?text=No+Image';
  if (actualPath.startsWith('http://') || actualPath.startsWith('https://') || actualPath.startsWith('data:image')) {
    return encodeURI(actualPath);
  }
  const cleanPath = actualPath.startsWith('/') ? actualPath : `/${actualPath}`;
  return encodeURI(`${API_BASE_URL}${cleanPath}`);
};

const COLOR_OPTIONS = [
  { name: 'Green', hex: '#00C12B' },
  { name: 'Red', hex: '#F52525' },
  { name: 'Yellow', hex: '#FFD700' },
  { name: 'Orange', hex: '#FF8A00' },
  { name: 'Cyan', hex: '#06CAF5' },
  { name: 'Blue', hex: '#063AF5' },
  { name: 'Purple', hex: '#7D06F5' },
  { name: 'Pink', hex: '#F506A4' },
  { name: 'White', hex: '#FFFFFF' },
  { name: 'Black', hex: '#000000' }
];

const SIZE_OPTIONS = ['XX-Small', 'X-Small', 'Small', 'Medium', 'Large', 'X-Large', 'XX-Large', '3X-Large', '4X-Large'];
const CATEGORIES = ['New Arrivals', 'T-Shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const DRESS_STYLES = ['Formal', 'Party', 'Gym'];

const CategoryPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  
  const [sortBy, setSortBy] = useState('Most Popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        console.log("Fetching products from:", `${API_BASE_URL}/api/products`);
        const response = await API.get('/api/products');
        console.log("API Response Data:", response.data);
        
        let productList = [];
        if (Array.isArray(response.data)) {
          productList = response.data;
        } else if (response.data && Array.isArray(response.data.products)) {
          productList = response.data.products;
        } else if (response.data && Array.isArray(response.data.data)) {
          productList = response.data.data;
        }

        console.log("Processed Product List:", productList);
        setProducts(productList);
        setFilteredProducts(productList); 
      } catch (err) {
        console.error('Error fetching backend products:', err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const normalize = (str) => {
    if (!str) return '';
    return String(str).toLowerCase().replace(/[-_\s]/g, '').trim();
  };

  // Jab tak user "Apply Filter" na dabaye, ya agar koi filter select nahi hai, toh saare products dikhne chahiye
  useEffect(() => {
    // Agar filters khali hain, toh default poori list show ho
    if (!selectedCategory && !selectedColor && !selectedSize && !selectedStyle && priceRange[0] === 0 && priceRange[1] === 1000) {
      setFilteredProducts(products);
    }
  }, [products, selectedCategory, selectedColor, selectedSize, selectedStyle, priceRange]);

  const handleApplyFilter = () => {
    let result = products.filter((item) => {
      const rawPrice = item.price ?? item.cost ?? 0;
      const itemPrice = typeof rawPrice === 'number' ? rawPrice : parseFloat(String(rawPrice).replace(/[^0-9.]/g, ''));
      const passPrice = isNaN(itemPrice) ? true : (itemPrice >= priceRange[0] && itemPrice <= priceRange[1]);

      let passCategory = true;
      if (selectedCategory) {
        let searchTerm = normalize(selectedCategory);
        if (searchTerm.endsWith('s') && searchTerm.length > 3) {
          searchTerm = searchTerm.slice(0, -1);
        }
        const prodCategory = normalize(item.category);
        const prodName = normalize(item.name || item.title || item.productName);
        passCategory = prodCategory.includes(searchTerm) || searchTerm.includes(prodCategory) || prodName.includes(searchTerm);
      }

      let passColor = !selectedColor;
      if (selectedColor && item.colors) {
        const searchColor = normalize(selectedColor);
        passColor = Array.isArray(item.colors) 
          ? item.colors.some(c => normalize(c).includes(searchColor))
          : normalize(item.colors).includes(searchColor);
      }

      let passSize = !selectedSize;
      if (selectedSize && item.sizes) {
        const searchSize = normalize(selectedSize);
        passSize = Array.isArray(item.sizes)
          ? item.sizes.some(s => normalize(s).includes(searchSize))
          : normalize(item.sizes).includes(searchSize);
      }

      let passStyle = true;
      if (selectedStyle) {
        const styleTerm = normalize(selectedStyle);
        const prodStyle = normalize(item.style || item.dressStyle);
        const prodName = normalize(item.name || item.title || item.productName);
        passStyle = prodStyle.includes(styleTerm) || prodName.includes(styleTerm);
      }

      return passPrice && passCategory && passColor && passSize && passStyle;
    });

    if (sortBy === 'Low to High') {
      result.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (sortBy === 'High to Low') {
      result.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }

    setFilteredProducts(result);
    setCurrentPage(1);
    setMobileFilterOpen(false);
  };

  const handleResetFilters = () => {
    setPriceRange([0, 1000]);
    setSelectedCategory('');
    setSelectedColor('');
    setSelectedSize('');
    setSelectedStyle('');
    setFilteredProducts(products);
    setCurrentPage(1);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    let sortedList = [...filteredProducts];
    if (value === 'Low to High') {
      sortedList.sort((a, b) => Number(a.price || 0) - Number(b.price || 0));
    } else if (value === 'High to Low') {
      sortedList.sort((a, b) => Number(b.price || 0) - Number(a.price || 0));
    }
    setFilteredProducts(sortedList);
    setCurrentPage(1);
  };

  const currentHeading = selectedCategory || selectedStyle || 'All Products';
  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const FilterContent = (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Filters</Typography>
        <IconButton onClick={() => setMobileFilterOpen(false)} sx={{ display: { xs: 'flex', md: 'none' }, p: 0.5 }}>
          <CloseIcon sx={{ color: '#000' }} />
        </IconButton>
        <TuneIcon sx={{ display: { xs: 'none', md: 'block' }, color: 'rgba(0,0,0,0.4)' }} />
      </Box>
      <Divider sx={{ mb: 2 }} />

      <Box sx={{ mb: 2 }}>
        {CATEGORIES.map((cat) => (
          <Box
            key={cat}
            onClick={() => setSelectedCategory(selectedCategory === cat ? '' : cat)}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              py: 0.8,
              px: 1,
              borderRadius: '8px',
              cursor: 'pointer',
              backgroundColor: selectedCategory === cat ? '#f0f0f0' : 'transparent',
              color: selectedCategory === cat ? '#000' : 'rgba(0,0,0,0.6)',
              fontWeight: selectedCategory === cat ? 700 : 400,
              '&:hover': { color: '#000', backgroundColor: '#f5f5f5' },
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'inherit' }}>{cat}</Typography>
            <ChevronRightIcon fontSize="small" />
          </Box>
        ))}
      </Box>
      <Divider sx={{ mb: 1 }} />

      <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Price</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Slider
            value={priceRange}
            onChange={(e, newValue) => setPriceRange(newValue)}
            valueLabelDisplay="auto"
            min={0}
            max={1000}
            sx={{ color: '#000000' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>${priceRange[0]}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>${priceRange[1]}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 1 }} />

      <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Colors</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {COLOR_OPTIONS.map((colorObj) => {
              const isSelected = selectedColor === colorObj.name || selectedColor === colorObj.hex;
              return (
                <Box
                  key={colorObj.name}
                  onClick={() => setSelectedColor(isSelected ? '' : colorObj.name)}
                  sx={{
                    width: '32px',
                    height: '32px',
                    borderRadius: '50%',
                    backgroundColor: colorObj.hex,
                    border: colorObj.hex === '#FFFFFF' ? '1px solid #ccc' : 'none',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    boxShadow: isSelected ? '0 0 0 2px #000' : 'none',
                  }}
                >
                  {isSelected && <CheckIcon sx={{ color: colorObj.hex === '#FFFFFF' ? '#000' : '#fff', fontSize: '18px' }} />}
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 1 }} />

      <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Size</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.8 }}>
            {SIZE_OPTIONS.map((size) => {
              const isSelected = selectedSize === size;
              return (
                <Button
                  key={size}
                  onClick={() => setSelectedSize(isSelected ? '' : size)}
                  sx={{
                    backgroundColor: isSelected ? '#000' : '#F0F0F0',
                    color: isSelected ? '#fff' : 'rgba(0,0,0,0.6)',
                    borderRadius: '62px',
                    fontSize: '11px',
                    px: 1.5,
                    py: 0.5,
                    textTransform: 'none',
                    minWidth: 'auto',
                  }}
                >
                  {size}
                </Button>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 1 }} />

      <Accordion defaultExpanded elevation={0} sx={{ '&:before': { display: 'none' } }}>
        <AccordionSummary expandIcon={<ExpandMoreIcon />} sx={{ px: 0 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Dress Style</Typography>
        </AccordionSummary>
        <AccordionDetails sx={{ px: 0 }}>
          {DRESS_STYLES.map((style) => {
            const isSelected = selectedStyle === style;
            return (
              <Box
                key={style}
                onClick={() => setSelectedStyle(isSelected ? '' : style)}
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  py: 0.8,
                  px: 1,
                  borderRadius: '8px',
                  cursor: 'pointer',
                  backgroundColor: isSelected ? '#f0f0f0' : 'transparent',
                  color: isSelected ? '#000' : 'rgba(0,0,0,0.6)',
                  fontWeight: isSelected ? 700 : 400,
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'inherit' }}>{style}</Typography>
                <ChevronRightIcon fontSize="small" />
              </Box>
            );
          })}
        </AccordionDetails>
      </Accordion>

      <Button
        fullWidth
        variant="contained"
        onClick={handleApplyFilter}
        sx={{ backgroundColor: '#000', color: '#fff', borderRadius: '62px', py: 1.2, mt: 2, textTransform: 'none', fontWeight: 600 }}
      >
        Apply Filter
      </Button>

      <Button
        fullWidth
        variant="text"
        onClick={handleResetFilters}
        sx={{ color: '#888', py: 0.8, mt: 1, textTransform: 'none', fontSize: '13px' }}
      >
        Reset Filters
      </Button>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />
      <Box sx={{ maxWidth: '1240px', mx: 'auto', px: { xs: 1.5, sm: 3, md: 4 }, py: { xs: 1.5, md: 3 } }}>
        
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: { xs: 1.5, md: 3 }, fontSize: { xs: '12px', sm: '14px' } }}>
          <Typography component={Link} to="/" sx={{ color: 'inherit', textDecoration: 'none', '&:hover': { color: '#000' } }}>Home</Typography>
          {' > '}
          <Typography component="span" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 'inherit' }}>{currentHeading}</Typography>
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          <Box sx={{ width: '295px', minWidth: '295px', display: { xs: 'none', md: 'block' }, border: '1px solid rgba(0,0,0,0.1)', borderRadius: '20px', p: 3, height: 'fit-content' }}>
            {FilterContent}
          </Box>

          <Drawer anchor="top" open={mobileFilterOpen} onClose={() => setMobileFilterOpen(false)} PaperProps={{ sx: { borderBottomLeftRadius: '20px', borderBottomRightRadius: '20px', maxHeight: '85vh', overflowY: 'auto' } }}>
            {FilterContent}
          </Drawer>

          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: { xs: 2, md: 3 }, width: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: '20px', sm: '28px', md: '32px' } }}>{currentHeading}</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' } }}>
                  Showing {filteredProducts.length > 0 ? `${indexOfFirstProduct + 1}-${Math.min(indexOfLastProduct, filteredProducts.length)}` : '0'} of {filteredProducts.length} Products
                </Typography>
              </Box>

              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <FormControl size="small" variant="standard" sx={{ minWidth: 140, display: { xs: 'none', sm: 'inline-flex' } }}>
                  <Select value={sortBy} onChange={handleSortChange} disableUnderline sx={{ fontWeight: 700, fontSize: '13px' }}>
                    <MenuItem value="Most Popular">Sort by: Most Popular</MenuItem>
                    <MenuItem value="Low to High">Sort by: Low to High</MenuItem>
                    <MenuItem value="High to Low">Sort by: High to Low</MenuItem>
                  </Select>
                </FormControl>

                <IconButton onClick={() => setMobileFilterOpen(true)} sx={{ display: { xs: 'flex', md: 'none' }, backgroundColor: '#F0F0F0', width: '36px', height: '36px', p: 0.8 }}>
                  <TuneIcon sx={{ fontSize: '18px', color: '#000' }} />
                </IconButton>
              </Box>
            </Box>

            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px' }}>
                <CircularProgress sx={{ color: '#000' }} />
              </Box>
            ) : error ? (
              <Typography color="error" textAlign="center" sx={{ py: 4, fontSize: '14px' }}>
                Error loading products: {error}
              </Typography>
            ) : filteredProducts.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 6 }}>
                <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>
                  No products found matching your selected criteria.
                </Typography>
                <Button variant="outlined" onClick={handleResetFilters} sx={{ textTransform: 'none', color: '#000', borderColor: '#000', borderRadius: '20px', mt: 1 }}>
                  Clear All Filters
                </Button>
              </Box>
            ) : (
              <Box sx={{ display: 'grid', gridTemplateColumns: { xs: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' }, gap: { xs: 1.2, sm: 2 }, width: '100%' }}>
                {currentProducts.map((product) => {
                  const productId = product._id || product.id;
                  const rawImg = Array.isArray(product.images) && product.images.length > 0 ? product.images[0] : product.image || product.img;
                  const normalizedProduct = {
                    ...product,
                    id: productId,
                    title: product.title || product.name,
                    image: getFullImageUrl(rawImg),
                  };
                  return (
                    <Box key={productId} onClick={() => navigate(`/product/${productId}`)} sx={{ width: '100%', minWidth: 0, cursor: 'pointer', transition: 'transform 0.2s', '&:hover': { transform: 'translateY(-4px)' } }}>
                      <ProductCard product={normalizedProduct} />
                    </Box>
                  );
                })}
              </Box>
            )}

            <Divider sx={{ my: { xs: 3, md: 4 } }} />
            
            {totalPages > 1 && (
              <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
                <Pagination count={totalPages} page={currentPage} onChange={handlePageChange} shape="rounded" size="small" />
              </Box>
            )}
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default CategoryPage;