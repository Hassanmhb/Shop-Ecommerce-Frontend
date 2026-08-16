import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import TopBanner from '../components/layout/TopBanner';
import Navbar from '../components/layout/Navbar';
import HeroSection from '../components/home/HeroSection';
import BrandsBanner from '../components/home/BrandsBanner';
import NewArrivals from '../components/home/NewArrivals';
import ProductListSection from '../components/home/ProductListSection';
import BrowseByStyle from '../components/common/BrowseByStyle';
import HappyCustomers from '../components/home/HappyCustomers';
import Footer from '../components/common/Footer';

const Home = () => {
  const location = useLocation();

  // Route state listener for smooth scroll when coming back to Home Page
  useEffect(() => {
    if (location.state && location.state.targetId) {
      const targetElement = document.getElementById(location.state.targetId);
      if (targetElement) {
        setTimeout(() => {
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    }
  }, [location]);

  return (
    <div>
      <TopBanner />
      <Navbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Brands Section */}
      <div id="brands">
        <BrandsBanner />
      </div>

      {/* New Arrivals Section */}
      <div id="new-arrivals">
        <NewArrivals />
      </div>

      {/* On Sale / Top Selling Products Section */}
      <div id="on-sale">
        <ProductListSection />
      </div>

      {/* Shop / Browse By Style Section */}
      <div id="dress-style">
        <BrowseByStyle />
      </div>

      <HappyCustomers />
      <Footer />
    </div>
  );
};

export default Home;