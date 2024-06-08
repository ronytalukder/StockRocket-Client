import { useState } from "react";
import { toast } from "react-toastify";
import VerificationInput from "react-verification-input";
import { useNavigate } from "react-router-dom";
import { VerifyOTPRequest } from "../../API/UsersAPIRequest";
import { getEmail } from "../../helper/SessionHelper";


const OtpVerify = () => {
    let [ otp, setOtp ] = useState("");
    let [otpError, setOtpError] = useState("");

    const navigate = useNavigate();

    const handleVerifyOtp = async() => {
            if (otp.length===6) {
                // console.log(otp)

                const result = await VerifyOTPRequest(getEmail(), otp);
                if(result=== true){
                    toast.success("OTP verified successfully");
                    navigate("/create-new-password");
                    setOtp("");
                }
                else{
                    setOtpError("Please enter a valid OTP");
                    toast.error("Please enter a valid OTP");
                }
            } 
            else {
                setOtpError("Please enter a valid OTP");
                toast.error("Please enter a valid OTP");
            }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[400px] p-10 bg-purple-500 mx-auto rounded-lg shadow-lg ">
                <h1 className="text-lg font-bold mb-2">Verify OTP</h1>
                <VerificationInput onChange={(e) => setOtp(e)} validChars="0-9" fields={6} />
                {otpError&& <p className="text-red-500 font-bold my-2">{otpError}</p>}
                <button  onClick={handleVerifyOtp}  className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg w-full" >  Send  </button>
            </div>
        </div>
    );
};

export default OtpVerify;