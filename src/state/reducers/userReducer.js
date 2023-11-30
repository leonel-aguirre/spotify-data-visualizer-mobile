export const SET_USER_DATA = "SET_USER_DATA"
// export const SET_TOPS_STATUS = "SET_TOPS_STATUS"
// export const SET_TOP_ARTISTS_SHORT_TERM_STATUS =
//   "SET_TOP_ARTISTS_SHORT_TERM_STATUS"
// export const SET_TOP_ARTISTS_MID_TERM_STATUS = "SET_TOP_ARTISTS_MID_TERM_STATUS"
// export const SET_TOP_ARTISTS_LONG_TERM_STATUS =
//   "SET_TOP_ARTISTS_LONG_TERM_STATUS"
// export const SET_TOP_TRACKS_SHORT_TERM_STATUS =
//   "SET_TOP_TRACKS_SHORT_TERM_STATUS"
// export const SET_TOP_TRACKS_MID_TERM_STATUS = "SET_TOP_TRACKS_MID_TERM_STATUS"
// export const SET_TOP_TRACKS_LONG_TERM_STATUS = "SET_TOP_TRACKS_LONG_TERM_STATUS"
// export const SET_TOP_GENRES_FULL_ACTIVITY = "SET_TOP_GENRES_FULL_ACTIVITY"

export const defaultState = {
  user: {
    userEmail: "",
    userID: "",
    userImageURL: "",
    userName: "",
  },
  topsStatus: {
    artistShortTerm: false,
    artistMidTerm: false,
    artistLongTerm: false,
    trackShortTerm: false,
    trackMidTerm: false,
    trackLongTerm: false,
    genreFullActivity: false,
  },
}

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case SET_USER_DATA:
      return {
        ...state,
        user: { ...action.payload.data },
      }
    // case SET_TOPS_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: { ...action.payload.data },
    //   }
    // case SET_TOP_ARTISTS_SHORT_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       artistShortTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_ARTISTS_MID_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       artistMidTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_ARTISTS_LONG_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       artistLongTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_TRACKS_SHORT_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       trackShortTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_TRACKS_MID_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       trackMidTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_TRACKS_LONG_TERM_STATUS:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       trackLongTerm: action.payload.data,
    //     },
    //   }
    // case SET_TOP_GENRES_FULL_ACTIVITY:
    //   return {
    //     ...state,
    //     topsStatus: {
    //       ...state.topsStatus,
    //       genreFullActivity: action.payload.data,
    //     },
    //   }

    default:
      return state
  }
}

const selectUser = (state) => state.userReducer.user
export const selectTopsStatus = (state) => state.userReducer.topsStatus

export const selectors = {
  selectUser,
  selectTopsStatus,
}

export default reducer
