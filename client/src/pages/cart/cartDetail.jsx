import CartTable from "../../components/Order/CartTable";
import { useSelector } from 'react-redux';
import useFetchCart from '../../components/Cart/fetchCart';
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import RemoveCart from "../../components/Cart/removeCart";
import UpdateCart from "../../components/Cart/updateCart";
import ClearCart from "../../components/Cart/clearCart";
import DeleteIcon from '@mui/icons-material/Delete';

const CartDetail = () => {
    const { items, state, error } = useSelector((state) => state.cart);
    const [cartDetails, setCartDetails] = useState([]);
    const [loading, setLoading] = useState(false);
    const fetchCart = useFetchCart();
    const {removeCart} = RemoveCart();
    const {updateCart} = UpdateCart();
    const {clearCart} = ClearCart();
    const navigation = useNavigate();
    useEffect(() => {
        if (items.cartDetails) {
            setCartDetails(items.cartDetails);
        }
    }, [items]);
    useEffect(() => {
        fetchCart();
        setLoading(true)
    }, [loading]);
    const handleRemoveCart = (id) => {

        removeCart(id);
        setLoading(false);
    }
    const handleUpdateCart = (id, count) => {
        updateCart(id, count);
        setLoading(false);
    }
    const handleConfirm=()=>{
        navigation("/Fashion_Baki/product/order")
    }
    const handleClearCart =()=>{
        clearCart();
    }
    return (
        <section style={{padding:"30px 100px"}}>
            <h1 className="order-header" style={{ textAlign: "center", marginTop: "20px" }}>Cart Details</h1>
            <CartTable carts={cartDetails} changeQuantity={handleUpdateCart} handleRemove={handleRemoveCart} isDetail />
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginLeft: "auto",  width: "250px", marginTop: "20px" }}>
            <Button variant="contained" style={{backgroundColor:"red"}} onClick={handleClearCart} endIcon={<DeleteIcon />}>
                    Clear
                </Button>
                <Button variant="contained" onClick={handleConfirm} endIcon={<ShoppingCartIcon />}>
                    Purchase
                </Button>
            </div>
        </section>


    )
}
export default CartDetail;