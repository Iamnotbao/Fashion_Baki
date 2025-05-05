"use client"
import PropTypes from "prop-types"
import Grid from "@mui/material/Grid"
import TextField from "@mui/material/TextField"
import Button from "@mui/material/Button"
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart"
import { useState, useEffect } from "react"
import { chekOutOrder } from "../../services/orderServices"
import DeleteIcon from "@mui/icons-material/Delete"
import UpdateCart from "../../components/Cart/updateCart"
import RemoveCart from "../../components/Cart/removeCart"
import { ToastContainer, toast } from "react-toastify"
import Box from "@mui/material/Box"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import useFetchCart from "../../components/Cart/fetchCart"
import CartTable from "../../components/Order/CartTable"
import PaymentMethods from "../../components/Payment/PaymentMethods"
import { fetchUser } from "../../services/userServices"
import { payOrder } from "../../services/paymentServices"
import { createShipping } from "../../services/shippingServices"
import CompactDiscount from "../../components/Discount/CompactDiscount"
import { Paper, Typography } from "@mui/material"

function Item(props) {
  const { sx, ...other } = props
  return (
    <Box
      sx={[
        {
          bgcolor: "#fff",
          color: "grey.800",
          p: 1,
          m: 1,
          borderRadius: 2,
          fontSize: "0.875rem",
          fontWeight: "700",
        },
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
      {...other}
    />
  )
}
Item.propTypes = {
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object, PropTypes.bool])),
    PropTypes.func,
    PropTypes.object,
  ]),
}

