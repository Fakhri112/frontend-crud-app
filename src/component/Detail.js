import { useLocation, useNavigate } from 'react-router';
import React, { useEffect, useState } from 'react';
import { Header } from './Header';
import { useCookies } from 'react-cookie';
import useCheckJWT from './CheckLogin';

const axios = require('axios').default;

export const Detail = () => {
  const [data, setData] = useState([]);
  const redirect = useNavigate()
  const location = useLocation()
  const id = location?.state?.userDataID
  const [cookies, setCookies] = useCookies()
  const [checkToken] = useCheckJWT()


  useEffect(() => {
    if (!cookies.access_token) return redirect("/login")
    checkToken()
  }, [])

  useEffect(() => {
    if (id == undefined) {
      return redirect('/contact/')
    }
    ambilData()
  }, [])

  const ambilData = async () => {
    await axios.get(`https://backend-crud-app.herokuapp.com/contact/${id}`).then((x) => {
      setData(x.data);
    })
  }

  const deleteData = async () => {
    await axios.delete(`https://backend-crud-app.herokuapp.com/contact/${data.nama}`)
    setCookies("SuccessMsg", "Data has been successfully deleted", {
      path: "/contact",
      maxAge: "5"
    })
    return redirect("/contact")

  }

  const toEdit = () => {
    redirect(`/contact/edit/`, {
      state: {
        userData: data
      }
    })
  }

  return (
    <div>
      <Header status="contact" />
      <div className="container">
        <div className="row">
          <div className="col-9">
            {
              (data.length == 0) ?
                <div className="alert alert-info" role="alert">
                  <h4 className="alert-heading">Loading...</h4>
                  <p>Please wait a sec</p><hr />
                  <a href="/contact" className="card-link">&laquo; Back to Contact</a>
                </div> :
                <div className="card" style={{ width: "18rem" }}>
                  <div className="card-body">
                    <h5 className="card-title">{data.nama}</h5>
                    <p className="card-text">{`Number Phone : ${data.number}`}</p>
                    <p className="card-text">Email : {data.email}</p>
                    <div className="button-container">
                      <button className="btn btn-primary badge badge-pill" onClick={() => toEdit()}>Edit</button>
                      <button className="btn btn-danger badge badge-pill" onClick={() => deleteData()}>Delete</button>
                    </div>
                    <a href="/contact" className="card-link d-block mt-2">&laquo; Back to Contact</a>
                  </div>
                </div>
            }
          </div>
        </div>
      </div>
    </div>
  )
}
