import { useDispatch } from "react-redux";
import { fetchDiscountThunk } from "../../stores/discount";
const fetchDiscount = () => {
    const dispatch = useDispatch();
    const fetchDiscountCode=async(id)=>{
        dispatch(fetchDiscountThunk({id}));
    }
    return fetchDiscountCode;
}
 
export default fetchDiscount;