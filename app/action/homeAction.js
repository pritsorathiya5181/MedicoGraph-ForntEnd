// import { BASE_URL } from '../utils/Constants';
import AsyncStorage from '@react-native-community/async-storage';
import {BASE_URL} from '../utils/Constants';

export function getRecords() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'GET_RECORDS',
          subtype: 'loading',
        });
        console.log('user', userToken);

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}api/record`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result);
            dispatch({
              type: 'GET_RECORDS',
              subtype: 'success',
              recordsList: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'GET_RECENT_DATA',
          error: e,
        });
      }
    });
  };
}

export function addRecords(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'ADD_RECORD',
          subtype: 'loading',
        });
        console.log('user', userToken);

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: value,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}api/record/create`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result);
            dispatch({
              type: 'ADD_RECORD',
              subtype: 'success',
              addData: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'ADD_RECORD',
          error: e,
        });
      }
    });
  };
}

export function updateRecord(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'UPDATE_RECORD',
          subtype: 'loading',
        });
        console.log('user', value);

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: value,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}api/record/update`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result);
            dispatch({
              type: 'UPDATE_RECORD',
              subtype: 'success',
              updateData: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'UPDATE_RECORD',
          error: e,
        });
      }
    });
  };
}

export function deleteRecord(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'DELETE_RECORD',
          subtype: 'loading',
        });
        console.log('user', value);

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var requestOptions = {
          method: 'DELETE',
          headers: myHeaders,
          body: value,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}api/record/delete`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result);
            dispatch({
              type: 'DELETE_RECORD',
              subtype: 'success',
              deleteData: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'DELETE_RECORD',
          error: e,
        });
      }
    });
  };
}

export function getFamilyInfo() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'FAMILY_DATA',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);

        var raw = '';

        var requestOptions = {
          method: 'GET',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}api/patient`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result.success);
            dispatch({
              type: 'FAMILY_DATA',
              subtype: 'success',
              deleteData: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'FAMILY_DATA',
          error: e,
        });
      }
    });
  };
}

export function createFamily(value) {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'CREATE_FAMILY',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          father: value.father,
          mother: value.mother,
        });

        var requestOptions = {
          method: 'POST',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}patient/create`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result.success);
            dispatch({
              type: 'CREATE_FAMILY',
              subtype: 'success',
              createFamily: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'CREATE_FAMILY',
          error: e,
        });
      }
    });
  };
}

export function updateFamily() {
  return function (dispatch, getState) {
    return new Promise(async (resolve, rejects) => {
      try {
        let userToken = await AsyncStorage.getItem('USER_TOKEN');
        dispatch({
          type: 'UPDATE_FAMILY',
          subtype: 'loading',
        });

        var myHeaders = new Headers();
        myHeaders.append('x-auth-token', userToken);
        myHeaders.append('Content-Type', 'application/json');

        var raw = JSON.stringify({
          father: value.father,
          mother: value.mother,
          sibling: value.sibling,
        });

        var requestOptions = {
          method: 'PUT',
          headers: myHeaders,
          body: raw,
          redirect: 'follow',
        };

        fetch(`${BASE_URL}patient/update`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log('result==', result.success);
            dispatch({
              type: 'UPDATE_FAMILY',
              subtype: 'success',
              updateFamily: result.data,
            });
            resolve(result);
          })
          .catch(error => {
            console.log('recent error', error);
            rejects(error);
          });
      } catch (e) {
        dispatch({
          type: 'UPDATE_FAMILY',
          error: e,
        });
      }
    });
  };
}
