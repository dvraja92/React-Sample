import { 
	getCurrentHypurAccount as getCurrentHypurAccountAPI,
	getHypurTestUsers as getHypurTestUsersAPI,
	updateCurrentHypurAccount as updateCurrentHypurAccountAPI,
	getHypurUserProfiles as getHypurUserProfilesAPI
} from 'api/hypur-api';

import {
 	GET_HYPUR_ACCOUNT,
	GET_HYPUR_TEST_USERS,
	GET_HYPUR_PROFILES,
	UPDATE_HYPUR_ACCOUNT,
  SET_HYPUR_SELECTED_PROFILE
} from '../actions/actionTypes';

import {showMessanger} from 'api/api-utils';

export const getHypur = (payload: Object) : Action => ({
  type: GET_HYPUR_ACCOUNT,
  payload : payload
})

export const updateHypur= (payload: Object) : Action => ({
  type: UPDATE_HYPUR_ACCOUNT,
  payload : payload
})

export const setHypurSelectedProfile = (payload: Object) : Action => ({
  type: SET_HYPUR_SELECTED_PROFILE,
  payload : payload
})

export const getProfiles = (payload: Object) : Action => ({
  type: GET_HYPUR_PROFILES,
  payload : payload
})


export const getTestUsers = (payload: Object) : Action => ({
  type: GET_HYPUR_TEST_USERS,
  payload : payload
})

export const getHypurAccount = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return getCurrentHypurAccountAPI()
    .then((response) => {
    	dispatch(getHypur(response))
      return response
    })
  }
}

export const getHypurProfiles = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return getHypurUserProfilesAPI()
    .then((response) => {
    	dispatch(getProfiles(response))
      	return response
    })
  }
}

export const getHypurUsers = (): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return getHypurTestUsersAPI()
    .then((response) => {
    	dispatch(getTestUsers(response))
      	return response
    })
  }
}
export const updateHypurAccunt = (payload): Function => {
  return (dispatch: Function, getState: Function): Promise => {
    return updateCurrentHypurAccountAPI(payload)
    .then((response) => {
    	dispatch(updateHypur(response))
      	return response
    })
  }
}

module.exports = {
	getHypurAccount,
	updateHypurAccunt,
	getHypurProfiles,
	getHypurUsers,
  setHypurSelectedProfile
}