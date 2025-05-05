import axios from "axios";
import { useEffect } from "react";
import HomeBanner from "../../sections/HomeBanner/HomeBanner";
import HomeBrand from "../../sections/HomeBrand/HomeBrand";
import HomeCategory from "../../sections/HomeCategory/HomeCategory";
import HomeProduct from "../../sections/HomeProduct/HomeProduct";
import HomeSubCategory from "../../sections/HomeSubCategory/HomeSubCategory";
// import Testimonial from "../../sections/Testimonial/Testimonial";
import Benefits from "../../sections/Benefit/Benefit";
import Feature from "../../sections/Feature/Feature";
// import Promotion from "../../sections/Promotion/Promotion";
import About from "../../sections/About/About";
import Instagram from "../../sections/Instagram/Instagram";

const Main =()=>{
    useEffect(()=>{
        const check =async()=>{
            const c = await axios.get("/api/auth/check-session",{
                headers: {
                  "Content-Type": "application/json"
                },
                withCredentials: true
              
            })
            console.log(c);
            
        }
        check();
    },[])
    return(
            <section className="main">
                <HomeBanner/>
                {/* <HomeProduct/> */}
                <HomeCategory eachBanner={false}/>
                {/* <HomeSubCategory/> */}
                {/* <HomeBrand/> */}
                <About/>
                {/* <Testimonial/> */}
                <Feature/>
                <Benefits/>
                {/* <Promotion/> */}
                <Instagram/>
               
            </section>
    )
}
export default Main;