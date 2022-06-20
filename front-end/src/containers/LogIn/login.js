import React, { useContext, useState, Component } from "react";
//import "react-toastify/dist/ReactToastify.css";
// import axios from "axios";
// import { ToastContainer, toast } from "react-toastify";
// import { useRouter, withRouter } from "next/router";
import { useNavigate } from "react-router-dom";
import NavBarMain from "../../components/NavBarMain/NavBarMain";
import "./login.css";

const Login = () => {
    const [email, setEmail] = useState("");
    const [parola, setParola] = useState("");
    const history = useNavigate();

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const formValues = {
    //         email,
    //         parola,
    //     };
    //     //console.log(formValues);
    //     try {
    //         if (email === "") {
    //             toast.error("Introduceti email-ul!");
    //             return;
    //         }

    //         if (
    //             !/([a-zA-Z0-9]+)([_.-{1}])?([a-zA-Z0-9]+)@([a-zA-Z0-9]+)([.])([a-zA-Z.]+)/g.test(
    //                 email
    //             )
    //         ) {
    //             toast.error("Formatul email-ului nu este valid!");
    //             return;
    //         }

    //         if (parola === "") {
    //             toast.error("Introduceti parola!");
    //             return;
    //         }

    //         const response = await axios.post(
    //             "http://localhost:8080/login/",
    //             formValues
    //         );

    //         if (response.data && response.data.login === true) {
    //             localStorage.setItem("id", response.data.user.id);
    //             history("/login");
    //         } else {
    //             toast.error(response.data.message);
    //         }
    //     } catch (err) {
    //         toast.error(err.response.data.message);
    //         console.warn(err);
    //     }
    // };

    return (
        <div className="login">
            <NavBarMain />
            <div className="login-right">
                <form className="container">
                    <h1 className="title">Bine ai venit!</h1>
                    <div className="inputContainer">
                        <input
                            type="text"
                            placeholder="Email"
                            name="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="register-input"
                        />
                    </div>
                    <div className="inputContainer">
                        <input
                            type="password"
                            placeholder="Introduceti parola"
                            name="parola"
                            value={parola}
                            onChange={(e) => setParola(e.target.value)}
                            className="register-input"
                        />
                    </div>
                    <div className="loginBtns">
                        <button
                            type="submit"
                            //onClick={handleSubmit}
                            className="submit-btn-login"
                        >
                            Login
                        </button>
                        <span className="form-input-login">
                            Reggister <a href="/register">here</a>
                        </span>
                    </div>
                    <div className="loginBtns"></div>
                </form>
            </div>
        </div>
    );
};

export default Login;
