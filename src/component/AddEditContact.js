import { useState, Component, useEffect, useRef } from 'react';
import { Header } from './Header';
import { useNavigate, useLocation } from "react-router-dom"
import { useCookies } from 'react-cookie';
import useCheckJWT from './CheckLogin';
import LoadingBar from 'react-top-loading-bar'

const axios = require('axios').default;

export const AddEditContact = (value) => {

    const redirect = useNavigate()
    const location = useLocation()
    const [cookies, setCookies] = useCookies()
    const [ID, setID] = useState("")
    const [PostNama, setPostNama] = useState("")
    const [PostNumber, setPostNumber] = useState("")
    const [PostEmail, setPostEmail] = useState("")
    const [Status, setStatus] = useState([])
    const [checkToken] = useCheckJWT()
    const [loading, setLoading] = useState(0)
    const changeNama = (e) => setPostNama(e.target.value)
    const changeNumber = (e) => setPostNumber(e.target.value)
    const changeEmail = (e) => setPostEmail(e.target.value)
    const currentUser = location?.state?.userData

    useEffect(() => {
        if (!cookies.access_token) return redirect("/login")
        checkToken()
    }, [])


    useEffect(() => {
        if (value.page == "Edit Contact" && currentUser?._id !== undefined) {
            ambilData();
        }
        else if (value.page == "Add Contact") {
            return;
        }
        else {
            redirect('/contact')
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(70)
        const dataHandle = {
            nama: PostNama,
            email: PostEmail,
            number: PostNumber
        }

        if (value.page == "Add Contact") {
            const response = await axios.post('https://backend-crud-app.herokuapp.com/contact/add', dataHandle)
            if (response?.data[0]?.msg !== undefined)
                return setStatus(response?.data)
            else
                setCookies("SuccessMsg", "Data has been successfully Added", {
                    path: "/contact",
                    maxAge: "5"
                })
            setCookies("loadingProgress", 70, { path: "/", maxAge: "5" })
            return redirect("/contact")

        } else if (value.page == "Edit Contact") {
            const response = await axios.patch(`https://backend-crud-app.herokuapp.com/contact/${ID}`, dataHandle)
            if (response?.data[0]?.msg !== undefined)
                return setStatus(response?.data)
            else
                setCookies("SuccessMsg", "Data has been successfully Updated", {
                    path: "/",
                    maxAge: "5"
                })
            setCookies("loadingProgress", 70, { path: "/", maxAge: "5" })
            return redirect("/contact")
        }
    }

    const ambilData = () => {
        setID(currentUser?._id)
        setPostNama(currentUser?.nama)
        setPostNumber(currentUser?.number)
        setPostEmail(currentUser?.email)
    }

    const form = () => {
        return <div>
            <LoadingBar color="#85edf2" progress={loading} shadow={true} />
            <Header status="contact" />
            <div className="container">
                <h2 className="mt-3">{value.page}</h2><hr />
                {
                    Status.length !== 0 ?
                        <div className="alert alert-danger" role="alert">
                            {Status.map((status, index) => (
                                <h6 key={index}>{status.msg}</h6>
                            ))}
                        </div>
                        : <div></div>
                }
                <div className="form-group">
                    <div className="mb-3">
                        <label htmlFor="fullName" className="form-label">Your Name</label>
                        <input className="form-control" id="fullName" name="nama" value={PostNama} onChange={changeNama} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control" id="exampleInputEmail1" name="email" value={PostEmail} onChange={changeEmail} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="number" className="form-label">Mobile Phone</label>
                        <input className="form-control" id="number" name="number" value={PostNumber} onChange={changeNumber} required />
                    </div>
                    <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Submit</button>
                </div>
            </div>
        </div>
    }

    return form()
}