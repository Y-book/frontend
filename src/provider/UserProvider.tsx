import React,{createContext} from "react"
import {AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js"
import { userPool } from '../index';
import axios from 'axios';

export const UserAccountContext = createContext(null as any);

export const UserAccountProvider: React.FC<{children?: React.ReactElement|React.ReactElement[]}> = (props) => {
    const getSession = async () => {
        return await new Promise<{session:CognitoUserSession}>((resolve, reject) => {
            const user = userPool.getCurrentUser();
            if (user) {
                user.getSession((err:any, session:CognitoUserSession) => {
                    if (err) {
                        console.error(err);
                        reject(err);

                    } else {
                    //    console.log("session " +session.isValid()) ;
                    //    console.log(session.getIdToken().getJwtToken());
                        const idToken = session.getIdToken().getJwtToken();
                        axios.defaults.headers.common['token'] = idToken;
                        console.log("Connexion reussie ! idToken:",idToken)
                        resolve({session});
                    }
                });
            }else{
                console.log("no user")
                reject();
            }

        })
    }

    const authenticate = async (Username:string,Password:string)=>{        
        return await new Promise<{data:CognitoUserSession}>((resolve,reject)=>{
            const user = new CognitoUser({Username, Pool: userPool})
            const authDetails = new AuthenticationDetails({Username,Password})
            user.authenticateUser(authDetails,{
                onSuccess:(data)=>{
                    // const accessToken = data.getAccessToken().getJwtToken()
                    // console.log("Connexion reussie ! accessToken:",accessToken)
                    // const refresh = data.getRefreshToken().getToken();
                    // console.log("Connexion reussie ! refresh:",refresh)
                    // /* Use the idToken for Logins Map when Federating User Pools with identity pools or when passing through an Authorization Header to an API Gateway Authorizer */
                    const idToken = data.getIdToken().getJwtToken();
                    axios.defaults.headers.common['token'] = idToken;
                    // console.log("Connexion reussie ! idToken:",idToken)
                    resolve({data})
                },
                onFailure:(err)=>{
                    console.log("onFailure:",err)
                    reject(err)


                },
                newPasswordRequired:(data)=>{
                    console.log("newPasswordRequired:",data)
                    resolve(data)
                }
            });
        })
    }

    const logout = () => {
        const user = userPool.getCurrentUser();
        if (user) {
            user.signOut();
            axios.defaults.headers.common['token'] = "";
            console.log("logout")
        }
    }

    return <UserAccountContext.Provider value={{authenticate,getSession,logout}}>{props.children}</UserAccountContext.Provider>;
};