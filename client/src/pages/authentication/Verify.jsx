
import axios from 'axios'
import { useState } from "react"
import { useLocation, useNavigate } from "react-router-dom"
import "./Verify.css"
import { verifyPassword, verifyUser } from "../../services/authenticationServices"
const Verify = () => {
    const baseURL = "/api/auth/verify"
    const [key, setKey] = useState(null);
    const navigation = useNavigate();
    const email = localStorage.getItem("email");
    const location = useLocation();
    const { functionName } = location.state || {};
    console.log("check method in verify",functionName);
    console.log(key);
    
    



    const handleVerification = async () => {
        if (functionName === "account") {
            try {
                const response = await verifyUser(key.value);
                if (response) {
                    navigation("/Fashion_Baki/authentication/signIn");
                }

            } catch (error) {
                console.log(error);

            }
        }
        else {
            try {
                const response = await verifyPassword(key.value);
                if (response) {
                    navigation("/Fashion_Baki/authentication/reset_password");
                }
            } catch (error) {
                console.log(error);

            }
        }

    }


    const handleInput = (event) => {
        event.preventDefault();
        const value = event.target.value;
        if (value !== null) {
            setKey({ ...key, value })
        }
    }

    return (<>
        <div class="container height-100 d-flex justify-content-center align-items-center">
            <div class="position-relative">
                <div class="card p-2 text-center">
                    <h6>Please enter the one time password <br /> to verify your account
                    </h6>
                    <div>
                        <span>A code has been sent to </span>
                        <small>{email}</small>
                    </div>
                    <div id="otp" class="inputs d-flex flex-row justify-content-center mt-2">
                        <textarea onChange={(event) => { handleInput(event) }} class="m-2 text-center form-control rounded" type="text" id="first" maxlength="100" />
                    </div>
                    <div class="mt-4">
                        <button onClick={handleVerification} class="btn btn-danger px-4 validate">Validate</button>
                    </div>
                </div>
                <div class="card-2">
                    <div class="content d-flex justify-content-center align-items-center">
                        <span>Didn't get the code</span>
                        <a href="#" class="text-decoration-none ms-3">Resend(1/3)</a>
                    </div>
                </div>
            </div>
        </div>
    </>)
}
export default Verify;