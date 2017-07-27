import { combineReducers, createStore } from 'redux'
import authReducer from './auth_reducer'
import projectReducer from './project_reducer'

const rootReducer = combineReducers({
    auth: authReducer,
    project: projectReducer
})

const store  = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

const token = localStorage.getItem('token')

if(token){
	//let user = JSON.parse(localStorage.getItem('user'))

	store.dispatch({ type: 'AUTH_USER' /*, payload: 'user'*/})
}



export default store