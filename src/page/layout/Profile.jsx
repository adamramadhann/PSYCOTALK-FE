import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopTitle from "../../components/TopTitle";
import { CgProfile } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa";
import { fetchProfile } from "../../store/profileSLice";
import { logout } from "../../store/authSLice";
import { useNavigate } from "react-router-dom";

const Profile = () => {
    const dispatch = useDispatch();
    const { data: profile, loading, error } = useSelector((state) => state.profile);
    const navigate = useNavigate()

    useEffect(() => {
        dispatch(fetchProfile());
    }, [dispatch]);


    const API_BASE_URL = "http://localhost:8000";
    console.log('ini avatar',profile.profile.avatar )

    const dataMenuProfile = [
        {
            icon: CgProfile,
            title: "Detail Profile",
        },
    ];

    const handleLogOut = () => {
        dispatch(logout())
        navigate('/login')
    }

    if (loading) return <p>Loading...</p>;
    if (error) return <p>Error: {error}</p>;

    console.log('ini profile ', profile)

    return (
<div className="w-full h-full p-3">
  <TopTitle title="Profile" />
  
  <div className="flex flex-col items-center justify-center w-full h-full">
    {profile?.profile?.avatar && (
      <img
        src={`${API_BASE_URL}${profile.profile.avatar}`}
        className="rounded-full w-28 h-28 object-cover"
        alt="User avatar"
      />
    )}

    {/* Profile Information */}
    <div className="text-center mt-5 space-y-1">
      <h1 className="text-xl font-semibold text-gray-900">
        {profile?.name || "Guest"}
      </h1>
      <p className="text-gray-600 text-md">
        {profile?.email || "email@example.com"}
      </p>
    </div>

    {/* Profile Menu */}
    <div className="w-full mt-6 space-y-2">
      {dataMenuProfile.map((item, index) => (
        <div
          key={index}
          className="flex items-center justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
        >
          <div className="flex items-center gap-4">
            <span className="p-2 rounded-full bg-blue-50">
              <item.icon className="text-blue-600" size={25} />
            </span>
            <span className="text-gray-700">{item.title}</span>
          </div>
          <FaChevronRight className="text-gray-400" />
        </div>
      ))}
    </div>

    {/* Logout Button */}
    <button
      onClick={handleLogOut}
      className="mt-8 px-6 py-2 text-red-600 hover:bg-red-50 rounded-full transition-colors"
    >
      Log Out
    </button>
  </div>
</div>    
    );
};

export default Profile;
