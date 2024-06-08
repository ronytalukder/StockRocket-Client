import { useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { RecoverVerifyEmailRequest } from "../../API/UsersAPIRequest";


const ForgotPassword = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const handleEmailChange = (e) => {
        // setError("");
        const inputEmail = e.target.value;
        setEmail(inputEmail);
        if (!validateEmail(inputEmail)) {
            setError("Please enter a valid email");
        } else {
            setError("");
        }
    };

    const handleSendEmailAndOTP =  async() => {
        
        if (!email) {
            setError("Please enter your email");
        }
        else if (!validateEmail(email)) {
            setError("Please enter a valid email");
        } 
        else {
        setLoading(true);
        const result = await RecoverVerifyEmailRequest(email)
        if(result===true){
            setLoading(false);
            navigate("/verify-otp");
        }
        else{
            setLoading(false);
            setError("User Not Found");
        }
        }
    };

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[400px] p-10 bg-purple-500 mx-auto rounded-lg shadow-lg ">
                <h1 className="text-lg font-bold mb-2">Send Your Email </h1>
                <input 
                    value={email} 
                    onChange={handleEmailChange} 
                    type="email" 
                    className="px-4 py-2  border-2 border-purple-500 w-full rounded-lg" 
                    placeholder="Email" 
                />
                {error && <p className="text-black">{error}</p>}
                {
                    loading?
                    <button    className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg w-full" >  Sending...  </button>
                    :
                    <button  onClick={handleSendEmailAndOTP}  className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg w-full" > Send  </button>
                }
                <Link className="text-purple-500 mt-5 bg-white px-2 rounded-lg inline-block" to="/login">Back to Login</Link>
            </div>
        </div>
    );
};

export default ForgotPassword;
