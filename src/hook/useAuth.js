import { useMutation } from "@tanstack/react-query"
import { login, register, resetPassword } from "../api/axiosInstance"
import { useDispatch } from "react-redux"
import { setUser } from "../store/authSLice"


export const useRegister = () => {
    return useMutation({
        mutationKey : ['register'],
        mutationFn : register,
        onSuccess: () => {
            alert('register success, check your email')
        }
    })
}

export const useLogin = () => {
    const dispatch = useDispatch()

    return useMutation({
        mutationKey : ['login'],
        mutationFn : login,
        onSuccess : (data) => {
            dispatch(setUser(data))
        },
        onError: (error) => {
            alert(error.message)
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
