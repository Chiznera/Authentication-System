const getState = ({ getStore, getActions, setStore }) => {
  let backendUrl =
    "https://3001-chiznera-authentication-oei0x7z8zk4.ws-us67.gitpod.io";

  return {
    store: {
      logStatus: false,
    },
    actions: {
      login: (email, password) => {
        let requestOptions = {
          method: "POST",
          headers: { "Content-type": "application/json" },
          body: JSON.stringify({ email: email, password: password }),
        };

        fetch(backendUrl + "/api/login", requestOptions)
          .then((response) => response.text())
          .then((result) => {
            console.log(result);
            setStore({ logStatus: true });
          })
          .catch((error) => console.log("error", error));
      },
    },
  };
};

export default getState;
