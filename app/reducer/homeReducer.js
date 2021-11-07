const initialState = {};

export default function home(state = initialState, action = {}) {
  switch (action.type) {
    case 'GET_RECORDS': {
      return {
        ...state,
        homeDataError: action.error ? action.error : null,
        homeDataSuccess: action.subtype === 'success',
        homeDataLoading: action.subtype === 'loading',
        homeData:
          action.subtype === 'success' ? action.homeData : state.homeData,
      };
    }

    case 'ADD_RECORD': {
      return {
        ...state,
        addDataError: action.error ? action.error : null,
        addDataSuccess: action.subtype === 'success',
        addDataLoading: action.subtype === 'loading',
        addData: action.subtype === 'success' ? action.addData : state.addData,
      };
    }

    case 'UPDATE_RECORD': {
      return {
        ...state,
        updateDataError: action.error ? action.error : null,
        updateDataSuccess: action.subtype === 'success',
        updateDataLoading: action.subtype === 'loading',
        updateData:
          action.subtype === 'success' ? action.updateData : state.updateData,
      };
    }

    case 'DELETE_RECORD': {
      return {
        ...state,
        deleteDataError: action.error ? action.error : null,
        deleteDataSuccess: action.subtype === 'success',
        deleteDataLoading: action.subtype === 'loading',
        deleteData:
          action.subtype === 'success' ? action.deleteData : state.deleteData,
      };
    }

    case 'FAMILY_DATA': {
      return {
        ...state,
        familyDataError: action.error ? action.error : null,
        familyDataSuccess: action.subtype === 'success',
        familyDataLoading: action.subtype === 'loading',
        familyData:
          action.subtype === 'success' ? action.familyData : state.familyData,
      };
    }

    case 'CREATE_FAMILY': {
      return {
        ...state,
        createFamilyError: action.error ? action.error : null,
        createFamilySuccess: action.subtype === 'success',
        createFamilyLoading: action.subtype === 'loading',
        createFamily:
          action.subtype === 'success'
            ? action.createFamily
            : state.createFamily,
      };
    }

    case 'UPDATE_FAMILY': {
      return {
        ...state,
        updateFamilyError: action.error ? action.error : null,
        updateFamilySuccess: action.subtype === 'success',
        updateFamilyLoading: action.subtype === 'loading',
        updateFamily:
          action.subtype === 'success'
            ? action.updateFamily
            : state.updateFamily,
      };
    }

    default:
      return state;
  }
}
