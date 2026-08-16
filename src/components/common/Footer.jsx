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

// Accurate SVG Payment Badges
const VisaSVG = () => (
  <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
    <rect width="36" height="24" rx="4" fill="#FFFFFF" />
    <path d="M15.418 15.867l1.455-8.868h2.327l-1.456 8.868h-2.326zm8.125-8.66c-.461-.173-1.182-.36-2.079-.36-2.292 0-3.906 1.196-3.918 2.903-.021 1.264 1.151 1.968 2.031 2.39 0.903.435 1.207.714 1.203 1.103-.008.597-.732.871-1.408.871-0.938 0-1.439-.138-2.203-.467l-.307-.144-.33 2.008c.552.249 1.57.464 2.626.475 2.48 0 4.088-1.2 4.108-3.053.013-.96-.583-1.693-1.865-2.296-.777-.384-1.253-.642-1.249-1.033 0-.348.397-.708 1.258-.708.718-.014 1.24.152 1.64.321l.197.091.306-1.899zm5.352-.208h-1.8c-.558 0-.977.159-1.222.733l-3.468 8.135h2.449s.4-.108.49-.351c.09-.243.09-.243.09-.243h3.033s.071.312.288.594h2.158l-1.93-8.868zm-2.827 5.922l.942-2.502c-.013.023.193-.526.312-.861l.16.78 0.548 2.583h-1.962zm-15.89-5.922l-2.28 8.868h2.428l2.28-8.868h-2.428z" fill="#1434CB" />
  </svg>
);

const MastercardSVG = () => (
  <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
    <rect width="36" height="24" rx="4" fill="#FFFFFF" />
    <circle cx="13.5" cy="12" r="6.5" fill="#EB001B" />
    <circle cx="22.5" cy="12" r="6.5" fill="#F79E1B" opacity="0.9" />
    <path d="M18 7.182a6.48 6.48 0 00-2.5 4.818 6.48 6.48 0 002.5 4.818 6.48 6.48 0 002.5-4.818A6.48 6.48 0 0018 7.182z" fill="#FF5F00" />
  </svg>
);

const PaypalSVG = () => (
  <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
    <rect width="36" height="24" rx="4" fill="#FFFFFF" />
    <path d="M12.5 6h4.8c1.8 0 3.2.4 3.9 1.3.6.8.8 1.9.5 3.3-.4 2.2-1.8 3.5-3.8 3.5h-2.1l-.8 4.9h-2.5l2-13z" fill="#003087" />
    <path d="M14.5 9h4.8c1.8 0 3.2.4 3.9 1.3.6.8.8 1.9.5 3.3-.4 2.2-1.8 3.5-3.8 3.5h-2.1l-.8 4.9h-2.5l2-13z" fill="#0079C1" opacity="0.8" />
  </svg>
);

const ApplePaySVG = () => (
  <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
    <rect width="36" height="24" rx="4" fill="#FFFFFF" />
    <path d="M13.2 11.2c-.1-.9.4-1.7.9-2.2-.6-.8-1.5-1-1.8-1-.8-.1-1.6.4-2 .4-.5 0-1.1-.4-1.8-.4-.9 0-1.8.5-2.3 1.3-1 1.7-.2 4.2.7 5.6.5.7 1 1.4 1.7 1.4.7 0 1-.4 1.8-.4.8 0 1 .4 1.8.4.8 0 1.3-.7 1.8-1.4.6-.8.8-1.6.8-1.7 0-.1-.8-.3-.9-1.4zM12.1 7.4c.4-.5.7-1.1.6-1.8-.6 0-1.3.4-1.7.9-.4.4-.7 1.1-.6 1.8.7.1 1.3-.4 1.7-.9z" fill="#000" />
    <text x="16.5" y="14" fontFamily="sans-serif" fontSize="6.5" fontWeight="bold" fill="#000">Pay</text>
  </svg>
);

const GooglePaySVG = () => (
  <svg width="32" height="20" viewBox="0 0 36 24" fill="none">
    <rect width="36" height="24" rx="4" fill="#FFFFFF" />
    <text x="7" y="14.5" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#4285F4">G</text>
    <text x="13.5" y="14.5" fontFamily="sans-serif" fontSize="7" fontWeight="bold" fill="#5F6368">Pay</text>
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
            justify: "space-between",
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
                              transition: "all 0.2s ease",
                              "&:hover": {
                                color: "#000000",
                                textDecoration: "underline",
                                textUnderlineOffset: "3px",
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