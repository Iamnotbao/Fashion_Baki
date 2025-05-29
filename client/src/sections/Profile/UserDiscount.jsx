import { useEffect, useState } from "react";
import fetchDiscount from "../../components/Discount/FetchDiscount";
import { useSelector } from "react-redux";

const UserDiscount = () => {
    const fetchPromoteCode = fetchDiscount();
    const userId= localStorage.getItem("id");
    const [loading, setLoading] = useState(false);
    const {discounts} = useSelector((state)=>state.discount);
    console.log("after reux discount :", discounts);
    
    useEffect(()=>{
        if(!loading){
            fetchCode();
        }
    },[loading])

    const fetchCode =async()=>{
        await fetchPromoteCode(userId);
        setLoading(true);
    }


    
    return ( <>
    
    </> );
}
 
export default UserDiscount;







"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Box, Typography, Chip, Card, CardContent, Tabs, Tab, Grid, Container, Paper, Divider } from "@mui/material"
import { styled } from "@mui/material/styles"

const PromoBar = styled(Paper)(({ theme }) => ({
  background: "linear-gradient(135deg, #ff6b6b 0%, #ff8e8e 100%)",
  color: "white",
  padding: theme.spacing(2),
  borderRadius: 0,
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: theme.spacing(2),
}))

const CouponCard = styled(Card)(({ theme }) => ({
  border: "2px solid #ffebcc",
  borderRadius: theme.spacing(1),
  position: "relative",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
}))

const DiscountBadge = styled(Box)(({ theme }) => ({
  background: "linear-gradient(135deg, #ff6b35 0%, #ff8e53 100%)",
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
  backgroundColor: "#ffebcc",
  color: "#ff6b35",
  fontSize: "0.75rem",
}))

const CountdownTimer = () => {
  const [time, setTime] = useState({
    hours: 1,
    minutes: 13,
    seconds: 50,
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTime((prevTime) => {
        let { hours, minutes, seconds } = prevTime

        if (seconds > 0) {
          seconds--
        } else if (minutes > 0) {
          minutes--
          seconds = 59
        } else if (hours > 0) {
          hours--
          minutes = 59
          seconds = 59
        }

        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <Box display="flex" alignItems="center" gap={1}>
      <Typography variant="body2" sx={{ mr: 1 }}>
        {String(time.hours).padStart(2, "0")} H {String(time.minutes).padStart(2, "0")} M{" "}
        {String(time.seconds).padStart(2, "0")} S
      </Typography>
    </Box>
  )
}

// const DiscountSection = () => {
//   const [tabValue, setTabValue] = useState(0)

//   const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
//     setTabValue(newValue)
//   }

//   const coupons = [
//     {
//       discount: "15% OFF",
//       minOrder: "US$6.00",
//       code: "XSE1",
//       validDate: "30/06/2021 15:30 - 07/07/2021 15:30",
//       forAllProducts: true,
//       expiresSoon: true,
//     },
//     {
//       discount: "20% OFF",
//       minOrder: "US$99.00",
//       code: "XSE2",
//       validDate: "30/06/2021 15:30 - 07/07/2021 15:30",
//       forAllProducts: true,
//       expiresSoon: true,
//     },
//     {
//       discount: "10% OFF",
//       minOrder: "US$49.00",
//       code: "SHEV10",
//       validDate: "28/06/2021 11:01 - 28/07/2021 11:01",
//       forAllProducts: true,
//       expiresSoon: false,
//     },
//   ]

//   return (
//     <Box>
//       {/* Promotional Banner */}
//       <PromoBar elevation={0}>
//         <Box display="flex" alignItems="center" gap={3} flexWrap="wrap">
//           <Typography variant="h6" fontWeight="bold">
//             10% OFF on Orders of $29+
//           </Typography>
//           <Divider orientation="vertical" flexItem sx={{ borderColor: "rgba(255,255,255,0.3)" }} />
//           <Typography variant="h6" fontWeight="bold">
//             15% OFF on Orders of $69+
//           </Typography>
//           <Chip
//             label="Code: MAJORSALE21"
//             sx={{
//               backgroundColor: "white",
//               color: "#ff6b6b",
//               fontWeight: "bold",
//             }}
//           />
//         </Box>
//         <CountdownTimer />
//       </PromoBar>

//       {/* Coupons Section */}
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Typography variant="h4" fontWeight="bold" mb={3} textAlign="center">
//           MY COUPONS
//         </Typography>

//         <Box sx={{ borderBottom: 1, borderColor: "divider", mb: 3 }}>
//           <Tabs value={tabValue} onChange={handleTabChange}>
//             <Tab
//               label="Unused Coupons"
//               sx={{
//                 fontWeight: tabValue === 0 ? "bold" : "normal",
//                 textDecoration: tabValue === 0 ? "underline" : "none",
//               }}
//             />
//             <Tab
//               label="Expired Coupons"
//               sx={{
//                 fontWeight: tabValue === 1 ? "bold" : "normal",
//                 color: "text.secondary",
//               }}
//             />
//           </Tabs>
//         </Box>

//         {tabValue === 0 && (
//           <Grid container spacing={3}>
//             {coupons.map((coupon, index) => (
//               <Grid item xs={12} md={4} key={index}>
//                 <CouponCard>
//                   {coupon.expiresSoon && <ExpiresBadge label="Expires Soon" size="small" />}

//                   <DiscountBadge>{coupon.discount}</DiscountBadge>

//                   <CardContent sx={{ pt: 2 }}>
//                     <Typography variant="body1" gutterBottom>
//                       For orders over {coupon.minOrder}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       Code: {coupon.code}
//                     </Typography>

//                     <Box mt={2}>
//                       <Typography variant="caption" color="text.secondary" display="block">
//                         • {coupon.validDate}
//                       </Typography>
//                       <Typography variant="caption" color="text.secondary" display="block">
//                         • For All Products
//                       </Typography>
//                     </Box>
//                   </CardContent>
//                 </CouponCard>
//               </Grid>
//             ))}
//           </Grid>
//         )}

//         {tabValue === 1 && (
//           <Box textAlign="center" py={4}>
//             <Typography variant="body1" color="text.secondary">
//               No expired coupons
//             </Typography>
//           </Box>
//         )}
//       </Container>
//     </Box>
//   )
// }

// export default DiscountSection
