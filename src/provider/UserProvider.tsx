import React,{createContext} from "react"
import {AuthenticationDetails, CognitoUser, CognitoUserSession } from "amazon-cognito-identity-js"
import { userPool } from '../index';
import axios from 'axios';

export const UserAccountContext = createContext(null as any);

export const UserAccountProvider: React.FC<{children?: React.ReactElement|React.ReactElement[]}> = (props) => {

    const getValidSession = () => {
        const user = userPool.getCurrentUser();
        return user?.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            console.log(err);   
            return false;
          }
      
          // Return whether the session is valid
          if (session && session.isValid()) {
            const idToken = session.getIdToken().getJwtToken();
            axios.defaults.headers.common['token'] = idToken;
            return true;
          }
      
          return false;
        });
      }

      const getSession = () => {
        const user = userPool.getCurrentUser();
        return user?.getSession((err: Error, session: CognitoUserSession | null) => {
          if (err) {
            console.log(err);   
            return false;
          }
      
          // Return whether the session is valid
          if (session && session.isValid()) {
            const idToken = session.getIdToken().getJwtToken();
            axios.defaults.headers.common['token'] = idToken;
            return session;
          }
      
          return false;
        });
      }

    const authenticate = async (Username:string,Password:string)=>{        
        return await new Promise<{data:CognitoUserSession}>((resolve,reject)=>{
            const user = new CognitoUser({Username, Pool: userPool})
            const authDetails = new AuthenticationDetails({Username,Password})
            user.authenticateUser(authDetails,{
                onSuccess: function (data) {
                    const idToken = data.getIdToken().getJwtToken();
                    axios.defaults.headers.common['token'] = idToken;
                    resolve({data})
                },
                onFailure: function (err) {
                    alert("Nom d'utilisateur ou mot de passe incorrect");
                    reject(err)


                },
                newPasswordRequired: function (data) {
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
            return true;
        }
    }

    return <UserAccountContext.Provider value={{authenticate, getValidSession,getSession,logOut}}>{props.children}</UserAccountContext.Provider>;
};