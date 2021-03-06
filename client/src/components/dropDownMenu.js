import React from 'react'
import { Dropdown, Icon } from 'semantic-ui-react'
import { Link } from 'react-router'


const DropDownMenu = props => (
  <Dropdown icon='bars' text='' floating   className='icon'>
    { props.authenticated && props.user !== undefined && props.user !== null ?
    <Dropdown.Menu className='left'>
        <Dropdown.Item>
            <span className='DropText'><Link to='/'>Home</Link></span>
        </Dropdown.Item>
        <Dropdown.Item>
            <span className='DropText'><Link to="/signout" activeStyle={{ color: '#cb2d3e' }}>Sign Out</Link></span>
        </Dropdown.Item>
        <Dropdown.Item>
            <span className='DropText'><Link to={`/dashboard/user/${props.user.userId}`} activeStyle={{ color: '#cb2d3e' }}>Dashboard</Link></span>
        </Dropdown.Item>
    </Dropdown.Menu>
      : 
    <Dropdown.Menu className='left'>
        <Dropdown.Item>
            <span className='DropText'><Link to='/'>Home</Link></span>
        </Dropdown.Item>
        <Dropdown.Item>
            <span className='DropText'><Link  to="/signin" activeStyle={{ color: '#cb2d3e' }}>Sign in </Link></span>
        </Dropdown.Item>
        <Dropdown.Item>
            <span className='DropText'><Link  to="/signup" activeStyle={{ color: '#cb2d3e' }}>Sign Up</Link></span>
        </Dropdown.Item>
    </Dropdown.Menu>
    }
  </Dropdown>
)

export default DropDownMenu