import axios from "axios"
import LoadingBar from 'react-top-loading-bar'
import { useEffect, useState } from "react"
import { useCookies } from "react-cookie"
import { Header } from "./Header"
import { useNavigate } from "react-router"

export const RegisterPage = () => {

  document.title = "Register"
  const [name, setName] = useState("")
  const [number, setNumber] = useState("")
  const [email, setEmail] = useState("")
  const [pass, setPass] = useState("")
  const [rePass, setRePass] = useState("")
  const [errorMsg, setErrorMsg] = useState([])
  const [cookies, setCookies] = useCookies()
  const [loading, setLoading] = useState(0)
  const [loaderSpeed, setLoaderSpeed] = useState(0)
  const redirect = useNavigate()
  const changeName = (e) => setName(e.target.value)
  const changeNumber = (e) => setNumber(e.target.value)
  const changeEmail = (e) => setEmail(e.target.value)
  const changePass = (e) => setPass(e.target.value)
  const changeRePass = (e) => setRePass(e.target.value)

  const handleSubmit = async () => {
    setLoading(70)
    const registerData = {
      email: email,
      password: pass,
      conPassword: rePass,
      nama: name,
      number: number
    }

    const response = await axios.post("https://backend-crud-app.herokuapp.com/contact/auth-user/register", registerData)
    if (response?.data[0]?.msg !== undefined) {
      return setErrorMsg(response?.data)
    }
    await axios.post("https://backend-crud-app.herokuapp.com/contact/auth-user/login", {
      email: email,
      password: pass
    }).then((res) => {
      if (res?.data?.access_token !== undefined) {
        setCookies("access_token", res.data.access_token, { path: "/" })
        setCookies("loadingProgress", 70, { maxAge: "5", path: "/" })
        return redirect("/contact")
      }
    }).catch((e) => {
      return setErrorMsg("There is Error to Sign-Up")
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
    <h3 className="title">Registration Form</h3>
    <div className="container-login-register">
      {
        errorMsg.length !== 0 ?
          <div className="alert alert-danger center-block alert-auth" role="alert">
            {errorMsg.map((errorMsg, index) => (
              <h6 key={index}>{errorMsg.msg}</h6>
            ))}
          </div>
          : <div></div>
      }
      <div className="login-register-page">
        <form className="login-register-form">
          <div className="row">
            <div className="col">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example1">Your name</label>
                <input onChange={changeName} id="form2Example1"
                  className="form-control login-input" />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example2">Number phone</label>
                <input onChange={changeNumber} id="form2Example2"
                  className="form-control login-input" />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example3">Email address</label>
                <input type="email" onChange={changeEmail} id="form2Example3"
                  className="form-control login-input" />
              </div>
            </div>
            <div className="col d-flex flex-column">
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example4">Password</label>
                <input type="password" onChange={changePass}
                  id="form2Example4" className="form-control login-input" />
              </div>
              <div className="form-outline mb-4">
                <label className="form-label" htmlFor="form2Example5">Retype Password</label>
                <input type="password" onChange={changeRePass}
                  id="form2Example5" className="form-control login-input" />
              </div>

              <button type="button" className="btn btn-primary btn-block signupButton"
                onClick={handleSubmit}>Sign Up</button>

              <div className="text-center mt-1">
                <a href="/login">Log-in</a>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  </div>
}