import deleteProject from './deleteFunc'
import Modify from './editFunc'
import addVote from './addVote'
import deleteVote from './deleteVote'

export default function (state = {}, action) {
	switch(action.type){
		case 'FETCH_MY_PROJECTS':
		return { ...state, data: action.payload}
		case 'FETCH_HOME_PROJECTS':
		return { ...state, projects: action.payload}
		case 'ADD_VOTE': 
		return { ...state, projects: addVote([ ...state.projects], action.payload)}
		case 'DELETE_VOTE':
		return { ...state, projects: deleteVote([ ...state.projects], action.payload)}
		case 'ADD_PROJECT':
		return { ...state, data: { ...state.data, projects: [ ...state.data.projects, action.payload ] } }
		case 'DELETE_PROJECT':
		return { ...state, data: { ...state.data, projects: [ ...deleteProject(state.data.projects, action.payload) ] } }
		case 'EDIT_PROJECT':
		return { ...state, data: { ...state.data, projects: [ ...Modify(state.data.projects, action.payload, action.item) ] } }
		default:
		return state
	}
}