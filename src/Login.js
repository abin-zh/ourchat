import React from "react";
import io from 'socket.io-client';
import { hex } from 'js-md5'
import "./Login.css"
import "animate.css"

class Login extends React.Component{
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.sign = this.sign.bind(this);
        this.state = {
            user:{
                name:'',
                pswd:'',
            },
            IsLogin:'',
            toast:'',
            ToastClass:'toastCenter disnone'
        }
        this.socket = io("ws://localhost:10086");
    }
    login = () => {
        let hexpswd = hex(this.state.user.pswd);
        fetch("http://127.0.0.1:8082/selUser",{
            body:JSON.stringify({name:this.state.user.name,pswd:hexpswd}),
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            }
        }).then(res => res.json()).then(res => {
            if(res.code === 200){
                this.socket.emit("CheckLogin",this.state.user.name);
                this.socket.once("CheckLogin",(check) => { //阻断用户多端登录
                    if(check){
                        this.props.parent.getLoginMsg(true);
                        this.props.parent.getChatMsg({name:this.state.user.name});
                    }else{
                        this.props.parent.getLoginMsg(false);
                    }
                })
            }else{
                this.props.parent.getLoginMsg(false);
            }
        });
    }
    
    sign = () => {
        let hexpswd = '';
        if(this.state.user.name === '' || this.state.user.pswd === ''){
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"用户名密码不能为空哦"});
            setTimeout(() => {
                this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"});
             }, 1500);
             return 0;          
        }else{
            hexpswd = hex(this.state.user.pswd);
        }
        fetch("http://127.0.0.1:8082/signUser",{
            body:JSON.stringify({name:this.state.user.name,pswd:hexpswd,talk:[]}),
            method:"POST",
            headers:{
                "Content-Type":"application/json; charset=utf-8"
            }
        }).then(res => res.json()).then(res => {
            console.log(res);
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:res.msg});
            setTimeout(() => {
               this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
            }, 1500);
        });
    }
    handleChange = (key,event) => {
        let user = this.state.user
        for(let item in this.state.user){
            if(item === key){
                user[item] = event.target.value
                this.setState({user:user})
            }
        }
    }
    render(){
        return  <div className="Login_content">
                    <div className="Login_left"></div>
                    <div className="Login_right">
                        <div className="Login_login">
                            <h2>登录</h2>
                            <input type="text" id="name" placeholder="输入用户名"  onChange={this.handleChange.bind(this,'name')}/>
                            <input type="password" id="pswd" placeholder="输入你的密码"  onChange={this.handleChange.bind(this,'pswd')}/>
                            <div className="Login_right_bottom">
                                <button onClick={this.login}>登录</button>
                                <button onClick={this.sign}>注册</button>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.ToastClass}>{this.state.toast}</div>
                </div>
        
    }
}
export default Login;