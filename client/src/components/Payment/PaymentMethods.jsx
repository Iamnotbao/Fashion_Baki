import { Box, Grid, TextField, Button } from "@mui/material";
import { useState } from "react";
import { CreditCard, AtSignIcon as ATMIcon } from "lucide-react";
import "./PaymentMethods.css";
import Momo from "../../assets/images/payment/Momo.png";
import Visa from "../../assets/images/payment/Visa.png";
import ATM from "../../assets/images/payment/ATM.png";


const paymentMethods = [
  { id: "momo", name: "Momo", icon: Momo },
  { id: "cod", name: "COD", icon: ATM },
  { id: "visa", name: "Visa", icon: Visa },
];

export default function PaymentMethods({handlePaymentMethod}) {
  const [selectedMethod, setSelectedMethod] = useState("momo");
  handlePaymentMethod(selectedMethod);
  return (
    <div className="payment-container">
      <Box className="payment-methods-grid">
        {paymentMethods.map((method) => (
          <Box key={method.id} className="payment-method-container">
            <input
              type="radio"
              id={method.id}
              name="paymentMethod"
              value={method.id}
              checked={selectedMethod === method.id}
              onChange={() => setSelectedMethod(method.id)}
              className="payment-method-input"
            />
            <label htmlFor={method.id} className="payment-method-label">
              <img src={method.icon} className="payment-method-icon" />
              <span className="payment-method-text">{method.name}</span>
            </label>
          </Box>
        ))}
      </Box>

      <Box className="payment-details">
        {/* {selectedMethod === "momo" && (
          <Grid container spacing={2}>
             <Grid item xs={12}>
              <TextField
                fullWidth
                type="tel"
                label="Momo Number"
                variant="outlined"
                required
                name="momoNumber"
              />
            </Grid> 
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Pay with Momo
              </Button>
            </Grid>
          </Grid>
        )} */}

        {/* {selectedMethod === "atm" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                required
                name="cardNumber"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MM/YY"
                variant="outlined"
                required
                name="expiryDate"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                required
                name="cvv"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Pay with ATM
              </Button>
            </Grid>
          </Grid>
        )} */}

        {selectedMethod === "visa" && (
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Card Number"
                variant="outlined"
                required
                name="cardNumber"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="MM/YY"
                variant="outlined"
                required
                name="expiryDate"
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                fullWidth
                label="CVV"
                variant="outlined"
                required
                name="cvv"
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Cardholder Name"
                variant="outlined"
                required
                name="cardholderName"
              />
            </Grid>
            <Grid item xs={12}>
              <Button variant="contained" color="primary" fullWidth>
                Pay with Visa
              </Button>
            </Grid>
          </Grid>
        )}
      </Box>
    </div>
  );
}
