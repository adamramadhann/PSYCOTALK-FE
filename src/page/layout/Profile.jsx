import React from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { CgProfile } from "react-icons/cg";
import { IoMdNotificationsOutline } from "react-icons/io";
import { FaChevronRight } from "react-icons/fa";

import TopTitle from "../../components/TopTitle";
import { logout } from "../../store/authSLice";
import { getProfileAuth } from "../../hook/fetchApi";
import { users } from "../../assets/importImage";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const API_BASE_URL = "http://localhost:8000";

  const { data: profile } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAuth,
  });

  const handleLogOut = () => {
    dispatch(logout());
    navigate("/login");
  };

  const dataMenuProfile = [
    {
      icon: CgProfile,
      title: "Detail Profile",
      path: "/profile/profDetail",
    },
    {
      icon: IoMdNotificationsOutline,
      title: "Notification",
      path: "/notif",
    },
  ];

  return (
    <div className="w-full min-h-[100dvh] xl:h-full bg-gray-50 py-6 px-4 flex justify-center items-start">
      <div className="w-full max-w-xl bg-white md:p-6 md:fixed top-1/2 left-1/2 md:-translate-1/2 rounded-2xl md:border border-gray-200 md:shadow-md">
        <TopTitle title="Profile" />

        {/* Profile Picture */}
        <div className="flex justify-center mt-6">
          <img
            src={profile?.profile?.avatar ? `${API_BASE_URL}${profile.profile.avatar}` : users}
            alt="profile"
            className="w-32 h-32 object-cover rounded-full border-4 border-white shadow"
            onError={(e) => (e.target.src = users)}
          />
        </div>

        {/* Info */}
        <div className="text-center mt-4 space-y-1">
          <h1 className="text-xl font-semibold text-gray-900">
            {profile?.name || "Guest"}
          </h1>
          <p className="text-gray-600 text-md">
            {profile?.email || "email@example.com"}
          </p>
        </div>

        {/* Menu */}
        <div className="w-full mt-8 space-y-4">
          {dataMenuProfile.map((item, index) => (
            <Link
              to={item.path}
              key={index}
              className="flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl shadow hover:bg-gray-50 transition-all"
            >
              <div className="flex items-center gap-4">
                <span className="p-2 rounded-full bg-blue-100">
                  <item.icon className="text-blue-600" size={24} />
                </span>
                <span className="text-gray-700 font-medium">{item.title}</span>
              </div>
              <FaChevronRight className="text-gray-400" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <button
          onClick={handleLogOut}
          className="mt-8 w-full bg-red-50 text-red-600 py-2.5 rounded-md font-medium hover:bg-red-100 transition-all"
        >
          Log Out
        </button>
      </div>
    </div>
  );
};

export default Profile;
