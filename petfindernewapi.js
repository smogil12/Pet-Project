(function(global) {
  // module constants
  let MAX_RETRIES = 3;

  // module vars
  let authHeader = "";
  let numRetries = 0;

  // petfinder api instance
  const PetfinderAPI = axios.create({
    baseURL: "https://api.petfinder.com/v2/"
  });

  //
  function getSessionToken(cb = null) {
    PetfinderAPI.post("/oauth2/token", {
      grant_type: "client_credentials",
      client_id: "qIVZCmwRjPu27raSLTxYbcZylvbJtrNtYa3aTTLcEdnVF1i2LD",
      client_secret: "TVTcZSdtcAoPShi6XLi2RzYbXltGdn1ogPhXLg4U"
    }).then(function(response) {
      const { token_type, access_token } = response.data;
      authHeader = `${token_type} ${access_token}`;
      if (cb) {
        cb();
      }
    });
  }

  function getPets(filters, cb = null) {
    let queryParams = "type=dog&";
    for (let filter in filters) {
      if (filters[filter]) {
        queryParams += `${filter}=${filters[filter]}&`;
      }
    }
    PetfinderAPI.get(`/animals?${queryParams}`, {
      headers: { Authorization: authHeader }
    })
      .then(function(response) {
        if (cb && response.data && response.data.animals) {
          cb(response.data.animals);
        }
      })
      .catch(function(error) {
        if (numRetries < MAX_RETRIES) {
          console.warn("Retrying getPets request...");
          numRetries += 1;
          getSessionToken(getPets.bind(this, filters, cb));
        }
      });
  }

  global.PetfinderAPI = {
    getPets: getPets
  };
})(window);
