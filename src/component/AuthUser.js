import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { useNavigate } from 'react-router';
import { useCookies } from 'react-cookie';
import useCheckJWT from './CheckLogin';
import jwt_decode from 'jwt-decode';
import LoadingBar from 'react-top-loading-bar'

const axios = require('axios').default;

export const AuthUser = () => {
  const [loading, setLoading] = useState(0)
  const [loaderSpeed, setLoaderSpeed] = useState(0)
  const [cookies, setCookies, removeCookie] = useCookies()
  const [datas, setData] = useState([])
  const [user, setUser] = useState([])
  const redirect = useNavigate()
  const [checkToken] = useCheckJWT()


  useEffect(() => {
    if (!cookies.access_token) return redirect("/login")
    checkToken()
    ambilData()

  }, [])



  const ambilData = async () => {
    const fetch_data = await axios.get('https://backend-crud-app.herokuapp.com/contact/list-auth-user')
    const userdata = jwt_decode(cookies.access_token)
    setData(fetch_data.data)
    setUser(userdata)
  }

  const deleteUser = async () => {
    setLoaderSpeed(300)
    setLoading(70)
    const userId = jwt_decode(cookies.access_token).userId
    await axios.delete(`https://backend-crud-app.herokuapp.com/contact/auth-user/${userId}`)
    removeCookie("access_token", { path: "/" })
    setCookies("loadingProgress", 70, { path: "/", maxAge: "5" })
    return redirect("/login")
  }

  return <div>
    <LoadingBar color="#85edf2" progress={loading} shadow={true} />
    <Header status="contact" />
    {
      (datas.length == 0) ?
        <div className="container alert alert-info" role="alert">
          <h4 className="alert-heading">Loading...</h4>
          <p>Please wait a sec</p><hr />
          <a href="/contact" className="card-link">&laquo; Back to Contact</a>
        </div> :
        <div className="container">
          <div className="contact-width-top rounded mb-4 d-flex flex-row justify-content-between">
            <div className="p-2">
              <h3><i>{user.nama}</i></h3>
              <h6>{user.email}</h6>
              <p>{user.number}</p>
            </div>
            <div className="d-flex flex-column align-items-center">
              <a onClick={deleteUser} className="button-group-2 btn btn-danger btn-md mt-3" type="button">Delete Account</a>
              <a className="ml-5" href="/contact" className="card-link">&laquo; Back to Contact</a>
            </div>
          </div>
          <div className="row">
            <div className="col-9">
              <div className="table-wrap">
                <table className="table">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">Email</th>
                      <th scope="col">Number Phone</th>
                    </tr>
                  </thead>
                  <tbody>
                    {datas.map((data, index) => (
                      <>
                        <tr>
                          <th scope="row">{index + 1}</th>
                          <td>{data.nama}</td>
                          <td>{data.email}</td>
                          <td>{data.number}</td>
                        </tr>
                      </>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
    }
  </div >;
};
