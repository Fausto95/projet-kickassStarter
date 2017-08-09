import React, { Component } from 'react';
import '../stylesheet/App.css';
import '../stylesheet/Header.css';
import '../stylesheet/Dashboard.css';
import Header from './header'
// import Footer from './footer'

class App extends Component {
  render() {
  	//console.log('the app props', this.props)
    return (
      <div>
        <Header/>
        {this.props.children} 
      </div>
    );
  }
}


export default App

