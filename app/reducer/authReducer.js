const initialState = {
  loginEmailPasswordLoading: false,
  loginUser: {},
};

export default function auth(state = initialState, action = {}) {
  switch (action.type) {
    case 'SIGNUP_USER': {
      return {
        ...state,
        SignUpUserError: action.error ? action.error : null,
        SignUpUserSuccess: action.subtype === 'success',
        SignUpUserLoading: action.subtype === 'loading',
        SignUpUser:
          action.subtype === 'success' ? action.SignUpUser : state.SignUpUser,
      };
    }
    case 'LOGIN_USER': {
      return {
        ...state,
        LoginUserError: action.error ? action.error : null,
        LoginUserSuccess: action.subtype === 'success',
        LoginUserLoading: action.subtype === 'loading',
        LoginUser:
          action.subtype === 'success' ? action.LoginUser : state.LoginUser,
      };
    }
    case 'CREATE_PERSONAL_INFO': {
      return {
        ...state,
        PersonalInfoError: action.error ? action.error : null,
        PersonalInfoSuccess: action.subtype === 'success',
        PersonalInfoLoading: action.subtype === 'loading',
        PersonalInfo:
          action.subtype === 'success'
            ? action.PersonalInfo
            : state.PersonalInfo,
      };
    }
    case 'CREATE_MEDICAL_INFO': {
      return {
        ...state,
        MedicalInfoError: action.error ? action.error : null,
        MedicalInfoSuccess: action.subtype === 'success',
        MedicalInfoLoading: action.subtype === 'loading',
        MedicalInfo:
          action.subtype === 'success' ? action.MedicalInfo : state.MedicalInfo,
      };
    }

    default:
      return state;
  }
}
