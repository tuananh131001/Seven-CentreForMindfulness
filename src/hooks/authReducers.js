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
  currentStreak: null,
  lastUsageDate: null,
  longestStreak: null,
  isCompletedTest: null,
  assessmentScore: null,
}

export const SignInReducer = (state, action) => {
  switch (action.type) {
    case 'SIGN_IN':
      return {
        ...state,
        isLoading: false,
        uid: action.payload.uid,
      }
    case 'SET_TEST_STATUS':
      return {
        ...state,
        isCompletedTest: true,
      }
    case 'SIGN_OUT':
      return {
        ...state,
        isLoading: false,
        uid: null,
        name: null,
        email: null,
        avatar: null,
        gender: null,
        age: null,
        location: null,
        phone: null,
        currentStreak: null,
        lastUsageDate: null,
        longestStreak: null,
        isCompletedTest: null,
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
        currentStreak: action.payload.currentStreak ?? null,
        lastUsageDate: action.payload.lastUsageDate ?? null,
        longestStreak: action.payload.longestStreak ?? null,
        isCompletedTest: action.payload.isCompletedTest ?? null,
      }
    case 'SET_AVATAR':
      return {
        ...state,
        isLoading: false,
        avatar: action.payload.avatar,
      }
    case 'SET_USER_STREAK':
      return {
        ...state,
        isLoading: false,
        lastUsageDate: action.payload.lastUsageDate,
        currentStreak: action.payload.currentStreak,
        longestStreak: action.payload.longestStreak,
      }
    default:
      return state
  }
}
