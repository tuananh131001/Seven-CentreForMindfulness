export const initialState = {
  isLoading: true,
  userName: null,
  userEmail: null,
  userAvatar: null,
  userAge: null,
  userGender: null,
  uid: null,
}

export const SignInReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        uid: action.payload.uid,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        isLoading: false,
        uid: null,
      }
    case 'UPDATE_SIGN_IN':
      return {
        ...state,
        isLoading: false,
        userName: action.payload.userName,
        userEmail: action.payload.userEmail,
        userAvatar: action.payload.userAvatar,
        userAge: action.payload.userAge,
        userGender: action.payload.userGender,
      }
    default:
      return state
  }
}
