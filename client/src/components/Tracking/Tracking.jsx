import React, { useEffect, useState } from "react";
import { Box, Container, Typography, Grid, Card, CardContent, Stepper, Step, StepLabel, IconButton, Button, Chip, TextField, MenuItem, Accordion, AccordionSummary, AccordionDetails, useTheme, styled } from "@mui/material";
import { FaSearch, FaFilter, FaPrint, FaShoppingCart, FaHeadset, FaCheckCircle, FaSpinner, FaTruck } from "react-icons/fa";
import NoCrashIcon from '@mui/icons-material/NoCrash';
import { MdExpandMore } from "react-icons/md";
import { getAllOrderByUser } from "../../services/orderServices";
import { checkStatusShipping } from "../../services/shippingServices";

const StyledCard = styled(Card)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: theme.shadows[4]
  }
}));

const CustomStepIcon = ({ active, completed, icon, index, lastIndex }) => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        color: active || completed ? theme.palette.primary.main : theme.palette.text.disabled
      }}
    >
      {React.cloneElement(icon, {
        style: {
          fontSize: "24px",
          marginBottom: "4px"
        }
      })}
      {(active || completed) && (
        <Typography
          variant="caption"
          sx={{
            color: theme.palette.primary.main,
            fontWeight: "bold"
          }}
        >
          {active && index === lastIndex ? "Done" : "Completed"}
        </Typography>
      )}
    </Box>
  );
};

