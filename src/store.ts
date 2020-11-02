import { createStore } from 'redux'

export interface IRootState {
}

const initialState: IRootState = {
}

const changeState = (state = initialState, { type = '', ...rest }): IRootState => {
  switch (type) {
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
