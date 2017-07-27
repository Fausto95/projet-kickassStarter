// import axios from 'axios'
// import { browserHistory } from 'react-router'
// import { AUTH_USER } from './types'


// const ROOT_URL = 'http://localhost:3003'


// export function signInUser ({email, password}, dispatch){
//     const user =  (dispatch) =>{
//         // Submit email and password to the server
//         axios.post(`${ROOT_URL}/signin`, { email: email[0], password: password[0] })
//             .then(response =>{
//                 console.log('the dispatch', dispatch())
//                 // // If request good 
//                 // // Update state to indicate user is auth true
//                 //dispatch({ type: 'AUTH_USER' })
//                 // //save the jwt token 
//                 // localStorage.setItem('token', response.data.token)
//                 // // redirect to the route /feature       

//                 browserHistory.push('/feature')

//             })
//             .catch(() =>{
//                 // If request is bad
//                 // show an error to the user   
//             })
//     }
//     return user()
// }