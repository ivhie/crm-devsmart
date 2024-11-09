import axios from "axios";
import { useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react"
import { setState } from "react"
import axiosClient from "../axiosClient.jsx";
import { useStateContext } from "../contexts/contextprovider.jsx";

export default function Register(){
    
    useEffect(()=> {
        setErrormsg();
    }, [])


    const nameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    //const err_passmsgRef = useRef();
    //const err_emailmsgRef = useRef();
    const error_msg = [];
    
    const [errormsg, setErrormsg] = useState([]);
    const {setUser, setToken} = useStateContext();

    const Submit =  (ev) =>{
        ev.preventDefault();
        const payload = {
            name: nameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value,
        }
        axiosClient.post("/register",payload).then(({data})=>{
            setUser(data.user);
            setToken(data.token);
    }).catch(err => {
        const response = err.response;
       // console.log(response.data.errors['email'][0]);
       // const error_msg = [];
        ///if(response.data.errors['email'][0]){
            //error_msg.push(<p key="3">additionnal</p>)
            // error_msg = [];
           // error_msg = [
           // response.data.errors['email'][0]
        //];
          //  this.setState({setErrormsg: response.data.errors['email'][0]});
            // console.log(response.data.errors['email'][0])  
      //  }
        //if(response.data.errors['password'][0]){
          //  error_msg.push(<p key="3">Wrong Password</p>)
        //}
         
        if(response && response.status === 422){
            console.log(response.data.errors);
        }
    });
}

    return(
        <div className="login-signup-form animated fadeinDown">
            <div className="form">
                <h1 className="title">
                    Create A New Account
                </h1>
                <form onSubmit={Submit}>
                    <div id='error_msg'> 

                   
                     

                    </div>
                    <input ref={nameRef} type="name" placeholder="Name" />
                    <input ref={emailRef} type="email" placeholder="Email" />
                    <input ref={passwordRef} type="password" placeholder="Password" />
                    <button className="btn btn-block">Register</button>
                    <p className="message">
                        Already Have An Account? <Link to= '/login'>Login</Link>
                    </p>
                </form>
            </div>
        </div>
    )
}