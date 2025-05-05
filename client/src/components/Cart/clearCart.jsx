import { useDispatch } from "react-redux";
import { clearCartItemThunk } from "../../stores/cart";
import { useNavigate } from "react-router-dom";

const ClearCart = () => {
    const dispatch = useDispatch();
    const navigation = useNavigate();
    const clearCart =() => {
        dispatch(clearCartItemThunk());
        navigation("/Fashion_Baki/");
    };
    return {clearCart};
};

export default ClearCart;