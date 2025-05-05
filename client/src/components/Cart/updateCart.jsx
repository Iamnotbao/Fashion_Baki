import { useDispatch } from "react-redux";
import { updateCartItemThunk } from "../../stores/cart";

const UpdateCart = () => {
    const dispatch = useDispatch();
    
    const updateCart = (productId,quantity) => {
        dispatch(updateCartItemThunk({productId,quantity}));
    };

    return {updateCart};
};

export default UpdateCart;