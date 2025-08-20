import React, { useContext, useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import Input from "../../components/inputs/Input";
import { validateEmail } from "../../utils/helper";
import { API_PATHS } from "../../utils/apiPaths";
import api from "../../utils/axiosInstance";
import { useUserContext } from "../../hooks/useUserContext";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

const Login = ({ setCurrentPage }: Props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const { updateUser } = useUserContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      console.log("email: ", email);
      setError("Please enter a valid email!");
      return;
    }

    if (!password || password.length < 8) {
      setError("Password must be atleast 8 characters long");
      return;
    }
    setError("");

    // Login API call
    try {
      const res = await api.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { user } = res.data;

      if (user) {
        updateUser(user); // save user in context
        navigate("/dashboard");
      }
    } catch (error: any) {
      if (error.response && error.response.data.message) {
        setError(error.response.data.message);
      } else {
        setError("Something went wrong. Please try again later.");
      }
    }
  };

  return (
    <div className="w-[80vw] md:w-[60vw] lg:w-[40vw] p-7 flex flex-col justify-center">
      <h3 className="font-semibold text-xl text-black">Welcome Back</h3>
      <p className="text-slate-900 mt-[5px] mb-6">
        Please enter your details to login{" "}
      </p>

      <form onSubmit={handleSubmit}>
        <Input
          value={email}
          onChange={({ target }) => setEmail(target.value)}
          label="Email Address"
          placeholder="john@email.com"
          type="text"
        />
        <Input
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          label="Password"
          placeholder="Min 8 Characters"
          type="password"
        />

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          LOGIN
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Don't have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("signup")}
          >
            SignUp
          </button>
        </p>
      </form>
    </div>
  );
};

export default Login;
