import { PublicClientApplication } from "@azure/msal-browser";
import { AADConfig, config } from "config/config";
import { createContext, useContext, useEffect, useState } from "react";
import User from "types/User";

interface ContextProps {
  user: User | null;
  login: () => Promise<any>;
  logout: any;
  isStoredToken: () => boolean;
  restore: () => Promise<void>;
  acquireAccessToken: () => any;
}

const AuthContext = createContext({} as ContextProps);

const AuthProvider = (props: any) => {
  const [user, setUser] = useState<User | null>(null);
  const [publicClientApplication] = useState<PublicClientApplication>(
    new PublicClientApplication({
      auth: {
        clientId: AADConfig.appId,
        redirectUri: AADConfig.redirectUri,
        authority: AADConfig.authority,
        postLogoutRedirectUri: AADConfig.logoutRedirectUri,
      },
      cache: {
        cacheLocation: "localStorage",
        storeAuthStateInCookie: true,
      },
    })
  );

  const acquireAccessToken = () => {
    const userJSON = localStorage.getItem(config.localStorage.userKey);
    let user: User | undefined;

    if (userJSON) {
      user = JSON.parse(userJSON);
    }
    if (!user || !user.token || !user.homeAccountId) {
      return;
    }

    if (publicClientApplication.getAccountByHomeId(user?.homeAccountId || "")) {
      var tokenRequest = {
        scopes: ["api://9911dd89-b9c5-4de4-b3bb-265d5c214e91/Doc.Test"],
      };
      publicClientApplication.setActiveAccount(
        publicClientApplication.getAccountByHomeId(user.homeAccountId)
      );
      publicClientApplication
        .acquireTokenSilent(tokenRequest)
        .then((response) => {
          // get access token from response
          if (localStorage.getItem(config.localStorage.userKey) != null) {
            let cloneUser: User = JSON.parse(
              localStorage.getItem(config.localStorage.userKey) || ""
            );
            setUser({ ...cloneUser, accessToken: response.accessToken, idToken: response.idToken });
            localStorage.setItem(
              config.localStorage.userKey,
              JSON.stringify({
                ...cloneUser,
                accessToken: response.accessToken,
                idToken: response.idToken
              })
            );
          }
          console.log("accessToken", response);
        })
        .catch((err) => {
          console.log(err);
          // could also check if err instance of InteractionRequiredAuthError if you can import the class.
          if (err.name === "InteractionRequiredAuthError") {
            return publicClientApplication
              .acquireTokenPopup(tokenRequest)
              .then((response) => {
                // get access token from response
                console.log("OK");
              })
              .catch((err) => {
                console.log("err nestewd", err);
                // handle error
              });
          }
        });
    } else {
      console.log(
        "user is not logged in, you will need to log them in to acquire a token"
      );
    }
  };

  const login = async () => {
    try {
      const loginResponse = await publicClientApplication.loginPopup({
        scopes: AADConfig.scopes,
      });

      if (loginResponse) { console.log("hehe", loginResponse)
        let cloneUser = {
          ...user,
          email: loginResponse.account && loginResponse.account.username,
          name: loginResponse.account && loginResponse.account.name,
          tokenType: loginResponse.tokenType,
          token: loginResponse.accessToken,
          homeAccountId:
            loginResponse.account && loginResponse.account.homeAccountId,
          expiresOn:
            loginResponse.expiresOn && loginResponse.expiresOn.getTime(),
        };

        setUser(cloneUser);
        localStorage.setItem(
          config.localStorage.userKey,
          JSON.stringify(cloneUser)
        );
        return Promise.resolve("OK")
      }
    } catch (err) {
      console.log(err);
      setUser(null);
      return Promise.reject("Not OK")
    }
  };

  const logout = async () => {
    const logoutRequest = {
      account: publicClientApplication.getAccountByHomeId(
        user?.homeAccountId || ""
      ),
      mainWindowRedirectUri: "http://localhost:8080/login",
    };
    await publicClientApplication.logoutPopup(logoutRequest);
    localStorage.removeItem(config.localStorage.userKey);
    setUser(null);
  };

  const isStoredToken = (): boolean => {
    const userJSON = localStorage.getItem(config.localStorage.userKey);
    let user: User | undefined;

    if (userJSON) {
      user = JSON.parse(userJSON);
    }
    if (user && user.token) {
      return true;
    }
    return false;
  };

  const restore = (): Promise<void> => {
    const userJSON = localStorage.getItem(config.localStorage.userKey);
    if (userJSON) {
      let user: User | null;
      user = JSON.parse(userJSON);
      setUser(user);
    } else {
      setUser(null);
    }
    return Promise.resolve();
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isStoredToken,
        restore,
        acquireAccessToken,
      }}
    >
      <>{props.children}</>
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };
