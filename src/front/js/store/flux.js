const getState = ({ getStore, getActions, setStore }) => {
  let backendUrl = process.env.BACKEND_URL;

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
            sessionStorage.setItem("access_token", result);
            setStore({ logStatus: true });
          })
          .catch((error) => console.log("error", error));
      },

      logout: () => {
        setStore({ logStatus: false });
        return true;
      },
    },
  };
};

export default getState;
