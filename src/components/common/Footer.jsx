import React from "react";
import { Box, Typography, Container, Grid, InputBase, Button, IconButton } from "@mui/material";

// Inline SVG Icons
const MailIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="rgba(0,0,0,0.4)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
    <polyline points="22,6 12,13 2,6"></polyline>
  </svg>
);

const TwitterIconSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
  </svg>
);

const FacebookIconSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

const InstagramIconSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const GithubIconSVG = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

// Fixed Accurate SVG Payment Badges
const VisaSVG = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="30" rx="5" fill="#FFFFFF" />
    <path d="M19.1 19.3L20.8 9.1H23.5L21.8 19.3H19.1ZM28.5 9.3C28 9.1 27.2 8.9 26.2 8.9 C23.6 8.9 21.8 10.3 21.8 12.2 C21.8 13.6 23.1 14.4 24.1 14.9 C25.1 15.4 25.5 15.7 25.5 16.2 C25.5 16.9 24.6 17.2 23.8 17.2 C22.7 17.2 22.1 17 21.3 16.7L20.9 16.5L20.5 18.8 C21.2 19.1 22.4 19.3 23.6 19.3 C26.4 19.3 28.2 17.9 28.3 15.8 C28.3 14.7 27.6 13.9 26.1 13.2 C25.2 12.7 24.7 12.4 24.7 12 C24.7 11.6 25.2 11.2 26.1 11.2 C26.9 11.2 27.5 11.4 28 11.6L28.2 11.7L28.5 9.3ZM34.6 9.1H32.5 C31.9 9.1 31.4 9.3 31.1 9.9L27.2 19.3H30L30.6 17.7H34.1L34.4 19.3H36.9L34.6 9.1ZM31.3 15.6 C31.5 15.1 32.3 13 32.3 13 C32.3 13 32.5 12.5 32.6 12.1L32.8 13L33.4 15.6H31.3ZM16.8 9.1L14.2 19.3H16.9L19.5 9.1H16.8Z" fill="#1434CB" />
  </svg>
);

const MastercardSVG = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="30" rx="5" fill="#FFFFFF" />
    <circle cx="18" cy="15" r="7" fill="#EB001B" />
    <circle cx="28" cy="15" r="7" fill="#F79E1B" fillOpacity="0.9" />
    <path d="M23 10.4A6.98 6.98 0 0 0 20.2 15A6.98 6.98 0 0 0 23 19.6A6.98 6.98 0 0 0 25.8 15A6.98 6.98 0 0 0 23 10.4Z" fill="#FF5F00" />
  </svg>
);

const PaypalSVG = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="30" rx="5" fill="#FFFFFF" />
    <path d="M16 8H22C24.2 8 25.8 8.5 26.6 9.6 C27.3 10.6 27.5 12 27.1 13.7 C26.6 16.4 24.9 18 22.4 18H19.8L18.8 24H15.8L17.8 11.5L16 8Z" fill="#003087" />
    <path d="M18.5 11.5H24.5 C26.7 11.5 28.3 12 29.1 13.1 C29.8 14.1 30 15.5 29.6 17.2 C29.1 19.9 27.4 21.5 24.9 21.5H22.3L21.3 27.5H18.3L20.3 15L18.5 11.5Z" fill="#0079C1" fillOpacity="0.85" />
  </svg>
);

const ApplePaySVG = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="30" rx="5" fill="#FFFFFF" />
    <path d="M18.8 14.5 C18.7 13.4 19.3 12.4 19.9 11.8 C19.2 10.8 18.1 10.5 17.7 10.5 C16.7 10.4 15.7 11 15.2 11 C14.6 11 13.8 10.5 12.9 10.5 C11.8 10.5 10.7 11.1 10.1 12.1 C8.9 14.2 9.9 17.3 11 18.9 C11.6 19.8 12.2 20.7 13.1 20.7 C14 20.7 14.4 20.2 15.4 20.2 C16.4 20.2 16.7 20.7 17.7 20.7 C18.7 20.7 19.3 19.8 19.9 18.9 C20.6 17.9 20.9 16.9 20.9 16.8 C20.9 16.7 18.9 15.9 18.8 14.5Z" fill="#000000" />
    <path d="M17.4 9.8 C17.9 9.2 18.3 8.4 18.2 7.5 C17.4 7.5 16.5 8 16 8.6 C15.5 9.1 15.1 10 15.2 10.9 C16.1 11 16.9 10.4 17.4 9.8Z" fill="#000000" />
    <text x="22" y="19" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="11" fontWeight="bold" fill="#000000">Pay</text>
  </svg>
);

