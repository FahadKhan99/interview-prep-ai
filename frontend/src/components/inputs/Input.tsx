import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

interface Props {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  type: string;
  label: string;
  placeholder: string;
}

const Input = ({ value, onChange, type, label, placeholder }: Props) => {
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="flex flex-col mb-4">
      <label
        htmlFor={label}
        className="text-sm font-medium text-slate-800 mb-1"
      >
        {label}
      </label>
      <div
        className={`
          w-full flex items-center gap-2
          text-sm text-gray-900
          bg-gray-50/60
          rounded-xl px-4 py-3
          border border-gray-200
          focus-within:border-orange-400
          focus-within:ring-2 focus-within:ring-orange-100
          invalid:border-red-400 invalid:text-red-600
          transition-all duration-200
        `}
      >
        <input
          id={label} // Link label to input
          type={
            type === "password" ? (showPassword ? "text" : "password") : "text"
          }
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className="w-full bg-transparent outline-none placeholder-gray-400"
        />
        {type === "password" && (
          <>
            {showPassword ? (
              <FaRegEye
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            ) : (
              <FaRegEyeSlash
                size={22}
                className="text-primary cursor-pointer"
                onClick={toggleShowPassword}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Input;
