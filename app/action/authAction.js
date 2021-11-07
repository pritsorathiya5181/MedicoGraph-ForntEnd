import AsyncStorage from '@react-native-community/async-storage';
import {Alert} from 'react-native';
import * as CONSTANT from '../utils/Constants';

export function SIGNUPUSER(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'SIGNUP_USER',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          email: value.email,
          password: value.password,
          first_name: value.first_name,
          last_name: value.last_name,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${CONSTANT.BASE_URL}api/auth/register`, requestOptions)
          .then(response => response.text())
          .then(result => {
            console.log(result);
            if (result.success) {
              dispatch({
                type: 'SIGNUP_USER',
                subtype: 'success',
                SignUpUser: result.data,
              });
              resolve(result);
            } else {
              Alert.alert(result.message);
              rejects(result.message);
            }
          })
          .catch(error => {
            console.log('error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'SIGNUP_USER',
          error: e,
        });
      }
    });
  };
}

export function LOGINUSER(value) {
  var data = new FormData();

  data.append('email', value.email);
  data.append('password', value.password);

  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        dispatch({
          type: 'LOGIN_USER',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          email: value.email,
          password: value.password,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${CONSTANT.BASE_URL}api/auth/login`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            if (result.success) {
              console.log('user');
              AsyncStorage.setItem('USER_TOKEN', result.data.token);
            }
            dispatch({
              type: 'LOGIN_USER',
              subtype: 'success',
              LoginUser: result.data,
            });
            resolve(result);
          })
          .catch(error => console.log('error', error));
      } catch (e) {
        dispatch({
          type: 'LOGIN_USER',
          error: e,
        });
      }
    });
  };
}

export function createPersonalInfo(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        // let userToken =
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NWRlOWNmZmFkOTVlMWYyOWYxOTE3In0sImlhdCI6MTYzNjE3MjY4MywiZXhwIjoxNjM2NTMyNjgzfQ.OVdjb7qE7Zh4mnM5j0Z1FqkAjFmwedlBoCHPArXwxjc';
        console.log('userToken===', userToken);

        dispatch({
          type: 'CREATE_PERSONAL_INFO',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify(value);

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${CONSTANT.BASE_URL}api/auth/update`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            dispatch({
              type: 'CREATE_PERSONAL_INFO',
              subtype: 'success',
              PersonalInfo: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'LOGIN_USER',
          error: e,
        });
      }
    });
  };
}

export function createMedicalInfo(value) {
  console.log('reachedd hrere');
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        // let userToken =
        // 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjE4NWRlOWNmZmFkOTVlMWYyOWYxOTE3In0sImlhdCI6MTYzNjE3MjY4MywiZXhwIjoxNjM2NTMyNjgzfQ.OVdjb7qE7Zh4mnM5j0Z1FqkAjFmwedlBoCHPArXwxjc';
        console.log('userToken===', userToken);

        dispatch({
          type: 'CREATE_MEDICAL_INFO',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          bloodGroup: value.bloodGroup,
          height: value.height,
          weight: value.weight,
          hasDiabetes: value.hasDiabetes,
          hasHeartDisease: value.hasHeartDisease,
          hasArthritis: value.hasArthritis,
          hasBloodPressureProblem: value.hasBloodPressureProblem,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${CONSTANT.BASE_URL}api/medical/create`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);

            dispatch({
              type: 'CREATE_MEDICAL_INFO',
              subtype: 'success',
              MedicalInfo: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'LOGIN_USER',
          error: e,
        });
      }
    });
  };
}
