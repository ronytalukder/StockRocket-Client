import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { RegistraionRequest } from "../../API/UsersAPIRequest";


const Registration = () => {

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [fristNameError, setFristNameError] = useState("");
  const [lastNameError, setLastNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);
  const navagate = useNavigate();

  const handleFirstName = (e) => {
    setFirstName(e.target.value);
    setFristNameError("");
  };

  const handleLastName = (e) => {
    setLastName(e.target.value);
    setLastNameError("");
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  
  const handleSbumit = async (e) => {
    e.preventDefault();
    if(firstName === ""){
      setFristNameError("Please enter your first name");
    }
    if(lastName === ""){
      setLastNameError("Please enter your last name");
    }
    if(email === ""){
      setEmailError("Please enter your email");
    }
    if(password === ""){
      setPasswordError("Please enter your password");
    }
    if (firstName && lastName && email && password) {
    
    setLoading(true);
    let profilePicture = "https://cdn0.iconfinder.com/data/icons/social-messaging-ui-color-shapes/128/user-male-circle-blue-512.png"
    let result = await RegistraionRequest(firstName, lastName, email, password, profilePicture);
    if(result===true){
      setLoading(false);
      navagate("/login");
    }
    else{
      setLoading(false);
      setEmailError("Email already exists");
    }

    }
  };


  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-purple-500 mb-8">
          Registration
        </h1>

        <form onSubmit={handleSbumit} >
        <input
          onChange={handleFirstName}
          type="text"
          placeholder="First Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        />
        <p className="text-red-500 mt-[-10px] mb-3">{fristNameError}</p>
        <input
          onChange={handleLastName}
          type="text"
          placeholder="Last Name"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        />
        <p className="text-red-500 mt-[-10px] mb-3">{lastNameError}</p>
        <input
          onChange={handleEmail}
          type="email"
          placeholder="Email"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        />
        <p className="text-red-500 mt-[-10px] mb-3">{emailError}</p>
        <input
          onChange={handlePassword}
          type="password"
          placeholder="Password"
          className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
        />
        <p className="text-red-500 mt-[-10px] mb-3">{passwordError}</p>
        {
          loading?
          <span className="loading loading-spinner loading-lg"></span>
          :
        <button type="submit" className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50">
          Registration
          </button>
        }
          
        </form>
        
        <p className="mt-4 text-center">
          Already have an account?{" "}
          <Link to="/login" className="text-purple-500">
            Login
          </Link>
        </p>
        <p className="mt-2 text-center">
          Forgot your password?{" "}
          <Link to="/forgot-password" className="text-purple-500">
            Reset it here
          </Link>
        </p>
      </div>
    </div>   
  );
};

export default Registration;