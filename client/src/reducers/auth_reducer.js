
export default function (state = {}, action) {
	switch(action.type){
		case 'AUTH_USER':
		return { ...state, error: '', authenticated: true, user: action.payload}
		case 'UNAUTH_USER':
		return { ...state, authenticated: false}
		case 'AUTH_ERROR':
		return { ...state, error: action.payload }
		default:
		return state
	}
	//return state
}