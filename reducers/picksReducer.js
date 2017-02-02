
export const picksReducer = (initialState = {
  inError: false,
  inFlight: false,
  error: null,
  data: null,
  pickContent: null
}, action) => {
  switch(action.type) {
    case 'START_FETCH': {
      return {
        ...initialState,
        inFlight: true
      }
    }

    case 'FETCH_SUCCESS': {
      return {
        ...initialState,
        inFlight: false,
        data: action.payload
      }
    }

    case 'FETCH_PICK_CONTENT_START': {
      return {
        ...initialState,
        pickContent: null,
        inFlight: true
      }
    }

    case 'FETCH_PICK_CONTENT': {
      return {
        ...initialState,
        pickContent: action.payload,
        inFlight: false
      }
    }

    case 'FETCH_ERROR': {
      return {
        ...initialState,
        inFlight: false,
        error: action.payload
      }
    }
  }

  return initialState;
}
