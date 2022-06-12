import axios from "axios"
import { useState } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import { Header } from "./Header"

export const LoginPage = ()=>{

const [cookies, setCookie] = useCookies()
const [email, setEmail] = useState("")
const [pass, setPass] = useState("")
const [errorMsg, setErrorMsg] = useState("")
const changeEmail = (e) => setEmail(e.target.value)
const changePass = (e) => setPass(e.target.value)
const redirect = useNavigate()

const handleSubmit = async() =>{
  const loginData = {
    email: email,
    password: pass
  }
  await axios.post("https://backend-crud-app.herokuapp.com/contact/auth-user/login", loginData).then((res)=>{
      if (res?.data?.access_token !== undefined){
        setCookie("access_token", res.data.access_token, {path: "/"})
        return redirect("/contact")
      }
  }).catch((e)=>{
    return setErrorMsg("Email or Password is Invalid")
  })
}


return <div>
        <Header status="contact" />
        <h3 className="title">Login Form</h3>
        <div className="container-login-register">
        {
                errorMsg !== "" ?
                <>
                    <div className="alert alert-danger center-block alert-auth" role="alert">
                    {errorMsg}
                    </div>
                </>
                : <div></div>
        }
        <div className="card" style={{width: "34rem"}}>
          <form>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example1">Email address</label>
              <input type="email" onChange={changeEmail} id="form2Example1" 
                     className="form-control login-input" />
            </div>
            <div className="form-outline mb-4">
              <label className="form-label" htmlFor="form2Example2">Password</label>
              <input type="password" onChange={changePass} 
                     id="form2Example2" className="form-control login-input" />
            </div>
            <button type="button" className="btn btn-primary btn-block mb-4" onClick={handleSubmit}>Sign in</button>
            <div className="text-center">
              <p>Not a member? <a href="/register">Register</a></p>
            </div>
          </form>
        </div>
        </div>
    </div>
}