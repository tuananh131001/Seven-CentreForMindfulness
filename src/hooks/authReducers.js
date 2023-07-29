export const initialState = {
  isLoading: true,
  name: null,
  email: null,
  avatar: null,
  age: null,
  gender: null,
  location: null,
  uid: null,
  phone: null,
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
    case 'SET_USER':
      return {
        ...state,
        isLoading: false,
        name: action.payload.name,
        email: action.payload.email,
        avatar: action.payload.avatar,
        gender: action.payload.gender,
        age: action.payload.age,
        location: action.payload.location ?? null,
        phone: action.payload.phone ?? null,
      }
    case 'SET_AVATAR':
      return {
        ...state,
        isLoading: false,
        avatar: action.payload.avatar,
      }
    default:
      return state
  }
}
