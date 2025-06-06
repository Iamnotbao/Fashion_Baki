import { useEffect, useState } from "react";
import fetchDiscount from "./FetchDiscount";
import { useSelector } from "react-redux";
import { Box, Typography, Chip, Card, CardContent, Tabs, Tab, Grid, Container, IconButton, Snackbar, Alert, Button  } from "@mui/material"
import { styled } from "@mui/material/styles"
import moment from "moment";
import { ContentCopy as ContentCopyIcon   } from '@mui/icons-material';
import { ArrowRightAlt as ArrowRightAltIcon   } from '@mui/icons-material';
import { Link } from "react-router-dom";
const CouponCard = styled(Card)(({ theme }) => ({
  border: "1px solid #333333",
  borderRadius: theme.spacing(1),
  position: "relative",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}))

const DiscountBadge = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg,rgba(255, 53, 63, 0.27) 0%, #333333 100%)",
  color: "white",
  padding: theme.spacing(1, 2),
  borderRadius: `${theme.spacing(1)} ${theme.spacing(1)} 0 0`,
  fontWeight: "bold",
  fontSize: "1.2rem",
}))

const ExpiresBadge = styled(Chip)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(1),
  backgroundColor: "#333333",
  color: "white",
  fontSize: "0.75rem",
}))

const CopySection = styled(IconButton)(({ theme }) => ({
  position: "absolute",
  top: theme.spacing(1),
  right: theme.spacing(14),
  backgroundColor: "#333333",
  color: 'white',
  '&:hover': {
    boxShadow: theme.shadows[4],
  }
}))

const ButtonTheme = styled(Button)(({ theme }) => ({
  padding: "2px 5px",
  border: "1px solid #333333",
  borderRadius: theme.spacing(1),
  backgroundColor: "#333333",
  color: "white",
  '&:hover': {
    boxShadow: theme.shadows[4],
    color: "black",
    backgroundColor: "white"
  },
  fontSize: "0.8rem",
  fontWeight: "bold"
}));

const ButtonGroup = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  marginBottom:"5px"
}));
const StyledLink = styled(Link)(({ theme }) => ({
  textDecoration: "none",
  color: "white",
  "&:hover": {
    color: "black",
  },
}));

const DiscountSection = () => {
  const fetchPromoteCode = fetchDiscount();
  const userId = localStorage.getItem("id");
  const [loading, setLoading] = useState(false);
  const { discounts } = useSelector((state) => state.discount);
  const [selectedCode, setSelectedCode] = useState(discounts[0]);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');



  const [tabValue, setTabValue] = useState(0)

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue)
  }
  useEffect(() => {
    if (!loading) {
      fetchCode();
    }
  }, [loading])

  const handleCopyCode = (code) => {
   

    setSelectedCode(code);
    if (selectedCode) {
      navigator.clipboard.writeText(selectedCode.discountCode.code)
        .then(() => {
          setSnackbarMessage('Discount code copied to clipboard!');
          setSnackbarOpen(true);
        })
        .catch(err => {
          console.error('Failed to copy code: ', err);
          setSnackbarMessage('Failed to copy code');
          setSnackbarOpen(true);
        });
    }
  };
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSnackbarOpen(false);
  };

  const fetchCode = async () => {
    await fetchPromoteCode(userId);
    setLoading(true);
  }
  return (

    <Box>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          onClose={handleSnackbarClose}
          severity="success"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
      <Container maxWidth="lg" sx={{ py: 1 }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab
              label="Unused Coupons"
              sx={{
                fontWeight: tabValue === 0 ? "bold" : "normal",
                textDecoration: tabValue === 0 ? "underline" : "none",
              }}
            />
            <Tab
              label="Expired Coupons"
              sx={{
                fontWeight: tabValue === 1 ? "bold" : "normal",
                color: "text.secondary",
              }}
            />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Grid container spacing={3}>
            {discounts.map((coupon, index) => (
              <Grid item xs={12} md={4} key={index}>
                <CouponCard>
                  <CopySection
                    size="small"
                    onClick={(coupon) => { handleCopyCode(coupon) }}
                  >
                    <ContentCopyIcon fontSize="small" />
                  </CopySection>
                  {!coupon.expired && <ExpiresBadge label="Expires Soon" size="small" />}
                  <DiscountBadge>{coupon.discountCode.percentage}% OFF</DiscountBadge>

                  <CardContent sx={{ pt: 2 }}>
                    <Typography variant="body1" gutterBottom>
                      Code: {coupon.discountCode.code}
                    </Typography>
                    <Box mt={1}>
                      <Typography variant="caption" color="text.secondary" display="block">
                        • Start from: {moment(coupon.discountCode.createdAt).format("DD/MM/YYYY")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        • Expire to: {coupon.discountCode.expirationDate ? moment(coupon.discountCode.expirationDate).format("DD/MM/YYYY") : ("Forever")}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" display="block">
                        • For All Products
                      </Typography>
                    </Box>
                  </CardContent>
                  <ButtonGroup>
                    <ButtonTheme><StyledLink to={"/"}>Use Now</StyledLink><ArrowRightAltIcon/></ButtonTheme>
                  </ButtonGroup>
                </CouponCard>
              </Grid>
            ))}
          </Grid>
        )}

        {tabValue === 1 && (
          <Box textAlign="center" py={4}>
            <Typography variant="body1" color="text.secondary">
              No expired coupons
            </Typography>
          </Box>
        )}
      </Container>
    </Box>
  )
}

export default DiscountSection;














