import { createStore } from 'redux'

export interface RootState {
}

const initialState: RootState = {
}

const changeState = (state = initialState, { type = '', ...rest }): RootState => {
  switch (type) {
    default:
      return state
  }
}

const store = createStore(changeState)
export default store
