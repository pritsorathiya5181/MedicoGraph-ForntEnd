import {combineReducers} from 'redux';
import auth from './authReducer.js';
import home from './homeReducer.js';

const appReducer = combineReducers({
  auth,
  home,
});

const initialState = {};

const rootReducer = (state = initialState, action) => {
  if (action.type === 'restoreState') {
    if (action.stateToRestore) {
      return {
        ...state,

        auth: {
          ...state.auth,
          ...action.stateToRestore.auth,
        },
        home: {
          ...state.home,
          ...action.stateToRestore.home,
        },
      };
    } else {
      return (state = undefined);
    }
  }
  return appReducer(state, action);
};

export default rootReducer;

// const rootReducer = (state, action) => {
//     return appReducer(state, action)
// }

// export default rootReducer;
