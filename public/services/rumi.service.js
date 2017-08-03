angular.module('rumi.service', [])
  .factory('RumiService', function ($http, $location, $window) {
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
          $window.localStorage.setItem('id', this.userInfo.id)
          getUserRumis(this.userInfo.id);
          return resp.data
        })
        .catch(err => {
          return err.data
        });
    }

    const logIn = async (username, password) => {
      console.log('inside login service')
      let userInfo = {
        username,
        password,
      }
      return await $http({
        method: 'POST',
        url: 'http://69f9f148.ngrok.io/v1/login',
        headers: {
          'Content-Type': 'application/json',
        },
        data: userInfo,
      })
        .then(resp => {
          this.userInfo = resp.data;
          console.log(this.userInfo)
          $window.localStorage.setItem('id', this.userInfo.id)
          getUserRumis(this.userInfo.id);
          return resp.data
        })
        .catch(err => {
          return err.data
        });
    }

    const getUserRumis = async (id) => {
      console.log(typeof id)
      console.log(id)
      if (id) {
        return await $http({
          method: 'GET',
          url: `http://69f9f148.ngrok.io/v1/useritems/${id}`,
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(resp => {
            return resp.data
          })
          .catch(err => {
            return err.data
          });
      } else {
        return [];
      }
    }

    const getUserInfo = () => {
      return this.userInfo;
    }
    const validateEmail = async (email) => {
      console.log('inside validate email')
      return await $http({
        method: 'GET',
        url: `http://69f9f148.ngrok.io/v1/validateemail/${email}`,
        headers: {
          'Content-Type': 'application/json',
        }
      })
        .then(resp => {
          return resp.data
        })
        .catch(err => {
          return err.data
        });
    }

    const createRumi = async (info) => {
      console.log("info inside create rumi", info)
      return await $http({
        method: 'POST',
        url: 'http://69f9f148.ngrok.io/v1/createitem',
        headers: {
          'Content-Type': 'application/json',
        },
        data: info,
      })
        .then(resp => {
          return resp.data
        })
        .catch(err => {
          return err.data
        });
    }

    return {
      signUp,
      logIn,
      getUserRumis,
      getUserInfo,
      validateEmail,
      createRumi
    }
  })