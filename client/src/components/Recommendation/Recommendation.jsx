import { useEffect, useState } from "react";
import CarouselProduct from "../Carousel/CarouselProduct";
import "./Recommendation.css"
import { GetAllRecommendation } from "../../services/recommendationServices";
const Recommendation = ({id}) => {
    const [productRecommendation, setproductRecommendation] = useState([]);
    
    useEffect(()=>{
        const fetchRecommendation =async()=>{
            const result = await GetAllRecommendation(id);
            if(result){
                setproductRecommendation(result);
            }
        }
        fetchRecommendation();

    },[id])
    return (<>
    <h3 className="recomment-title">RECOMMENDATION</h3>
     <div className="container">
        <div className="row">
            <div className="col-md-12">
                <CarouselProduct products={productRecommendation}/>
            </div>
        </div>
     </div>
     </>
    );
}
export default Recommendation;
   
