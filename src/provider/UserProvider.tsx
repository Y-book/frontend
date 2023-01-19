import React,{createContext} from "react"
import {AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js"
import { userPool } from '../index';
import axios from 'axios';
import Router from "../router/Router";

export const UserAccountContext = createContext(null as any);

export const UserAccountProvider: React.FC<{children?: React.ReactElement|React.ReactElement[]}> = (props) => {

    const getValidSession = () => {
        const user = userPool.getCurrentUser();
        return user?.getSession((err: any, session: any) => {
          if (err) {
            console.log(err);   
            return false;
          }
      
          // Return whether the session is valid
          if (session.isValid()) {
            const idToken = session.getIdToken().getJwtToken();
            axios.defaults.headers.common['token'] = idToken;
            return true;
          }
      
          return false;
        });
      }

      const getSession = () => {
        const user = userPool.getCurrentUser();
        return user?.getSession((err: any, session: any) => {
          if (err) {
            console.log(err);   
            return false;
          }
      
          // Return whether the session is valid
          if (session.isValid()) {
            const idToken = session.getIdToken().getJwtToken();
            axios.defaults.headers.common['token'] = idToken;
            return session;
          }
      
          return false;
        });
      }


    // const getSession = async () => {
    //     return await new Promise<{session:CognitoUserSession}>((resolve, reject) => {
    //         const user = userPool.getCurrentUser();
    //         console.log("user:",user)
    //         if (user) {
    //             user.getSession((err:any, session:CognitoUserSession) => {
                    
    //                 if (err) {
    //                     console.error(err);
    //                     reject(err);

    //                 } else {
    //                     const idToken = session.getIdToken().getJwtToken();
    //                     axios.defaults.headers.common['token'] = idToken;
    //                     resolve({session});
    //                 }
    //             });
    //         } else {
    //             // console.log("no user")
    //             reject("no user");
    //             // return null
    //         }

    //     })
    // }

    const authenticate = async (Username:string,Password:string)=>{        
        return await new Promise<{data:CognitoUserSession}>((resolve,reject)=>{
            const user = new CognitoUser({Username, Pool: userPool})
            const authDetails = new AuthenticationDetails({Username,Password})
            user.authenticateUser(authDetails,{
                onSuccess: function (data) {
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
                onFailure: function (err) {
                    console.log("onFailure:",err)
                    reject(err)


                },
                newPasswordRequired: function (data) {
                    console.log("newPasswordRequired:",data)
                    resolve(data)
                }
            });
        })
    }

    const logOut = () => {
        const user = userPool.getCurrentUser();
        if (user) {
            user.signOut();
            axios.defaults.headers.common['token'] = "";
            // console.log("logout")
            return true;
        }
    }

    return <UserAccountContext.Provider value={{authenticate, getValidSession,getSession,logOut}}>{props.children}</UserAccountContext.Provider>;
};