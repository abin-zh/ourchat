import React from 'react';
import './App.css';
import Login from './Login';
import Chat from './Chat';

class App extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            LoginClass:"Login",
            ChatClass:"Chat disnone",
            IsLogin:false,
            ChatMsg:{}
        }
        // this.getLoginMsg = this.getLoginMsg.bind(this);
    }

    getLoginMsg = (flag) => {
        this.setState({LoginClass:"Login"});
        this.setState({IsLogin:flag});
        this.state.IsLogin ? this.setState({LoginClass:"Login animate__animated animate__zoomOut"}) : this.setState({LoginClass:"Login animate__animated animate__shakeX"});
        setTimeout(() => {
            if(this.state.IsLogin){
                this.setState({LoginClass:"Login disnone"});
                this.setState({ChatClass:"Chat animate__animated animate__zoomIn"});
            }else{
                this.setState({LoginClass:"Login"});
            }
        },1000)
    }
    
    getChatMsg = (msg) => {
        this.setState({ChatMsg:msg});
    }
    
    render(){
        return <div className="content">
                    <div className={this.state.LoginClass}>
                        <Login parent = {this}/>
                    </div>
                    <div className={this.state.ChatClass}>
                        <Chat chatData = {this.state.ChatMsg}/>
                    </div>
                </div>
    }
}


export default App;
