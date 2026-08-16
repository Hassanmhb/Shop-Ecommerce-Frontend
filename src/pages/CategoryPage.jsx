import React, { useState, useEffect } from 'react';
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
const CATEGORIES = ['T-shirts', 'Shorts', 'Shirts', 'Hoodie', 'Jeans'];
const DRESS_STYLES = ['Casual', 'Formal', 'Party', 'Gym'];

const CategoryPage = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Filter Active States
  const [priceRange, setPriceRange] = useState([0, 500]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedStyle, setSelectedStyle] = useState('');
  
  const [sortBy, setSortBy] = useState('Most Popular');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await fetch('http://localhost:8000/api/products');
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data = await response.json();
        const productList = Array.isArray(data) ? data : data.products || [];
        setProducts(productList);
        setFilteredProducts(productList);
      } catch (err) {
        console.error('Error fetching backend products:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Flexible Filtering & Ranking Logic
  const handleApplyFilter = () => {
    // 1. Pehle Price Range aur Category ke tehet products filter kar lein
    let baseProducts = products.filter((item) => {
      const itemPrice = Number(item.price);
      const passPrice = isNaN(itemPrice) ? true : (itemPrice >= priceRange[0] && itemPrice <= priceRange[1]);
      
      const passCategory = !selectedCategory || 
        (item.category && item.category.toLowerCase().includes(selectedCategory.toLowerCase()));

      return passPrice && passCategory;
    });

    // 2. Exact Match Check (Agr koi filter match na kare to fall back to price range base list)
    let exactMatches = baseProducts.filter((item) => {
      const passColor = !selectedColor || 
        (Array.isArray(item.colors) && item.colors.some(c => c.toLowerCase() === selectedColor.toLowerCase()));

      const passSize = !selectedSize || 
        (Array.isArray(item.sizes) && item.sizes.some(s => s.toLowerCase() === selectedSize.toLowerCase()));

      const passStyle = !selectedStyle || 
        (item.style && item.style.toLowerCase().includes(selectedStyle.toLowerCase()));

      return passColor && passSize && passStyle;
    });

    // Strategy: Agar match waale products mil jayein to wo show honge, warna price range me aane wale sare products dikhenge
    let result = exactMatches.length > 0 ? exactMatches : baseProducts;

    // 3. Sorting Apply Karein
    if (sortBy === 'Low to High') {
      result.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (sortBy === 'High to Low') {
      result.sort((a, b) => Number(b.price) - Number(a.price));
    }

    setFilteredProducts([...result]);
    setMobileFilterOpen(false);
  };

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortBy(value);
    
    let sortedList = [...filteredProducts];
    if (value === 'Low to High') {
      sortedList.sort((a, b) => Number(a.price) - Number(b.price));
    } else if (value === 'High to Low') {
      sortedList.sort((a, b) => Number(b.price) - Number(a.price));
    }
    setFilteredProducts(sortedList);
  };

  const FilterContent = (
    <Box sx={{ width: '100%', p: 2 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 800 }}>Filters</Typography>
        
        <IconButton 
          onClick={() => setMobileFilterOpen(false)} 
          sx={{ display: { xs: 'flex', md: 'none' }, p: 0.5 }}
        >
          <CloseIcon sx={{ color: '#000' }} />
        </IconButton>

        <TuneIcon sx={{ display: { xs: 'none', md: 'block' }, color: 'rgba(0,0,0,0.4)' }} />
      </Box>
      <Divider sx={{ mb: 2 }} />

      {/* CATEGORIES */}
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
              cursor: 'pointer',
              color: selectedCategory === cat ? '#000' : 'rgba(0,0,0,0.6)',
              fontWeight: selectedCategory === cat ? 700 : 400,
              '&:hover': { color: '#000' },
            }}
          >
            <Typography variant="body2" sx={{ fontSize: '14px', fontWeight: 'inherit' }}>{cat}</Typography>
            <ChevronRightIcon fontSize="small" />
          </Box>
        ))}
      </Box>
      <Divider sx={{ mb: 1 }} />

      {/* PRICE RANGE */}
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
            max={500}
            sx={{ color: '#000000' }}
          />
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>${priceRange[0]}</Typography>
            <Typography variant="body2" sx={{ fontWeight: 700 }}>${priceRange[1]}</Typography>
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 1 }} />

      {/* COLORS (PERFECTLY CENTERED TICK FIX) */}
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
                    lineHeight: 0,
                  }}
                >
                  {isSelected && (
                    <CheckIcon 
                      sx={{ 
                        color: colorObj.hex === '#FFFFFF' ? '#000' : '#fff', 
                        fontSize: '18px',
                        display: 'block',
                        margin: 'auto',
                        padding: 0
                      }} 
                    />
                  )}
                </Box>
              );
            })}
          </Box>
        </AccordionDetails>
      </Accordion>
      <Divider sx={{ my: 1 }} />

      {/* SIZES */}
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
                    '&:hover': {
                      backgroundColor: isSelected ? '#333' : '#E0E0E0'
                    }
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

      {/* DRESS STYLE */}
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
                  cursor: 'pointer',
                  color: isSelected ? '#000' : 'rgba(0,0,0,0.6)',
                  fontWeight: isSelected ? 700 : 400,
                  '&:hover': { color: '#000' },
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
        sx={{
          backgroundColor: '#000000',
          color: '#FFFFFF',
          borderRadius: '62px',
          py: 1.2,
          mt: 2,
          textTransform: 'none',
          fontWeight: 600,
        }}
      >
        Apply Filter
      </Button>
    </Box>
  );

  return (
    <Box sx={{ backgroundColor: '#FFFFFF', minHeight: '100vh', overflowX: 'hidden' }}>
      <Navbar />

      <Box sx={{ maxWidth: '1240px', mx: 'auto', px: { xs: 1.5, sm: 3, md: 4 }, py: { xs: 1.5, md: 3 } }}>
        
        {/* Breadcrumb Navigation */}
        <Typography variant="body2" sx={{ color: 'text.secondary', mb: { xs: 1.5, md: 3 }, fontSize: { xs: '12px', sm: '14px' } }}>
          Home &gt; <Typography component="span" sx={{ color: 'text.primary', fontWeight: 600, fontSize: 'inherit' }}>Casual</Typography>
        </Typography>

        <Box sx={{ display: 'flex', gap: 3 }}>
          
          {/* DESKTOP SIDEBAR FILTERS */}
          <Box
            sx={{
              width: '295px',
              minWidth: '295px',
              display: { xs: 'none', md: 'block' },
              border: '1px solid rgba(0,0,0,0.1)',
              borderRadius: '20px',
              p: 3,
              height: 'fit-content',
            }}
          >
            {FilterContent}
          </Box>

          {/* MOBILE FILTER DRAWER */}
          <Drawer
            anchor="bottom"
            open={mobileFilterOpen}
            onClose={() => setMobileFilterOpen(false)}
            PaperProps={{
              sx: { borderTopLeftRadius: '20px', borderTopRightRadius: '20px', maxHeight: '85vh' }
            }}
          >
            {FilterContent}
          </Drawer>

          {/* RIGHT SIDE: PRODUCTS LIST */}
          <Box sx={{ flex: 1, minWidth: 0, width: '100%' }}>
            
            {/* Header Section */}
            <Box 
              sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center', 
                mb: { xs: 2, md: 3 },
                width: '100%'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: 900, fontSize: { xs: '20px', sm: '28px', md: '32px' } }}>
                  Casual
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '10px', sm: '12px', md: '14px' }, whiteSpace: 'nowrap' }}>
                  Showing {filteredProducts.length > 0 ? `1-${filteredProducts.length}` : '0'} of {filteredProducts.length} Products
                </Typography>
              </Box>

              {/* Right Aligned Controls */}
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, ml: 'auto' }}>
                <FormControl size="small" variant="standard" sx={{ minWidth: 140, display: { xs: 'none', sm: 'inline-flex' } }}>
                  <Select
                    value={sortBy}
                    onChange={handleSortChange}
                    disableUnderline
                    sx={{ fontWeight: 700, fontSize: '13px' }}
                  >
                    <MenuItem value="Most Popular">Sort by: Most Popular</MenuItem>
                    <MenuItem value="Low to High">Sort by: Low to High</MenuItem>
                    <MenuItem value="High to Low">Sort by: High to Low</MenuItem>
                  </Select>
                </FormControl>

                <IconButton 
                  onClick={() => setMobileFilterOpen(true)}
                  sx={{ 
                    display: { xs: 'flex', md: 'none' }, 
                    backgroundColor: '#F0F0F0',
                    width: '36px',
                    height: '36px',
                    p: 0.8
                  }}
                >
                  <TuneIcon sx={{ fontSize: '18px', color: '#000' }} />
                </IconButton>
              </Box>
            </Box>

            {/* PRODUCT GRID */}
            {loading ? (
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '250px' }}>
                <CircularProgress sx={{ color: '#000' }} />
              </Box>
            ) : error ? (
              <Typography color="error" textAlign="center" sx={{ py: 4, fontSize: '14px' }}>
                Error loading products: {error}
              </Typography>
            ) : filteredProducts.length === 0 ? (
              <Typography textAlign="center" sx={{ py: 4, fontSize: '14px' }}>
                No products found matching your selected price range.
              </Typography>
            ) : (
              <Box
                sx={{
                  display: 'grid',
                  gridTemplateColumns: {
                    xs: 'repeat(2, 1fr)',
                    md: 'repeat(3, 1fr)',
                  },
                  gap: { xs: 1.2, sm: 2 },
                  width: '100%',
                }}
              >
                {filteredProducts.map((product) => (
                  <Box key={product._id || product.id} sx={{ width: '100%', minWidth: 0 }}>
                    <ProductCard product={product} />
                  </Box>
                ))}
              </Box>
            )}

            <Divider sx={{ my: { xs: 3, md: 4 } }} />
            
            <Box sx={{ display: 'flex', justifyContent: 'center', pb: 2 }}>
              <Pagination 
                count={10} 
                shape="rounded" 
                size="small"
                sx={{
                  '& .MuiPaginationItem-root': {
                    fontSize: { xs: '11px', sm: '13px' },
                    minWidth: { xs: '24px', sm: '32px' },
                    height: { xs: '24px', sm: '32px' },
                    px: { xs: 0.5, sm: 1 }
                  }
                }}
              />
            </Box>

          </Box>
        </Box>
      </Box>

      <Footer />
    </Box>
  );
};

export default CategoryPage;