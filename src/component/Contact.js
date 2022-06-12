import React, { useEffect, useState, useCallback} from 'react';
import { Header } from './Header';
import FlashMessage from 'react-flash-message';
import { useNavigate, useLocation } from 'react-router';
import { useCookies } from 'react-cookie';
import jwt_decode from 'jwt-decode';
import useCheckJWT from './CheckLogin';
const axios = require('axios').default;

export const Contact = () => {
  const location = useLocation()
  const [cookies, setCookie, removeCookie] = useCookies()
  const [datas, setData] = useState([]);
  const [checkToken] = useCheckJWT()
  const redirect = useNavigate()
  
  useEffect(()=>{
    if (!cookies.access_token) return redirect("/login")
    checkToken()
  },[])


  useEffect(()=>{
      ambilData()
  },[])


const ambilData = async() =>{
    await axios.get('https://backend-crud-app.herokuapp.com/contact').then((x)=>{
      setData(x.data);
    })
  }



const toDetail = (data) =>{
    redirect(`/contact/detail/`, {state : {
        userDataID: data
    }})
}

const logOut = async() =>{
      const userId = jwt_decode(cookies.access_token).userId
      await axios.get(`https://backend-crud-app.herokuapp.com/contact/auth-user/logout/${userId}`).then((x)=>{
          removeCookie("access_token", {path: "/"})
          return redirect("/login")
      })
}



return <div>
    <Header status="contact" />
    <div className="container">
    <div className="contact-width-top border d-flex flex-row justify-content-between">
    <div className="border">
        <a href="/contact/add" className="button-group-1 btn btn-primary btn-md mb-3 mt-3" type="button">Add Contact</a>
        <a href="/user" className="button-group-1 btn btn-primary btn-md mb-3 mt-3 ml-4" type="button">Auth User List</a>
    </div>
    <div>
        <a onClick={logOut} className="button-group-2 btn btn-danger btn-md mb-3 mt-3" type="button">Log Out</a>
        </div>
    </div>
    <div className="row">
    <div className="col-9">
    { (cookies.SuccessMsg !== undefined) ?
        <FlashMessage duration={5000} persistOnHover={true}>
          <div className="alert alert-success mt-3" role="alert">
          {cookies.SuccessMsg}
          </div>
        </FlashMessage>
         :
        <div></div>
    }
    
    <div></div>
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
            { datas.map((data, index)=>(
            <>
              <tr>
              <th scope="row">{index+1}</th>
              <td>{data.nama}</td>
              <td>{data.email}</td>
              <td>{data.number}</td>
              <td><button onClick={()=>toDetail(data._id)} type="button" className="btn btn-success badge">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-info-circle" viewBox="0 0 16 16">
                    <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"/>
                    <path d="m8.93 6.588-2.29.287-.082.38.45.083c.294.07.352.176.288.469l-.738 3.468c-.194.897.105 1.319.808 1.319.545 0 1.178-.252 1.465-.598l.088-.416c-.2.176-.492.246-.686.246-.275 0-.375-.193-.304-.533L8.93 6.588zM9 4.5a1 1 0 1 1-2 0 1 1 0 0 1 2 0z"/>
                  </svg>
                  Detail
                </button>
              </td>
              </tr>
            </>
            ))}
        </tbody>
    </table>
    </div>
    </div>
    </div>
</div>;
};