const GooglePaySVG = () => (
  <svg width="46" height="30" viewBox="0 0 46 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="46" height="30" rx="5" fill="#FFFFFF" />
    <text x="10" y="19.5" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="11" fontWeight="bold" fill="#4285F4">G</text>
    <text x="19" y="19.5" fontFamily="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" fontSize="11" fontWeight="bold" fill="#5F6368">Pay</text>
  </svg>
);

const footerLinks = [
  {
    title: "COMPANY",
    links: ["About", "Features", "Works", "Career"],
  },
  {
    title: "HELP",
    links: ["Customer Support", "Delivery Details", "Terms & Conditions", "Privacy Policy"],
  },
  {
    title: "FAQ",
    links: ["Account", "Manage Deliveries", "Orders", "Payments"],
  },
  {
    title: "RESOURCES",
    links: ["Free eBooks", "Development Tutorial", "How to - Blog", "Youtube Playlist"],
  },
];

const Footer = () => {
  return (
    <Box component="footer" sx={{ position: "relative", width: "100%", mt: { xs: 8, md: 10 } }}>
      {/* 1. FLOATING NEWSLETTER BANNER */}
      <Container maxWidth="lg" sx={{ position: "relative", zIndex: 2, mb: { xs: "-100px", sm: "-90px", md: "-75px" }, px: { xs: 2, sm: 3 } }}>
        <Box
          sx={{
            backgroundColor: "#000000",
            borderRadius: { xs: "14px", sm: "18px", md: "20px" },
            px: { xs: 2.5, sm: 4, md: 8 },
            py: { xs: 3, sm: 4, md: 4.5 },
            display: "flex",
            flexDirection: { xs: "column", md: "row" },
            justifyContent: "space-between",
            alignItems: "center",
            gap: { xs: 2.5, md: 3 },
            boxShadow: "0 10px 30px rgba(0,0,0,0.15)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "#FFFFFF",
              fontWeight: 900,
              fontFamily: "sans-serif",
              fontSize: { xs: "20px", sm: "28px", md: "36px" },
              lineHeight: 1.15,
              maxWidth: { xs: "100%", md: "550px" },
              textTransform: "uppercase",
              textAlign: { xs: "left", md: "left" },
              width: "100%",
            }}
          >
            STAY UPTO DATE ABOUT OUR LATEST OFFERS
          </Typography>

          <Box
            component="form"
            onSubmit={(e) => e.preventDefault()}
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1.5,
              width: { xs: "100%", md: "350px" },
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                backgroundColor: "#FFFFFF",
                borderRadius: "62px",
                px: 2,
                py: { xs: 0.8, sm: 1 },
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", mr: 1.5 }}>
                <MailIcon />
              </Box>
              <InputBase
                placeholder="Enter your email address"
                fullWidth
                sx={{
                  fontSize: { xs: "13px", sm: "14px" },
                  color: "#000000",
                  "& input::placeholder": {
                    color: "rgba(0,0,0,0.4)",
                    opacity: 1,
                  },
                }}
              />
            </Box>

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: "#FFFFFF",
                color: "#000000",
                borderRadius: "62px",
                py: { xs: 1, sm: 1.2 },
                fontSize: { xs: "13px", sm: "14px" },
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "none",
                "&:hover": {
                  backgroundColor: "#F0F0F0",
                  boxShadow: "none",
                },
              }}
            >
              Subscribe to Newsletter
            </Button>
          </Box>
        </Box>
      </Container>

      {/* 2. MAIN FOOTER CONTENT AREA */}
      <Box
        sx={{
          backgroundColor: "#F0F0F0",
          pt: { xs: 16, sm: 16, md: 15 },
          pb: 4,
          width: "100%",
        }}
      >
        <Container maxWidth="lg" sx={{ px: { xs: 2, sm: 3 } }}>
          <Grid container spacing={{ xs: 3, sm: 4 }}>
            {/* Brand Information */}
            <Grid item xs={12} md={4}>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 900,
                  fontSize: { xs: "24px", sm: "28px" },
                  color: "#000000",
                  mb: 1.5,
                  letterSpacing: "-0.5px",
                }}
              >
                SHOP.CO
              </Typography>
              <Typography
                sx={{
                  color: "rgba(0,0,0,0.6)",
                  fontSize: "14px",
                  lineHeight: 1.6,
                  mb: 2.5,
                  maxWidth: { xs: "100%", sm: "300px", md: "280px" },
                }}
              >
                We have clothes that suits your style and which you're proud to wear. From women to men.
              </Typography>

              <Box sx={{ display: "flex", gap: 1.5 }}>
                {[
                  { icon: <TwitterIconSVG />, key: "twitter" },
                  { icon: <FacebookIconSVG />, key: "facebook" },
                  { icon: <InstagramIconSVG />, key: "instagram" },
                  { icon: <GithubIconSVG />, key: "github" },
                ].map((item) => (
                  <IconButton
                    key={item.key}
                    sx={{
                      backgroundColor: "#FFFFFF",
                      color: "#000000",
                      border: "1px solid rgba(0,0,0,0.1)",
                      width: "28px",
                      height: "28px",
                      transition: "all 0.3s ease",
                      "&:hover": {
                        backgroundColor: "#000000",
                        color: "#FFFFFF",
                        borderColor: "#000000",
                      },
                    }}
                  >
                    {item.icon}
                  </IconButton>
                ))}
              </Box>
            </Grid>

            {/* Link Columns */}
            <Grid item xs={12} md={8}>
              <Grid container spacing={{ xs: 2, sm: 2 }}>
                {footerLinks.map((column, idx) => (
                  <Grid item xs={6} sm={3} key={idx}>
                    <Typography
                      sx={{
                        fontWeight: 700,
                        fontSize: { xs: "12px", sm: "14px" },
                        color: "#000000",
                        mb: { xs: 1.5, sm: 2.5 },
                        letterSpacing: "1.5px",
                        textTransform: "uppercase",
                      }}
                    >
                      {column.title}
                    </Typography>
                    <Box component="ul" sx={{ listStyle: "none", p: 0, m: 0 }}>
                      {column.links.map((link, linkIdx) => (
                        <Box component="li" key={linkIdx} sx={{ mb: { xs: 1, sm: 1.5 } }}>
                          <Typography
                            component="a"
                            href="#"
                            sx={{
                              color: "rgba(0,0,0,0.6)",
                              fontSize: { xs: "13px", sm: "14px" },
                              textDecoration: "none",
                              display: "inline-block",
                              position: "relative",
                              transition: "color 0.2s ease",
                              "&::after": {
                                content: '""',
                                position: "absolute",
                                width: "0%",
                                height: "2px",
                                bottom: "-2px",
                                left: "0",
                                backgroundColor: "#000000",
                                transition: "width 0.25s ease-in-out",
                              },
                              "&:hover": {
                                color: "#000000",
                                "&::after": {
                                  width: "100%",
                                },
                              },
                            }}
                          >
                            {link}
                          </Typography>
                        </Box>
                      ))}
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Grid>
          </Grid>

          <Box sx={{ borderTop: "1px solid rgba(0,0,0,0.1)", my: { xs: 3, sm: 4 } }} />

          {/* Bottom Row */}
          <Box
            sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },
              justifyContent: "space-between",
              alignItems: "center",
              gap: 2,
              textAlign: { xs: "center", sm: "left" },
            }}
          >
            <Typography sx={{ color: "rgba(0,0,0,0.6)", fontSize: { xs: "12px", sm: "13px" } }}>
              Shop.co © 2000-2023, All Rights Reserved
            </Typography>

            <Box sx={{ display: "flex", gap: 1, alignItems: "center", flexWrap: "wrap", justifyContent: "center" }}>
              <VisaSVG />
              <MastercardSVG />
              <PaypalSVG />
              <ApplePaySVG />
              <GooglePaySVG />
            </Box>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default Footer;