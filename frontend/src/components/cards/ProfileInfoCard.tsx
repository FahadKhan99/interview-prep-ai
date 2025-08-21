import { useNavigate } from "react-router-dom";
import { useUserContext } from "../../hooks/useUserContext";

const ProfileInfoCard = () => {
  const { user, clearUser, logout } = useUserContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    clearUser(); // local state
    navigate("/");
  };

  console.log("user: ", user);
  return (
    user && (
      <div className="flex items-center">
        <img
          src={user?.profileImageUrl || "/empty_avatar.webp"}
          alt="Profile Image"
          className="w-11 h-11 bg-gray-300 rounded-full mr-3"
        />
        <div>
          <div className="text-[15px] text-black font-bold leading-3">
            {user?.fullName}
          </div>
          <button
            className="text-amber-600 text-sm font-semibold cursor-pointer hover:underline"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    )
  );
};

export default ProfileInfoCard;
