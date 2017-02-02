
export const startFetchingPicks = () => {
  return {
    type: 'START_FETCH'
  }
}

export const fetchingPicksDone = (response) => {
  return {
    type: 'FETCH_SUCCESS',
    payload: response.data
  }
}

export const startFetchingPickContent = () => {
  return {
    type: 'FETCH_PICK_CONTENT_START'
  }
}

export const fetchingPickContentDone = (response) => {
  return {
    type: 'FETCH_PICK_CONTENT',
    payload: response
  }
}

export const fetchingError = (error) => {
  return {
    type: 'FETCH_ERROR',
    payload: error
  }
}
