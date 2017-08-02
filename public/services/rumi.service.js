angular.module('rumi.service', [])
  .factory('RumiService', function ($http, $location) {
    this.userInfo = null;

    const signUp = async (username, password, email, number) => {
      console.log('inside signup service')
      let userInfo = {
        username,
        password,
        email,
        number
      }
      return await $http({
          method: 'POST',
          url: 'http://69f9f148.ngrok.io/v1/signup',
          headers: {
            'Content-Type': 'application/json',
          },
          data: userInfo,
        })
        .then(resp => {
          this.userInfo = resp.data;
          getUserRumis(this.userInfo.id);
          return resp.data
        })
        .catch(err => {
          return err.data
        });
    }

    const logIn = () => {

    }

    const getUserRumis = (id) => {
      if (id) {
        // get a users rumis from the /v1/useritems/* endpoint 
        // return await $http({
        //   method: 'GET',
        //   url: `http://69f9f148.ngrok.io/v1/useritems/${id}`,
        //   headers: {
        //     'Content-Type': 'application/json',
        //   }
        // })
        //   .then(resp => {
        //     this.userInfo = resp.data;
        //     getUserRumis(this.userInfo.id);
        //     return resp.data
        //   })
        //   .catch(err => {
        //     return err.data
        //   });
      } else {
        return [];
      }
    }

    const getUserInfo = () => {
      return this.userInfo;
    }

    return {
      signUp,
      getUserRumis,
      getUserInfo
    }
  })