import {
 	GET_HYPUR_ACCOUNT,
	GET_HYPUR_TEST_USERS,
  GET_HYPUR_PROFILES,
	SET_HYPUR_SELECTED_PROFILE,
	UPDATE_HYPUR_ACCOUNT
} from '../actions/actionTypes';

const initialState = {
	currentHypur : {},
	userProfiles : [],
	testUsers : [],
  selectedProfile: {}
}


function hypur(state = initialState, action) {
  if (action.error) {
    return {
      result: state.result,
      error: action.error,
    };
  }

  switch(action.type) {
    case GET_HYPUR_ACCOUNT:
      return {...state, currentHypur : action.payload}
    case UPDATE_HYPUR_ACCOUNT:
      return {...state, currentHypur : action.payload}
    case GET_HYPUR_TEST_USERS:
      return {...state, testUsers : action.payload}
    case GET_HYPUR_PROFILES:
      return {...state, userProfiles : action.payload}
    case SET_HYPUR_SELECTED_PROFILE:
      return {...state, selectedProfile: action.payload}
    default:
      return state;
  }
}

module.exports = {
  hypur
};