import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import axios from "axios";

class App extends Component {
  constructor(){
    super();
    this.state={
      color:"#f9fcfc",
      name:"",
      password:"",
      buttonSubmition:false,
      signin:false,
      data:[],
      email:"",
      mobileno:""
    }
  }
  componentDidMount(){
    axios.get("http://localhost:8000/").then(e=>{this.setState({data:e.data});}).catch(e=>{this.setState({data:this.state.data});})
  }
  myColorChange=e=>{this.setState({color:e.target.value})}
  myClick=e=>{
    console.log(this.state.data)
    for (var i of this.state.data){
      if (i.username===this.state.name){
        alert(this.state.name)
        if (i.password===this.state.password){
          this.setState({buttonSubmition:true})
        }
      }
      if (i.email===this.state.name){
        this.setState({name:i.username})
        if (i.password===this.state.password){
          this.setState({buttonSubmition:true})
        }
      }
    }
  }
  nameChange=(e)=>{
    this.setState({name:e.target.value});
  }
  passwordChange=(e)=>{
    this.setState({password:e.target.value})
  }
  myLogout(){
    this.setState({buttonSubmition:false,name:"",password:""})
  }
  mySignin(){
    this.setState({signin:this.state.signin===true?false:true})
  }
  emailChange=(e)=>{
    this.setState({email:e.target.value});
  }
  mobilenoChange=(e)=>{
    this.setState({mobileno:e.target.value});
  }
 myClicksign=()=>{
    var signindata={}
    signindata['username']=this.state.name
    signindata['password']=this.state.password
    signindata['email']=this.state.email
    signindata['mobileno']=this.state.mobileno
    if(Object.keys(signindata).length===4){
       axios.post("http://localhost:8000/",signindata);
    }

  }
  render() {
  let m;
  if (this.state.buttonSubmition){m=<div>
    <h1>
      Welcome {this.state.name} you are Logged in .
      </h1>
      <button onClick={()=>this.myLogout()}>
        Logout
        </button>
    </div>}else if (!this.state.signin){
    m=   <div> <div className="card" style={{backgroundColor:this.state.color}}>
    <div className="container">
      <form>
        <h1>Login</h1>
        <label>
          UserName :
        </label>
          <input type="text" 
          className="input-res"
          placeholder="UserName or Email"
          value={this.state.name}
          onChange={e=>this.nameChange(e)}
          />
        <label><hr size="5"></hr>
          Password :
        </label>
          <input type="password" className="input-res"
          value={this.state.password}
          onChange={e=>this.passwordChange(e)}
          /><hr size="5"></hr>
          <input type="color" 
          onChange={e=>this.myColorChange(e)} 
          value={this.state.color}
          className="color"
          ></input>
          <hr size="0" width="100"></hr>
          <div className="login-buttons">
          <button 
          onClick={e=>this.myClick(e)} 
          className="button"
          >
          Login
          </button>
          </div>
      </form>
    </div>
    </div>
   <p onClick={()=>this.mySignin()}> Create Account</p>
    </div>
}else if(this.state.signin){
  m= <div> <div className="card" style={{backgroundColor:this.state.color}}>
  <div className="container">
    <form>
      <h1>Signin</h1>
      <label>
        UserName :
      </label>
        <input type="text" 
        className="input-res"
        value={this.state.name}
        onChange={e=>this.nameChange(e)}
        /><hr size="5"></hr>
              <label>
        navgurukul mail :
      </label>
        <input type="email" 
        className="input-res"
        value={this.state.email}
        onChange={e=>this.emailChange(e)}
        /><hr size="5"></hr>
      <label>
      mobileno :
      </label>
        <input type="mobilenumber" className="input-res"
        value={this.state.mobileno}
        onChange={e=>this.mobilenoChange(e)}
        /><hr size="5"></hr>
      <label>
        Password :
      </label>
        <input type="password" className="input-res"
        value={this.state.password}
        onChange={e=>this.passwordChange(e)}
        /><hr size="5"></hr>
        <input type="color" 
        onChange={e=>this.myColorChange(e)} 
        value={this.state.color}
        className="color"
        ></input>
        <hr size="0" width="100"></hr>
        <div className="login-buttons">
        <button 
        onClick={e=>this.myClicksign(e)} 
        className="button"
        >
        Signin
        </button>
        </div>
    </form>
  </div>
  </div>
  <p onClick={()=>this.mySignin()}> Already have an Account</p>
  </div> 
}
    return (
  <div className="App">
    <div className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h2>Welcome to React</h2>
    </div>
      {m}
  </div>
    );
  }
}
export default App;
