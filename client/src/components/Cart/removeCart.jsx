import { useDispatch } from "react-redux";
import { removeCartItemThunk } from "../../stores/cart";

const RemoveCart = () => {
    const dispatch = useDispatch();
    
    const removeCart = (productId) => {
        dispatch(removeCartItemThunk({productId}));
    };

    return {removeCart};
};

export default RemoveCart;