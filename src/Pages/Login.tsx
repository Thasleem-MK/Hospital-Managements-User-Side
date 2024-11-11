import React, { useState } from "react";
import { Mail, Lock, EyeOff, Eye, AlertCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../Components/Axios";
import { successToast } from "../Components/Toastify";
import { useDispatch } from "react-redux";
import { updateUserData } from "../Redux/userData";
import { FormInput, Header } from "../Components/Common";

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }
    await apiClient
      .post(
        "/api/users/login",
        { email: email, password: password },
        { withCredentials: true }
      )
      .then(async (result) => {
        successToast("Login successful");
        localStorage.setItem("accessToken", result.data.token);
        const { email, name, phone, password, _id } = result.data.data;
        dispatch(
          updateUserData({
            email: email,
            name: name,
            password: password,
            phone: phone,
            _id: _id as string,
          })
        );
        navigate("/");
      })
      .catch((err) => {
        setError(err.response.data.message);
        console.log(err);
      });
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <Header onBackClick={() => navigate("/")} title="User Login" />
        {error && (
          <div className="mb-4 p-2 bg-red-100 border border-red-400 text-red-700 rounded flex items-center">
            <AlertCircle className="mr-2" size={18} />
            <span>{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Email Address
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="email"
                id="email"
                value={email}
                OnChange={(e: any) => setEmail(e.target.value)}
                placeholder="Enter your email"
              />
            </div>
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type={showPassword ? "text" : "password"}
                id="password"
                value={password}
                OnChange={(e: any) => setPassword(e.target.value)}
                placeholder="Enter your password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          <div className="flex items-center justify-end">
            <div className="text-sm">
              <Link
                to="/password"
                className="font-medium text-green-600 hover:text-green-500"
              >
                Forgot your password?
              </Link>
            </div>
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-green-700">
            Don't have an account?{" "}
            <Link
              to="/registration"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Register here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserLogin;
