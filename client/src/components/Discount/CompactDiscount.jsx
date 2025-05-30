

import { useEffect, useState } from "react"
import SockJS from "sockjs-client"
import { Client } from "@stomp/stompjs"
import { Box, TextField, Button, Typography, Paper, CircularProgress, Chip, Dialog, DialogContent } from "@mui/material"
import LocalOfferIcon from "@mui/icons-material/LocalOffer"
import CheckCircleIcon from "@mui/icons-material/CheckCircle"
import ErrorIcon from "@mui/icons-material/Error"
import ListDiscount from "./ListDiscount"
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

export const CompactDiscount = ({ originalTotal, onDiscountApplied }) => {
  const [stompClient, setStompClient] = useState(null)
  const [discountCode, setDiscountCode] = useState("")
  const [originalPrice, setOriginalPrice] = useState(originalTotal || 0)
  const [discountedPrice, setDiscountedPrice] = useState(originalTotal || 0)
  const [listDiscount, setListDiscount] = useState(false)
  const [message, setMessage] = useState("")
  const [error, setError] = useState("")
  const [connected, setConnected] = useState(false)
  const [loading, setLoading] = useState(false)
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const user = JSON.parse(localStorage.getItem("user") || "{}")
  const userId = user.id ? String(user.id) : null

  const apiUrl = import.meta.env.VITE_API_URL;
  const websocketPath = import.meta.env.VITE_WEBSOCKET_PATH
  const url = new URL(apiUrl);
  url.pathname = websocketPath;
  const websocketUrl = url.toString();

  useEffect(() => {
    if (originalTotal !== undefined && originalTotal !== null) {
      setOriginalPrice(originalTotal)
      if (discountedPrice === originalPrice) {
        setDiscountedPrice(originalTotal)
      }
    }
  }, [originalTotal])

  useEffect(() => {
    const socket = new SockJS(websocketUrl)
    const client = new Client({
      webSocketFactory: () => socket,
      debug: (str) => console.log(str),
      reconnectDelay: 5000,
      heartbeatIncoming: 4000,
      heartbeatOutgoing: 4000,
    })

    client.onConnect = (frame) => {
      console.log("Connected to WebSocket:", frame)
      setConnected(true)
      setError("")
      client.subscribe("/topic/discount", (message) => {
        const response = JSON.parse(message.body)
        console.log("Received message:", response)

        const newOriginalPrice = response.originalPrice || originalPrice
        const newDiscountedPrice = response.discountedPrice || newOriginalPrice

        setOriginalPrice(newOriginalPrice)
        setDiscountedPrice(newDiscountedPrice)
        setMessage(response.message || "No message")
        setLoading(false)

        if (onDiscountApplied && typeof onDiscountApplied === "function") {
          onDiscountApplied({
            originalPrice: newOriginalPrice,
            discountedPrice: newDiscountedPrice,
            savings: newOriginalPrice - newDiscountedPrice,
          })
        }
      })
    }

    client.onStompError = (frame) => {
      console.error("STOMP error:", frame)
      setError(`WebSocket connection failed: ${frame.headers?.message || "Unknown error"}`)
      setConnected(false)
      setLoading(false)
    }

    client.onWebSocketError = (error) => {
      console.error("WebSocket error:", error)
      setError("WebSocket error occurred")
      setConnected(false)
      setLoading(false)
    }

    client.onWebSocketClose = () => {
      console.log("WebSocket closed")
      setError("WebSocket connection closed")
      setConnected(false)
    }

    client.activate()
    setStompClient(client)

    return () => {
      if (client) {
        client.deactivate()
        console.log("Disconnected from WebSocket")
      }
    }
  }, [])

  const applyDiscount = () => {
    if (!stompClient || !connected) {
      setError("Not connected to WebSocket")
      return
    }
    if (!userId) {
      setError("User ID is missing or invalid")
      return
    }
    setLoading(true)
    console.log("Sending payload:", { code: discountCode, userId })
    stompClient.publish({
      destination: "/app/apply-discount",
      body: JSON.stringify({ code: discountCode, userId }),
    })
  }
  const openListDiscount = () => { setListDiscount(true) }
  const closeListDiscount = () => { setListDiscount(false) }
  return (
    <Paper elevation={1} sx={{ p: 2, borderRadius: 1, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1.5 }}>
        <LocalOfferIcon sx={{ color: "orange", mr: 1, fontSize: 20 }} />
        <Typography variant="subtitle2" sx={{ fontWeight: "bold" }}>
          Apply Discount Code
        </Typography>
        <Button
          variant="contained"
          size="small"
          onClick={openListDiscount}
          disabled={!connected || !userId || loading}
          sx={{
            bgcolor: "black",
            "&:hover": { bgcolor: "grey" },
            minWidth: "80px",
            marginLeft: "10px"
          }}
        >
          Choose Apply Discount Code
        </Button>
      </Box>

      <Box sx={{ display: "flex", mb: 1.5 }}>
        <TextField
          size="small"
          fullWidth
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          placeholder="Enter discount code"
          sx={{ mr: 1 }}
        />
        <Button
          variant="contained"
          size="small"
          onClick={applyDiscount}
          disabled={!connected || !userId || loading}
          sx={{
            bgcolor: "orange",
            "&:hover": { bgcolor: "darkorange" },
            minWidth: "80px",
          }}
        >
          {loading ? <CircularProgress size={20} color="inherit" /> : "Apply"}
        </Button>
      </Box>

      {error && (
        <Box sx={{ display: "flex", alignItems: "center", color: "error.main", mb: 1 }}>
          <ErrorIcon sx={{ mr: 0.5, fontSize: 16 }} />
          <Typography variant="caption">{error}</Typography>
        </Box>
      )}

      {message && message !== "No message" && (
        <Box sx={{ display: "flex", alignItems: "center", color: "success.main", mb: 1 }}>
          <CheckCircleIcon sx={{ mr: 0.5, fontSize: 16 }} />
          <Typography variant="caption">{message}</Typography>
        </Box>
      )}
      {listDiscount && (
        <Dialog
          fullScreen={fullScreen}
          open={listDiscount}
          onClose={closeListDiscount}
          aria-labelledby="responsive-dialog-title"
        >
          <DialogContent>
            <ListDiscount  handleClose={closeListDiscount}/>
          </DialogContent>
        </Dialog>

      )}
    </Paper>
  )
}

export default CompactDiscount