const Tracking = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [mockOrders, setMockOrders] = useState([]);
  const [expandedPanel, setExpandedPanel] = useState(null);
  const[loading,setLoading] = useState(false);
  console.log("after loading", mockOrders);


  useEffect(() => {
    if(!loading){
      const fetchOrder = async () => {
        const result = await getAllOrderByUser();
        if (result) {
          setMockOrders(result);
          setLoading(true);
        }
      };
      fetchOrder();
    }
  
  }, [loading]);

  const steps = [
    { label: "Order Placed", icon: <FaCheckCircle /> },
    { label: "Processing", icon: <FaSpinner /> },
    { label: "Shipping", icon: <FaTruck /> },
    { label: "Delivered", icon: <NoCrashIcon /> }
  ];

  const getCurrentStep = (status) => {
    switch (status) {
      case "ready to pick":
        return 0;
      case "picked":
        return 1;
      case "delivering":
        return 2;
      case "delivered":
        return 3;
      default:
        return 0;
    }
  };
  const getStatusShipping = async (orderID) => {
    const result = await checkStatusShipping(orderID);
    if(result === 200){
      setLoading(false);
    }
  }
  const getStatusColor = (status) => {
    const statusConfig = {
      picked: { color: "success", icon: <FaCheckCircle /> },
      delivering: { color: "warning", icon: <FaSpinner /> },
      delivered: { color: "info", icon: <FaTruck /> },
      default: { color: "default", icon: null }
    };
    return statusConfig[status] || statusConfig.default;
  };

  const filteredOrders = mockOrders
  // .filter(order => order.totalPrice.includes(searchTerm.toLowerCase()))
  // .filter(order => statusFilter === "all" || order.status === statusFilter);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ mb: 4, display: "flex", gap: 2, flexWrap: "wrap" }}>
        <TextField
          placeholder="Search orders..."
          variant="outlined"
          size="small"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: <FaSearch style={{ marginRight: 8 }} />
          }}
        />
        <TextField
          select
          variant="outlined"
          size="small"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="all">All Status</MenuItem>
          <MenuItem value="ready to pick">Pending</MenuItem>
          <MenuItem value="picked">Processing</MenuItem>
          <MenuItem value="delivering">Shipping</MenuItem>
          <MenuItem value="delivered">Completed</MenuItem>
        </TextField>
      </Box>

      {filteredOrders.length === 0 ? (
        <Box sx={{ textAlign: "center", py: 8 }}>
          <Typography variant="h6" gutterBottom>No Orders Found</Typography>
          <Button
            variant="contained"
            startIcon={<FaShoppingCart />}
            sx={{ mt: 2 }}
          >
            Shop Now
          </Button>
        </Box>
      ) : (
        filteredOrders.map((order) => {
          const currentStep = getCurrentStep(order.ghnStatus);
          return (
            <StyledCard key={order.id}>
              <Accordion expanded={expandedPanel === order.id}
                onChange={(event, isExpanded) => {
                  setExpandedPanel(isExpanded ? order.id : null);
                  if (isExpanded) {
                    getStatusShipping(order.id);
                  }
                }}>
                <AccordionSummary expandIcon={
                  <MdExpandMore />
                }>
                  <Grid container alignItems="center" spacing={2}>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="subtitle1">{order.id}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2">Order Date: {order.createAt}</Typography>
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Chip
                        icon={getStatusColor(order.ghnStatus).icon}
                        label={order.ghnStatus}
                        color={getStatusColor(order.ghnStatus).color}
                        size="small"
                      />
                    </Grid>
                    <Grid item xs={12} sm={3}>
                      <Typography variant="body2">
                        Total Price: ${order.totalPrice.toFixed(2)}
                      </Typography>
                    </Grid>
                  </Grid>
                </AccordionSummary>

                <AccordionDetails>
                  <Box sx={{ mb: 3 }}>
                    <Stepper activeStep={currentStep} alternativeLabel>
                      {steps.map((step, index) => (
                        <Step key={step.label} completed={index < currentStep} active={index === currentStep}>
                          <StepLabel
                            StepIconComponent={() => (
                              <CustomStepIcon
                                active={index === currentStep}
                                completed={index < currentStep}
                                icon={step.icon}
                                index={index}
                                lastIndex={getCurrentStep("delivered")}
                              />
                            )}
                          >
                            {step.label}
                          </StepLabel>
                        </Step>
                      ))}
                    </Stepper>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Shipping Details</Typography>
                      <Typography variant="body2">Shipping Code: {order.ghnOrderCode?order.ghnOrderCode:"Dont have Code"}</Typography>
                      <Typography variant="body2">Status: {order.ghnStatus}</Typography>
                      <Typography variant="body2">Payment Status: {order.pstatus}</Typography>
                      <Typography variant="body2">Name: {order.receiverName}</Typography>
                      <Typography variant="body2">Address: {order.receiverAddress}</Typography>
                      <Typography variant="body2">Phone: {order.receiverPhone}</Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <Typography variant="h6" gutterBottom>Order Summary</Typography>
                      {order.orderDetails.map((item, index) => (
                        <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                          <Box key={index} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
                            <div style={{ maxWidth: "50px", height: "60px" }}><img src={item.product.image} alt="" style={{ width: "100%", height: "100%" }} /></div>
                            <Box key={index} sx={{ display: "flex", flexDirection: "column", justifyContent: "space-between", ml: 1 }}>
                              <Typography variant="body2">
                                {item.product.name}
                              </Typography>
                              <Typography variant="body2">
                                <span style={{ margin: "0" }}>{item.size}</span><span>/</span><span style={{ textTransform: "uppercase" }} >{item.color}</span>
                              </Typography>
                              <Typography variant="body2">
                                Qty:{item.quantity}
                              </Typography>
                            </Box>
                          </Box>
                          <Typography variant="body2">
                            ${item.price.toFixed(2)}
                          </Typography>
                        </Box>
                      ))}
                      <Box sx={{ mt: 2, display: "flex", gap: 1 }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaShoppingCart />}
                        >
                          Reorder
                        </Button>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<FaHeadset />}
                        >
                          Support
                        </Button>
                        <IconButton size="small" color="primary">
                          <FaPrint />
                        </IconButton>
                      </Box>
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            </StyledCard>
          );
        })
      )}
    </Container>
  );
};

export default Tracking;