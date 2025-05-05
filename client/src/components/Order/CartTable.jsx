

import Table from "@mui/material/Table"
import TableBody from "@mui/material/TableBody"
import TableCell, { tableCellClasses } from "@mui/material/TableCell"
import TableContainer from "@mui/material/TableContainer"
import TableHead from "@mui/material/TableHead"
import TableRow from "@mui/material/TableRow"
import Paper from "@mui/material/Paper"
import { styled } from "@mui/material/styles"
import { useNavigate } from "react-router-dom"

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}))

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}))


function total(price, quantity) {
  return (price * quantity).toFixed(2)
}

const CartTable = ({ carts, changeQuantity, handleRemove, isDetail }) => {
  console.log(carts)
  const navigation = useNavigate()
  const handleDetail = (id) => {
    navigation("/Fashion_Baki/product/" + id)
  }
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="center">Image</StyledTableCell>
            <StyledTableCell align="center">Name</StyledTableCell>
            <StyledTableCell align="center">Color&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Size&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Price&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Quantity&nbsp;</StyledTableCell>
            {isDetail && <StyledTableCell align="center">Rating&nbsp;</StyledTableCell>}
            <StyledTableCell align="center">Total&nbsp;</StyledTableCell>
            <StyledTableCell align="center">Total&nbsp;</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {carts.map((row) => (
            <StyledTableRow style={{ cursor: "pointer" }} key={row.id}>
              <StyledTableCell align="center">
                <div style={{ width: "80px", height: "80px" }}>
                  <img
                    style={{ maxWidth: "100%", height: "100%" }}
                    src={row.product.image || "/placeholder.svg"}
                    alt={row.product.name}
                    loading="lazy"
                  />
                </div>
              </StyledTableCell>
              <StyledTableCell align="center" onClick={() => handleDetail(row.product.id)}>
                {row.product.name}
              </StyledTableCell>
              <StyledTableCell align="center" onClick={() => handleDetail(row.product.id)}>
                <div
                  style={{
                    backgroundColor: `${row.color}`,
                    height: "20px",
                    width: "40px",
                    borderRadius: "10px",
                    marginLeft: "auto",
                    marginRight: "auto",
                  }}
                ></div>
              </StyledTableCell>
              <StyledTableCell align="center" onClick={() => handleDetail(row.product.id)}>
                {row.size}
              </StyledTableCell>
              <StyledTableCell align="center">{row.product.price.toFixed(2)}$</StyledTableCell>
              <StyledTableCell align="center">
                <span style={{ margin: "0", paddingRight: "10px", fontWeight: "bold" }}>
                  <a onClick={() => changeQuantity(row.product.id, row.quantity - 1)} style={{ cursor: "pointer" }}>
                    -
                  </a>
                </span>
                {row.quantity}
                <span style={{ margin: "0", paddingLeft: "10px", fontWeight: "bold" }}>
                  <a style={{ cursor: "pointer" }} onClick={() => changeQuantity(row.product.id, row.quantity + 1)}>
                    +
                  </a>
                </span>
              </StyledTableCell>
              {isDetail && <StyledTableCell align="center">{row.product.rating}</StyledTableCell>}
              <StyledTableCell align="center" style={{ position: "relative" }}>
                {total(row.product.price, row.quantity)}$
              </StyledTableCell>
              <StyledTableCell align="center" style={{ position: "relative" }}>
                <a onClick={() => handleRemove(row.product.id)} style={{ cursor: "pointer" }}>
                  x
                </a>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default CartTable
