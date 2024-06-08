import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { LoginRequest } from "../../API/UsersAPIRequest";


const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setEmailError("");
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setPasswordError("");
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (email === "") {
      setEmailError("Please enter your email");
    }
    if (password === "") {
      setPasswordError("Please enter your password");
    }

    if (email && password) {
      setLoading(true);
      let result = await LoginRequest(email, password);
      if(result===true){
        toast.success("Login Success");
        setLoading(false);
        window.location.href ="/";
      }
      else{
        setLoading(false);
        if(result.messege==="Wrong Password"){
            setPasswordError(result.messege);
        }
        if (result.messege==="User Not Found"){
            setEmailError(result.messege);
        }
      }
    }
    
  };

  return (
    <div className="bg-purple-100 min-h-screen flex items-center justify-center">
      <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg">
        <h1 className="text-4xl font-semibold text-purple-500 mb-8">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={handleEmailChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          />
          <p className="text-red-500 mt-[-10px] mb-3">{emailError}</p>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
            className="w-full px-4 py-3 rounded-lg border border-gray-300 mb-4 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          />
          <p className="text-red-500 mt-[-10px] mb-3">{passwordError}</p>
          {
            loading?
            <span className="loading loading-dots loading-lg"></span>
            :
          <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-opacity-50"
          >
           Login
          </button>
          }
        </form>
        <p className="mt-4 text-center">
          Don't have an account?{" "}
          <Link to="/registration" className="text-purple-500">
          registration
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

export default Login;
