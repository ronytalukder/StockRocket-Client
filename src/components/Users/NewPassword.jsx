import { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { getEmail, getOTP } from "../../helper/SessionHelper";
import { ResetPasswordRequest } from "../../API/UsersAPIRequest";

const NewPassword = () => {

    const navigate = useNavigate();
    
    let [password, setPassword] = useState("");
    let [passwordConfirm, setPasswordConfirm] = useState("");
    let [errorPassword, setErrorPassword] = useState("");
    let [errorPasswordConfirm, setErrorPasswordConfirm] = useState("");


    const handleSetNewPassword =  async() => {
        if (password === "") {
            setErrorPassword("Please enter your password");
        }
        if (passwordConfirm === "") {
            setErrorPasswordConfirm("Please enter your password");
        }

        if (password!==passwordConfirm) {
            setErrorPasswordConfirm("Password not match");
        }
         if(password && passwordConfirm && password===passwordConfirm) {
            // console.log( password)
            const result = await ResetPasswordRequest(getEmail(), getOTP(), password)
            if(result===true){
                toast.success("Password set successfully")
                navigate('/login')
                localStorage.clear(getOTP(), getEmail())
            }
            else{
                toast.error("Something went wrong")
            }
         }
    }

    return (
        <div className="h-screen flex justify-center items-center">
            <div className="w-[400px] p-10 bg-purple-500 mx-auto rounded-lg shadow-lg ">
                <h1 className="text-lg font-bold mb-2">Create New Password</h1>

                <input className="w-full p-2 rounded-lg mb-2 outline-none bg-gray-300" defaultValue={getEmail()?getEmail():""} placeholder="Enter Email" type="email" readOnly />
                <input onChange={(e) => setPassword(e.target.value)} value={password} className="w-full p-2 rounded-lg mb-2" type="password" placeholder="Enter New Password" />
                {errorPassword && <p className="text-yellow-500">{errorPassword}</p>}
                <input onChange={(e) => setPasswordConfirm(e.target.value)} value={passwordConfirm} className="w-full p-2 rounded-lg mb-2" type="password" placeholder="Confirm New Password" />
                {errorPasswordConfirm && <p className="text-yellow-500">{errorPasswordConfirm}</p>}
                <button onClick={handleSetNewPassword} className="bg-yellow-500 text-white px-4 py-2 mt-4 rounded-lg w-full" >Submit</button>
            </div>
        </div>
    );
};

export default NewPassword;