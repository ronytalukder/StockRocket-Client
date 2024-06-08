import { toast } from "react-toastify";
import { BASE_URL } from "../helper/config";
import axios from "axios";
import { setAuthToken, setEmail, setOTP, setUserDetails } from "../helper/SessionHelper";

// Registration Request API
export async function RegistraionRequest(firstName, lastName, email, password, photo) {
    try{

        let url = BASE_URL+"/registration";
        
        let postBody ={
            firstName: firstName,
            lastName: lastName,
            email: email,
            password: password,
            photo: photo
        };

        let response = await axios.post(url, postBody);

        if (response.status === 200) {

            if (response.data.status === "fail") {
              if (response.data.data.keyPattern.email === 1) {
                toast.error("Email Already Exist");
                return false;
              } 
              else {
                toast.error("Something Went Wrong");
                return false;
              }
            } 

            else {
              toast.success("Registration Success");
              return true;
            }
          } 
          else {
            toast.error("Something went wrong");
            return false;
          }

    }
    catch(error){
        toast.error("Something went wrong");
    }

}

// Login Request API

export async function LoginRequest(email, password) {
try{
    let url = BASE_URL+"/login";
    let postBody = {
        email: email,
        password: password
    };
    let response = await axios.post(url, postBody);
    
    if(response.status === 200){
        if(response.data.status === "fail"){
                if(response.data.data ==="Invalid Password"){
                    toast.error("Wrong Password");
                    return {messege : "Wrong Password"};
                }

                else if (response.data.data ==="User Not Found") {
                    toast.error("User Not Found");
                    return {messege : "User Not Found"}
                }

                else{
                    toast.error("Something went wrong");
                    return {messege : "Something went wrong"};
                }
        }
        else{
           setAuthToken(response.data.token);
           setUserDetails(response.data.data);
           return true
        }
    }

    else{
        toast.error("Something went wrong");
    }


}

catch(error){
    toast.error("Something went wrong");
}

}

// Send Email Otp
export async function RecoverVerifyEmailRequest (email) {
    try{
      let url = BASE_URL + `/email-verify/${email}`;
      let response = await axios.get(url)
      if(response.status===200){
          if(response.data.status==="fail"){
              return false
          }
          else{
            toast.success("Otp sent successfully")
            setEmail(email)
            return true
          }
      }
      else{
        toast.error("Something went wrong")
        return false
      }
    }

    catch(error){
        toast.error("Something went wrong")
        return false
    }
}

// Verify OTP request
export async function VerifyOTPRequest(email, otp) {
    try{
      let url = BASE_URL + `/otp-verify/${email}/${otp}`;
      let response = await axios.get(url)
      if(response.status===200){
          if(response.data.status==="fail"){
              return false
          }
          else{
            setOTP(otp)
            return true
          }
      }
      else{
        toast.error("Something went wrong")
        return false
      }
    }
    catch(error){
        toast.error("Something went wrong")
        return false
    }
} 

// Reset Password Reset 
export async function ResetPasswordRequest (email, otp, password) {
    try{
    let url = BASE_URL + `/reset-password`;
    let postBody = {
      email: email,
      otp: otp,
      password: password
    };
    let response = await axios.post(url, postBody)
    
    if(response.status===200){
        if(response.data.status==="fail"){
            return false
        }
        else{
          toast.success("Password Reset Success")
          return true
        }
    }
    else{
      toast.error("Something went wrong")
      return false
    }
    }
    catch(error){
        toast.error("Something went wrong")
        return false
    }
  }

  