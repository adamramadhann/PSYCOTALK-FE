import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import TopTitle from "../../components/TopTitle";
import { CgProfile } from "react-icons/cg";
import { FaChevronRight } from "react-icons/fa";
import { logout } from "../../store/authSLice";
import { useNavigate } from "react-router-dom";
import { getProfileAuth } from "../../hook/fetchApi";
import { useQuery } from "@tanstack/react-query";
import { IoMdNotificationsOutline } from "react-icons/io";
import { CiSearch } from "react-icons/ci";
import {  users } from "../../assets/importImage";

const Profile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()


  const { data : profile, isLoading, isError } = useQuery({
    queryKey: ["profile"],
    queryFn: getProfileAuth,
  });

    const API_BASE_URL = "http://localhost:8000";

    const dataMenuProfile = [
        {
            icon: CgProfile,
            title: "Detail Profile",
        },
        {
            icon: CiSearch,
            title: "Postingan",
        },
        {
            icon: IoMdNotificationsOutline,
            title: "Notification",
        },
    ];

    const handleLogOut = () => {
        dispatch(logout())
        navigate( '/login')
    }

    console.log('ini data profile',profile)


    return (
      <div className="w-full h-full overflow-hidden relative p-3">
        <TopTitle title="Profile" />
        <div className=" xl:flex w-full h-full mt-20 justify-center" >
          <div className="flex flex-col items-center py-10 xl:shadow-[0_0_15px_rgba(0,0,0,0.2)]  xl:max-w-3xl xl:p-5 xl:h-[600px]  w-full h-full">
            {profile?.profile?.avatar ?  (
                <img
                  src={`${API_BASE_URL}${profile.profile.avatar}`}
                  alt="profile"
                  className="w-14 rounded-full h-14"
                />
            ) : (
              <img src={users} alt="user" />
            )}

            <div className="text-center mt-5 space-y-1">
              <h1 className="text-xl font-semibold text-gray-900">
                {profile?.name || "Guest"}
              </h1>
              <p className="text-gray-600 text-md">
                {profile?.email || "email@example.com"}
              </p>
            </div>

            <div className="w-full mt-6 space-y-2">
              {dataMenuProfile.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center shadow-md justify-between p-3 hover:bg-gray-50 rounded-lg transition-colors cursor-pointer"
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

            <button
              onClick={handleLogOut}
              className="mt-8 px-6 py-2 text-red-600 cursor-pointer hover:bg-red-50 rounded-full transition-colors"
            >
              Log Out
            </button>
          </div>
        </div>
      </div>    
    );
};

export default Profile;
