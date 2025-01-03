import React, { useState } from "react";
import { Mail, Phone, Lock, CheckCircle, X, User } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { apiClient } from "../Components/Axios";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../Redux/Store";
import {
  updateFormData,
  sentOtp,
  setOtp,
  setRandomOtp,
  resetForm,
} from "../Redux/userRegistration";
import { FormData } from "../Redux/userRegistration";
import { errorToast, successToast } from "../Components/Toastify";
import { FormInput, Header } from "../Components/Common";

const UserRegistration: React.FC = () => {
  const { formData, otp, otpSent, randomOtp } = useSelector(
    (state: RootState) => state.userRegistration
  );
  const dispatch = useDispatch();

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [showOtpPopup, setShowOtpPopup] = useState(false);
  const navigate = useNavigate();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    dispatch(updateFormData({ field: name as keyof FormData, value: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};
    if (!formData.name) newErrors.name = "Name is required";
    if (!formData.email) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Email is invalid";
    if (!formData.mobile) newErrors.mobile = "Mobile number is required";
    else if (!/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Mobile number must be 10 digits";
    if (!formData.password) newErrors.password = "Password is required";
    else if (formData.password.length < 8)
      newErrors.password = "Password must be at least 8 characters";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      if (!otpSent) {
        dispatch(sentOtp(true));
        setShowOtpPopup(true);

        const randomSixDigit = Math.floor(
          100000 + Math.random() * 900000
        ).toString();
        dispatch(setRandomOtp(randomSixDigit));

        await apiClient
          .post(
            "/api/email",
            {
              from: "hostahelthcare@gmail.com",
              to: formData.email,
              subject: "OTP VERIFICATION",
              text: `Otp for Hosta registration is ${randomSixDigit}`,
            },
            { withCredentials: true }
          )
          .then((result) => {
            console.log(result);
          })
          .catch((error) => {
            console.log(error);
          });
      } else {
        // Simulating OTP verification and form submission
        if (otp === randomOtp) {
          apiClient
            .post(
              "/api/users/registeration",
              {
                name: formData.name,
                email: formData.email,
                password: formData.password,
                phone: formData.mobile,
              },
              { withCredentials: true }
            )
            .then(() => {
              successToast("Registration successful!");
              navigate("/registration");
            })
            .catch((err) => {
              errorToast(err.response.data.message);
            });

          dispatch(resetForm());
          setShowOtpPopup(false);
        } else {
          errorToast("Wrong OTP, please try again!");
        }
      }
    }
  };

  return (
    <div className="min-h-screen bg-green-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8">
        <Header onBackClick={() => navigate("/")} title="User Registration" />
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Name
            </label>
            <div className="relative">
              <User
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="text"
                id="name"
                name="name"
                value={formData.name}
                OnChange={handleChange}
                placeholder="Enter your name"
              />
            </div>
            {errors.name && (
              <p className="text-red-500 text-xs mt-1">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Email
            </label>
            <div className="relative">
              <Mail
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="email"
                id="email"
                name="email"
                value={formData.email}
                OnChange={handleChange}
                placeholder="Enter email address"
              />
            </div>
            {errors.email && (
              <p className="text-red-500 text-xs mt-1">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="mobile"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Mobile Number
            </label>
            <div className="relative">
              <Phone
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="tel"
                id="mobile"
                name="mobile"
                value={formData.mobile}
                OnChange={handleChange}
                placeholder="Enter mobile number"
              />
            </div>
            {errors.mobile && (
              <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>
            )}
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
                type="password"
                id="password"
                name="password"
                value={formData.password}
                OnChange={handleChange}
                placeholder="Enter password"
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs mt-1">{errors.password}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-green-700 mb-1"
            >
              Confirm Password
            </label>
            <div className="relative">
              <Lock
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="password"
                id="confirmPassword"
                name="confirmPassword"
                value={formData.confirmPassword}
                OnChange={handleChange}
                placeholder="Confirm password"
              />
            </div>
            {errors.confirmPassword && (
              <p className="text-red-500 text-xs mt-1">
                {errors.confirmPassword}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
          >
            {otpSent ? "Verify OTP & Register" : "Send OTP"}
          </button>
        </form>
        <div className="mt-6 text-center">
          <p className="text-sm text-green-700">
            Have an account?{" "}
            <Link
              to="/login"
              className="font-medium text-green-600 hover:text-green-500"
            >
              Login
            </Link>
          </p>
          <p className="text-sm text-green-700">
            <a
              href="https://hospital-management-hospital-side.vercel.app/privacy"
              target="_blank"
              className="text-xs underline"
            >
              privacy & policy
            </a>
          </p>
        </div>
      </div>

      {showOtpPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-md relative">
            <button
              onClick={() => {
                setShowOtpPopup(false);
                dispatch(sentOtp(false));
              }}
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
            >
              <X size={24} />
            </button>
            <h3 className="text-xl font-semibold text-green-800 mb-4">
              Enter OTP
            </h3>
            <p className="text-green-600 mb-4">
              An OTP has been sent to your email address. Please enter it below
              to complete your registration.
            </p>
            <div className="relative">
              <CheckCircle
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-green-600"
                size={18}
              />
              <FormInput
                type="text"
                OnChange={(e: any) => dispatch(setOtp(e.target.value))}
                placeholder="Enter OTP"
              />
            </div>
            <Link to={"/login"}>
              <button
                onClick={(e) => {
                  handleSubmit(e);
                  dispatch(sentOtp(false));
                }}
                className="w-full mt-4 bg-green-600 text-white py-2 px-4 rounded-md hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Verify & Register
              </button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserRegistration;
