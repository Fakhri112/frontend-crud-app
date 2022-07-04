import axios from "axios"
import LoadingBar from 'react-top-loading-bar'
import { useState, useEffect } from "react"
import { useCookies } from "react-cookie"
import { useNavigate } from "react-router"
import { Header } from "./Header"

export const LoginPage = () => {

  const [cookies, setCookies] = useCookies()
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [errorMsg, setErrorMsg] = useState("")
  const [loading, setLoading] = useState(0)
  const [loaderSpeed, setLoaderSpeed] = useState(0)
  const changeEmail = (e) => setEmail(e.target.value)
  const changePass = (e) => setPass(e.target.value)
  const redirect = useNavigate()

  const handleSubmit = async () => {
    setLoading(70)
    const loginData = {
      email: email,
      password: pass
    }
    await axios.post(`https://backend-crud-app.herokuapp.com/contact/auth-user/login`, loginData).then((res) => {
      if (res?.data?.access_token !== undefined) {
        setCookies("access_token", res.data.access_token, { path: "/" })
        setCookies("loadingProgress", 70, { maxAge: "5", path: "/" })
        return redirect("/contact")
      }
    }).catch((error) => {
      return setErrorMsg("Email or Password is Invalid")
    })
  }

  useEffect(() => {
    if (cookies.loadingProgress) {
      setLoaderSpeed(0)
      setLoading(cookies.loadingProgress)
    }
    return (
      setLoaderSpeed(300),
      setLoading((100 - loading) + loading)
    )
  }, [])


  return <div>
    <LoadingBar color="#85edf2" loaderSpeed={loaderSpeed} progress={loading} shadow={true} />
    <Header status="contact" />
    <h3 className="title">Login Form</h3>
    {
      errorMsg !== "" ?
        <>
          <div className="alert alert-danger center-block alert-auth" role="alert">
            {errorMsg}
          </div>
        </>
        : <div></div>
    }
    <div className="login-register-page">
      <form className="login-register-form">
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
        <div className="d-flex justify-content-center">
          <button type="button" className="btn btn-primary btn-block mb-4 button-login" onClick={handleSubmit}>Sign in</button>
        </div>
        <div className="text-center">
          <p>Not a member? <a href="/register">Register</a></p>
        </div>
      </form>
    </div>
  </div>
}