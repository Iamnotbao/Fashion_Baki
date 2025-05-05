import React, { useState, useMemo, useEffect } from "react";
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  TablePagination,
  TableSortLabel,
  TextField,
  Modal,
  Typography,
  Button,
  Card,
  CardContent,
  Grid,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { format } from "date-fns";
import { FaEye, FaTimes } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { checkStatus } from "../../services/paymentServices";

const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const ModalContent = styled(Card)(({ theme }) => ({
  position: "relative",
  width: "80%",
  maxWidth: 800,
  maxHeight: "90vh",
  overflow: "auto",
  padding: "20px",
}));

const SearchContainer = styled(Box)(({ theme }) => ({
  marginBottom: "20px",
  display: "flex",
  gap: "16px",
}));

const OrderHistoryPage = ({orders}) => {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [orderBy, setOrderBy] = useState("id");
  const [order, setOrder] = useState("asc");
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const navigation = useNavigate();
  console.log(orderBy);

  
  

  const handleRequestSort = (property) => {
    const isAsc = orderBy === property && order === "asc";
    setOrder(isAsc ? "desc" : "asc");
    setOrderBy(property);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleOpenModal = (order) => {
    setSelectedOrder(order);
    setModalOpen(true);
  };
  
 

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedOrder(null);
  };

  const filteredOrders = orders.filter((order) => {
    const receiver = String(order.receiverName); 
    const totalPrice = String(order.totalPrice);
    return (
      receiver.toLowerCase().includes(search.toLowerCase()) || totalPrice.toLocaleLowerCase().includes(search.toLowerCase()) 
    );
  });
  
  const handleBuy = (id) => {
    navigation("/Fashion_Baki/product/" + id);
  };
  

  const sortedOrders = useMemo(() => {
    const comparator = (a, b) => {
      if (orderBy === "date") {
        // Ensure the date values are correctly compared as numbers (timestamps)
        return order === "asc"
          ? new Date(a.date).getTime() - new Date(b.date).getTime()
          : new Date(b.date).getTime() - new Date(a.date).getTime();
      }
  
      // Handle other attributes (strings or numbers)
      const aValue = a[orderBy];
      const bValue = b[orderBy];
  
      // Check if the values are strings before using localeCompare
      if (typeof aValue === "string" && typeof bValue === "string") {
        return order === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
  
      // For numbers or other values, just compare them numerically
      return order === "asc" ? aValue - bValue : bValue - aValue;
    };
  
    return [...filteredOrders].sort(comparator);
  }, [filteredOrders, order, orderBy]);

  const paginatedOrders = sortedOrders.slice(
    page * rowsPerPage,
    page * rowsPerPage + rowsPerPage
  );

  return (
    <Box sx={{ paddingBottom: "30px" }}>
      <SearchContainer>
        <TextField
          fullWidth
          label="Search by Order ID or Date"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          variant="outlined"
        />
      </SearchContainer>

      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "id"}
                  direction={orderBy === "id" ? order : "asc"}
                  onClick={() => handleRequestSort("id")}
                >
                  Order ID
                </TableSortLabel>
                
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "receiverName"}
                  direction={orderBy === "receiverName" ? order : "asc"}
                  onClick={() => handleRequestSort("receiverName")}
                >
                  Receiver Name
                </TableSortLabel>
              </TableCell>
              <TableCell>
                <TableSortLabel
                  active={orderBy === "date"}
                  direction={orderBy === "date" ? order : "asc"}
                  onClick={() => handleRequestSort("date")}
                >
                  Date
                </TableSortLabel>
              </TableCell>
              <TableCell>Total Amount</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedOrders.map((order) => (
              
              <TableRow key={order.id}>
                <TableCell>{order.id}</TableCell>
                <TableCell>{order.receiverName}</TableCell>
                <TableCell>{order.createAt.split("T")[0]}</TableCell>
                <TableCell>${(order.totalPrice).toFixed(2)}</TableCell>
                <TableCell>
                  <IconButton
                    color="primary"
                    onClick={() => handleOpenModal(order)}
                  >
                    <FaEye />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={filteredOrders.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />

      <StyledModal open={modalOpen} onClose={handleCloseModal}>
        <ModalContent>
          <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
            <Typography variant="h6">
              Order Details - {selectedOrder?.id}
            </Typography>
            <IconButton onClick={handleCloseModal}>
              <FaTimes />
            </IconButton>
          </Box>
          
          {selectedOrder && (
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="subtitle1">
                  Order Date: {selectedOrder.createAt.split("T")[0]}
                </Typography>
                <Typography variant="subtitle1">
                  Address: {selectedOrder.receiverAddress}
                </Typography>
                <Typography variant="subtitle1" gutterBottom >
                  Shipping Status:<span style={{paddingLeft:"2px",fontWeight:"bold", color:"red",margin:"0"}}>{selectedOrder.status}</span>
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                  Total Amount: ${selectedOrder.totalPrice.toFixed(2)}
                </Typography>
              </Grid>
              {selectedOrder.orderDetails.map((orderDetail) => (
                <Grid item xs={12} sm={6} md={4} key={orderDetail.id}>
                  <Card sx={{cursor:"pointer"}}>
                    <CardContent>
                      <Box
                        component="img"
                        src={orderDetail.product.image}
                        alt={orderDetail.product.name}
                        sx={{
                          width: "100%",
                          height: 200,
                          objectFit: "cover",
                          marginBottom: 2,
                        }}
                        
                      />
                      <Typography onClick ={()=>handleBuy(orderDetail.product.id)}  variant="h6">{orderDetail.product.name}</Typography>
                      <Typography>Quantity: {orderDetail.quantity}</Typography>
                      <Typography>Size: {orderDetail.size}</Typography>
                      <Typography>Payment Status: {selectedOrder.pstatus}</Typography>
                      <Typography>Price: ${orderDetail.product.price.toFixed(2)}</Typography>
                      <Typography>
                        Subtotal: ${(orderDetail.quantity * orderDetail.product.price).toFixed(2)}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          )}
        </ModalContent>
      </StyledModal>
    </Box>
  );
};

export default OrderHistoryPage;