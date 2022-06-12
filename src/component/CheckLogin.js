import { useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import {useNavigate} from "react-router"
const axios = require('axios').default;

const useCheckJWT = () =>{
    const [cookies, setCookie, removeCookie] = useCookies()
    const redirect = useNavigate()
    
    const CheckJWT = axios.create()

	CheckJWT.interceptors.request.use(async(config)=>{
        const date = new Date().getTime()
        const expiry = jwt_decode(cookies.access_token).exp
        const userId = jwt_decode(cookies.access_token).userId
        if (date > expiry * 1000){
            const refresh = await axios.get(`https://backend-crud-app.herokuapp.com/contact/auth-user/token/${userId}`)
            setCookie("access_token",refresh.data.access_token)
            config.headers.Authorization = 'Bearer '+ refresh.data.access_token
    }
        return config
    }, (error)=>{
        Promise.reject(error)
    })

    const checkToken = async()=>{
            const response = await CheckJWT.get('https://backend-crud-app.herokuapp.com/contact/auth-status',{
                headers: 
                {
                    Authorization: 'Bearer '+ cookies.access_token
                }
            })
            if (response.data !== "OK") return redirect("/login")
            return true 
        }

    return [checkToken]
}


export default useCheckJWT

