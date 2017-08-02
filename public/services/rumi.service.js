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

    const logIn = async (username, password) => {
      console.log('inside signup service')
      let userInfo = {
        username,
        password,
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

    const getUserRumis = async (id) => {
      if (id) {
        return await $http({
          method: 'GET',
          url: `http://69f9f148.ngrok.io/v1/useritems/${id}`,
          headers: {
            'Content-Type': 'application/json',
          }
        })
          .then(resp => {
            this.userInfo = resp.data;
            getUserRumis(this.userInfo.id);
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

    const createRumi = (info) => {
  // name = req.body.name;
  // image = req.body.image;
  // description = req.body.description;
  // times = req.body.times;
  // requester = req.body.requester;
  // acceptor = req.body.acceptor;
  // sendBy = req.body.sendBy;
  // sendInfo = req.body.sendInfo;
      // let rumiInfo = {
      //   name,
      //   image,
      //   description,
      //   times,
      //   requester,
      //   acceptor,
      //   sendBy,
      //   sendInfo
      // }
      // return await $http({
      //   method: 'POST',
      //   url: 'http://69f9f148.ngrok.io/v1/signup',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   data: userInfo,
      // })
      //   .then(resp => {
      //     return resp.data
      //   })
      //   .catch(err => {
      //     return err.data
      //   });
    }

    return {
      signUp,
      logIn,
      getUserRumis,
      getUserInfo,
      validateEmail
    }
  })