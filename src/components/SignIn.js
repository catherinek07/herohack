import React, {useEffect} from "react";
import Deso from 'deso-protocol';
import apiLocation from './APILocation';
import {useNavigate} from 'react-router'

const deso = new Deso();



function SignIn(){
    async function LoginDeso(){
        const request = 3;
        const response = await deso.identity.login(request);
        const requestUser = {
            "PublicKeyBase58Check": response["key"]
          };
        const user = await deso.user.getSingleProfile(requestUser);
        
        console.log(user["Profile"]["Username"]);
        const apiResponse = await fetch(apiLocation + "signin", {
            method: 'POST',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({username: user["Profile"]["Username"], pubkey: user['Profile']['PublicKeyBase58Check']})
          });
        const resJson = await apiResponse.json()
        if(resJson["status"] == "Success"){
            history("/gen");
            window.location.reload(false);
        }
    }
    const history = useNavigate();
    useEffect(() => {
        LoginDeso();
    }, []);
    return (<div>
        
    </div>);
}

export default SignIn