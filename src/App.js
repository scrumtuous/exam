import logo from './logo.svg';
import './App.css';
import React from 'react';
import * as Realm from "realm-web";
import Exam from './Components/Exam';

const REALM_APP_ID = "exam-app-vzpmu"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });




class App extends React.Component {


  constructor(props) {
	console.log("In App Constructor.");

    super(props);
	this.setState({message: el.getAttribute('data-param')});
	console.log(el.getAttribute('data-param'));
	//console.log(this.state.message);
    //console.log("attempts at message: " + this.state.message);
	

  }


  render() {
    return <div className="App"  message={el.getAttribute('data-param')} name={el.getAttribute('data-name')}><Exam page={el.getAttribute('data-page')} message={el.getAttribute('data-param')} name={el.getAttribute('data-name')}/>{this.props.message}</div>
  }
}

const el = document.getElementById('root');

export default App;
