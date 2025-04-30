import { useMutation } from "@tanstack/react-query"
import { login, register, resetPassword } from "../api/axiosInstance"
import { useDispatch } from "react-redux"
import { setRole, setUser } from "../store/authSLice"
import { jwtDecode } from 'jwt-decode';

// import { useNavigate } from "react-router-dom"

// const navigate = useNavigate()


export const useRegister = () => {
    return useMutation({
        mutationKey : ['register'],
        mutationFn : register, 
    })
}

export const useLogin = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationKey : ['login'],
        mutationFn : login,
        onSuccess : (data) => {
            const decoded = jwtDecode(data.token)
            dispatch(setRole({ role : decoded.role, token : data.token}))
        },
        onError: (error) => {
            console.error("Login failed:", error.response?.data || error.message);
        },
    })
}

export const useForgotPassword = () => {
    return useMutation({
        mutationKey: ['forgotPassword'],
        mutationFn: resetPassword,
        onSuccess: () => {
            alert('Success! Check your email for the reset link.');
        },
        onError: (error) => {
            console.error("Error resetting password:", error.response?.data || error.message);
            alert(error.response?.data?.message || "Something went wrong. || email notfound");
        },
    });
};