const Order = () => {
  const { items } = useSelector((state) => state.cart)
  const [cartDetails, setCartDetails] = useState([])
  const [loading, setLoading] = useState(false)
  const navigation = useNavigate()
  const fetchCart = useFetchCart()
  const { updateCart } = UpdateCart()
  const { removeCart } = RemoveCart()
  const [order, setOrder] = useState([])
  const [completedOrder, setCompletedOrder] = useState(null)
  const [user, setUser] = useState([])
  const [paymentMethod, setPaymentMethod] = useState("ATM")
  const [cartTotal, setCartTotal] = useState(0)
  const [finalTotal, setFinalTotal] = useState(0)
  const [discountSavings, setDiscountSavings] = useState(0)
  const [hasDiscount, setHasDiscount] = useState(false)

  // Calculate cart total
  useEffect(() => {
    if (cartDetails && cartDetails.length > 0) {
      const total = cartDetails.map((item) => item.product.price * item.quantity).reduce((sum, i) => sum + i, 0)
      setCartTotal(total)
      setFinalTotal(total) // Initialize final total with cart total
    }
  }, [cartDetails])

  // Handle discount application
  const handleDiscountApplied = (discountInfo) => {
    setFinalTotal(discountInfo.discountedPrice)
    setDiscountSavings(discountInfo.savings)
    setHasDiscount(discountInfo.savings > 0)
  }

  useEffect(() => {
    if (completedOrder != null && paymentMethod === "momo") {
      const payByMomo = async () => {
        const response = await payOrder(completedOrder)
        window.location.href = response.payUrl
        const result = await createShipping(completedOrder)
        console.log("go", result)
      }
      payByMomo()
    }
  }, completedOrder)

  useEffect(() => {
    const fetchData = async () => {
      const user = await fetchUser()
      setOrder({ receiverName: user.username, receiverAddress: user.address, receiverPhone: user.phone })
    }
    fetchData()
  }, [])

  useEffect(() => { }, [order])
  useEffect(() => {
    fetchCart()
    setLoading(true)
  }, [loading])

  useEffect(() => {
    if (items.cartDetails) {
      setCartDetails(items.cartDetails)
    }
  }, [items])

  const handleCancel = () => {
    navigation("/Fashion_Baki")
  }

  const handleRemoveCart = (id) => {
    removeCart(id)
    setLoading(false)
  }

  const handleOrder = async () => {
    try {
  
      const orderWithTotal = {
        ...order,
        totalAmount: finalTotal,
      }

      localStorage.setItem("orderId", order.id)
      const response = await chekOutOrder(orderWithTotal)
      console.log("check orders", response)
      if (response) {
        toast.success("PAY SUCCESSFULLY!!!")
        setCompletedOrder(response.orderId)
        setLoading(false)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    switch (paymentMethod) {
      case "momo":
        handleOrder()
        break
      case "cod":
        handleOrder()
        break
      default:
        handleOrder()
    }
  }

  const handlePaymentMethod = (method) => {
    setPaymentMethod(method)
  }
  const handleUpdateCart = (id, count) => {
    updateCart(id, count)
    setLoading(false)
  }
  const handleInputChange = (event) => {
    const { name, value } = event.target
    setOrder({ ...order, [name]: value })
  }

  return (
    <div style={{ width: "100%" }}>
      <ToastContainer />
      <Box sx={{ display: "grid", gridTemplateColumns: "repeat(1, 1fr)", marginLeft: "auto" }}>
        <Item>
          <Box sx={{ width: "90%", marginLeft: "auto", marginRight: "auto" }}>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
              <Grid item xs={6}>
                <Item>
                  <h1 className="order-header" style={{ textAlign: "left", marginTop: "20px" }}>
                    Order Information
                  </h1>
                  <Box
                    component="form"
                    sx={{ "& .MuiTextField-root": { m: 1, width: "100%" } }}
                    noValidate
                    autoComplete="off"
                  >
                    <Grid container spacing={2}>
                      <Grid item xs={12}>
                        <TextField
                          fullWidth
                          required
                          id="outlined-required"
                          label="Receiver"
                          placeholder="Receiver..."
                          name="receiverName"
                          value={order.receiverName}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          required
                          id="outlined-required"
                          label="Address"
                          placeholder="Address..."
                          name="receiverAddress"
                          value={order.receiverAddress}
                          onChange={handleInputChange}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          required
                          id="outlined-required"
                          label="Phone"
                          placeholder="Phone..."
                          name="receiverPhone"
                          value={order.receiverPhone}
                          onChange={handleInputChange}
                        />
                      </Grid>
                    </Grid>
                  </Box>
                </Item>
                <Item>
                  <h1 className="order-header" style={{ textAlign: "left", marginTop: "20px" }}>
                    Payment Method
                  </h1>
                  <Box>
                    <PaymentMethods handlePaymentMethod={handlePaymentMethod} />
                  </Box>
                </Item>
              </Grid>
              <Grid item xs={6}>
                {cartDetails && (
                  <>
                    <h1 className="order-header" style={{ textAlign: "left", marginTop: "20px" }}>
                      Cart Information
                    </h1>
                    <CartTable carts={cartDetails} changeQuantity={handleUpdateCart} handleRemove={handleRemoveCart} />

                    <Box sx={{ mt: 2 }}>
                      <CompactDiscount originalTotal={cartTotal} onDiscountApplied={handleDiscountApplied} />
                    </Box>
                    <Paper elevation={2} sx={{ mt: 3, p: 2, borderRadius: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: hasDiscount ? "space-between" : "flex-end",
                          alignItems: "center",
                        }}
                      >
                        {hasDiscount && (
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <Typography variant="body2" sx={{ color: "text.secondary", mr: 2 }}>
                              <b>Original: <span style={{ textDecoration: "line-through" }}>${cartTotal.toFixed(2)}</span></b>
                            </Typography>
                            <Typography variant="body2" sx={{ color: "success.main" }}>
                              <b>You save: ${discountSavings.toFixed(2)}</b>
                            </Typography>
                          </Box>
                        )}
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: "bold", mr: 2 }}>
                            FINAL TOTAL:
                          </Typography>
                          <Typography variant="h6" sx={{ fontWeight: "bold", color: "orange" }}>
                            ${finalTotal.toFixed(2)}
                          </Typography>
                        </Box>


                      </Box>
                    </Paper>
                  </>
                )}
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginLeft: "auto",
                    marginRight: "40px",
                    width: "250px",
                    marginTop: "20px",
                  }}
                >
                  <Button variant="outlined" startIcon={<DeleteIcon />} onClick={handleCancel}>
                    Cancel
                  </Button>
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "orange" }}
                    onClick={handleSubmit}
                    endIcon={<ShoppingCartIcon />}
                  >
                    Check Out
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Box>
        </Item>
      </Box>
    </div>
  )
}

export default Order
