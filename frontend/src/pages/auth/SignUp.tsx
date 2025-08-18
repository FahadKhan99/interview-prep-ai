import React, { useState, type FormEvent } from "react";
import Input from "../../components/inputs/Input";
import { useNavigate } from "react-router-dom";
import UploadProfilePhoto from "../../components/inputs/UploadProfilePhoto";
import { validateEmail } from "../../utils/helper";

interface Props {
  setCurrentPage: React.Dispatch<React.SetStateAction<"login" | "signup">>;
}

const SignUp = ({ setCurrentPage }: Props) => {
  const [profilePic, setProfilePic] = useState<File | null>(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!fullName) {
      setError("Please enter full name.");
      return;
    }

    if (!validateEmail(email)) {
      setError("Please enter a valid email!");
      return;
    }

    if (!password || password.length !== 8) {
      setError("Password must be exactly 8 characters long");
      return;
    }

    setError("");

    // Signup API call
    try {
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
      <h3 className="font-semibold text-xl text-black">Create an Account</h3>
      <p className="text-slate-900 mt-[5px] mb-6">
        Join us today by entering your details below.{" "}
      </p>

      <form onSubmit={handleSubmit}>
        <UploadProfilePhoto image={profilePic} setImage={setProfilePic} />

        <div>
          <Input
            value={fullName}
            onChange={({ target }) => setFullName(target.value)}
            label="Full Name"
            placeholder="John Doe"
            type="text"
          />
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
        </div>

        {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}

        <button type="submit" className="btn-primary">
          SignUp
        </button>

        <p className="text-[13px] text-slate-800 mt-3">
          Already have an account?{" "}
          <button
            className="font-medium text-primary underline cursor-pointer"
            onClick={() => setCurrentPage("login")}
          >
            Login
          </button>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
