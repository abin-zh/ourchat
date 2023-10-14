import React from "react";
import io from "socket.io-client";
import "animate.css";
import "./Chat.css";
import "./icon/iconfont.css";

class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            talk:{
                talkname:"",
                maker:"",
                msg:""
            },
            ToastClass:"",
            SearchClass:"disnone",
            toast:"",
            SearchList:[],
            ChatList:[],
            ChatName:"",
            msgs:[],
            Isline:"offline animate__animated animate__fadeIn",
            IsChatline:"online animate__animated animate__fadeIn"
        }
        this.socket = io("ws://localhost:10086");
        this.socket.on("connect",() => {
            this.setState({Isline:"offline animate__animated animate__fadeOut"});
            setTimeout(() => {
                this.setState({Isline:"online animate__animated animate__fadeIn"});
            },1000);
            this.socket.on("chat",(msg) => {
                if(this.props.chatData.name !== msg.name){
                    this.setState({Isline:"online animate__animated animate__fadeOut"});
                    setTimeout(() => {
                        this.setState({Isline:"online animate__animated animate__fadeIn"});
                    },500);
                    if(this.state.ChatName === msg.talkname){
                        this.setState({IsChatline:"online animate__animated animate__fadeOut"});
                        setTimeout(() => {
                            this.setState({IsChatline:"online animate__animated animate__fadeIn"});
                            let all = this.state.msgs;
                            all.push({name:msg.name,chat:msg.msg});
                            this.setState({msgs:all});
                        },500);
                    }
                }
            });
        });
    }
    
    componentDidUpdate = () => {
        this.scrollToBottom();
    }

    updateChat = () => {
        fetch("http://127.0.0.1:8082/chatList",{
                body:JSON.stringify({name:this.props.chatData.name}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
                this.setState({ChatList:res.data.talk});
            })
    }

    serach = () => {
        if(this.state.talk.talkname === ''){
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"搜索的话题名不能为空哦"});
            setTimeout(() => {
               this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
            }, 1500);
        }else{
            fetch("http://127.0.0.1:8082/funTalk",{
                body:JSON.stringify({talkname:this.state.talk.talkname}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
                this.setState({SearchClass:"searchClass animate__animated animate__zoomInDown",SearchList:res.data});
            })
        }
    }
    
    addTalk = () => {
        if(this.state.talk.talkname === ''){
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"话题名不能为空哦"});
            setTimeout(() => {
               this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
            }, 1500);
        }else{
            fetch("http://127.0.0.1:8082/addTalk",{
                body:JSON.stringify({talkname:this.state.talk.talkname,maker:this.props.chatData.name}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
                this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:res.msg});
                setTimeout(() => {
                   this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
                }, 1500);
                if(res.code === 200){
                    let all = this.state.ChatList;
                    all.push({talkname:this.state.talk.talkname});
                    this.setState({ChatList:all});
                }
            });
        }
    }

    joinTalk = (talkname) => {
        fetch("http://127.0.0.1:8082/joinTalk",{
                body:JSON.stringify({talkname:talkname,name:this.props.chatData.name}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
                this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:res.msg});
                setTimeout(() => {
                   this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
                }, 1500);
                if(res.code === 200){
                    let all = this.state.ChatList;
                    all.push({talkname:talkname});
                    this.setState({ChatList:all});
                }
            });
    }

    getChat = (talkname) => {
        this.setState({ChatName:talkname});
        fetch("http://127.0.0.1:8082/funChat",{
                body:JSON.stringify({talkname:talkname}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
        }).then(res => res.json()).then(res => {
                this.setState({msgs:res.data});
        });
    }

    sendChat = () => {
        if(this.state.ChatName !== ""){
            fetch("http://127.0.0.1:8082/addChat",{
                body:JSON.stringify({talkname:this.state.ChatName,name:this.props.chatData.name,chat:this.state.talk.msg}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
               let all = this.state.msgs;
               all.push({name:this.props.chatData.name,chat:this.state.talk.msg});
               this.setState({msgs:all,talk:{msg:""}});
            });
            this.socket.emit("msg",{name:this.props.chatData.name,talkname:this.state.ChatName,msg:this.state.talk.msg});
        }else{
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"您还未选着话题哦"});
            setTimeout(() => {
               this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
            }, 1500);
        }
    }

    shutdown = () => {
        this.setState({SearchClass:"searchClass animate__animated animate__fadeOut"});
    }

    handleChange = (key,event) => {
        let talk = this.state.talk
        for(let item in this.state.talk){
            if(item === key){
                talk[item] = event.target.value
                this.setState({talk:talk})
            }
        }
    }

    scrollToBottom = () => {
        if (this.messagesEnd) {
            const scrollHeight = this.messagesEnd.scrollHeight;
            const height = this.messagesEnd.clientHeight;
            const maxScrollTop = scrollHeight - height;
            this.messagesEnd.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
        }
    }

    deleteTalk = () => {
        if(this.state.ChatName !== ""){
            fetch("http://127.0.0.1:8082/deleTalk",{
                body:JSON.stringify({talkname:this.state.ChatName,name:this.props.chatData.name}),
                method:"POST",
                headers:{
                    "Content-Type":"application/json; charset=utf-8"
                }
            }).then(res => res.json()).then(res => {
                this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:res.msg});
                setTimeout(() => {
                   this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
                }, 1500);
            });
            let all =  this.state.ChatList;
            let index = null;
            for(let i = 0;i < all.length;i++){
                if(all[i].talkname === this.state.ChatName){
                    index = i;
                }
            }
            all.splice(index,1);
            console.log(all);
            this.setState({ChatList:all});
        }else{
            this.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"您还未选着话题哦"});
            setTimeout(() => {
               this.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"}); 
            }, 1500);
        }
    }

    outline = () => {
        this.socket.emit("outline",this.props.chatData.name);
        window.location.reload();
    }

    render(){
        return  <div className="Chat_content">
                    <div className="Chat_Tab">
                        <div className="Chat_left">
                            <div className="Chat_Left_head">
                                <div className="Chat_Left_img"></div>
                                <div className="Chat_Left_name">{this.props.chatData.name}</div>
                                <div className={this.state.Isline} onClick={this.outline}></div>
                            </div>
                            <div className="Chat_nav">
                                <input className="Chat_input" onChange={this.handleChange.bind(this,"talkname")}/>
                                <button className="iconfont" onClick={this.serach}>&#xe6b3;</button>
                                <button className="iconfont" onClick={this.addTalk}>&#xe6b8;</button>
                            </div>
                            <div className="Chat_refresh"><button className="iconfont" onClick={this.updateChat}>&#xe6ae;</button></div>
                            <div className="Chat_list">
                                {
                                    (this.state.ChatList).map((item,index) =>{
                                         return(
                                             <div className="cl" key={index} onClick={() => this.getChat(item.talkname)}>
                                                 <div className="cl_img"></div>
                                                 <div className="cl_name">{item.talkname}</div>
                                                <div className={"outline " + (item.talkname === this.state.ChatName ? this.state.IsChatline : "")}></div> 
                                            </div>
                                         )
                                     })
                                }
                            </div>     
                        </div>
                        <div className="Chat_right">
                            <div className="Chat_Right_head">
                                <div className="Chat_Right_img"></div>
                                <div className="Chat_Right_name">{this.state.ChatName}</div>
                                <div className="Chat_Delete"><button className="iconfont" onClick={this.deleteTalk}>&#xe6b1;</button></div>
                            </div>
                            <div className="Chat_body" ref={ (el) => { this.messagesEnd = el; }}>
                                {
                                        this.state.msgs.map((item,index) => {
                                            return(
                                                <div className="Talk" key={index}>
                                                    <div className={item.name === this.props.chatData.name ? "Talk_all Right" : "Talk_all Left"}>
                                                        <div className="Talk_chat">{item.chat}</div>
                                                        <div className={item.name === this.props.chatData.name ? "Talk_img Right_img" : "Talk_img Left_img"} id={item.name}></div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                        
                                }
                            </div>
                            <div className="input_body">
                                <textarea value={this.state.talk.msg} onChange={this.handleChange.bind(this,"msg")}></textarea>
                                <button className="iconfont" onClick={this.sendChat}>&#xe6b2;</button>
                            </div>
                        </div>
                    </div>
                    <div className={this.state.ToastClass}>{this.state.toast}</div>
                    <div className={this.state.SearchClass}>
                        <div className="Search_head">
                            <button className="iconfont" onClick={this.shutdown}>&#xe6af;</button>
                        </div>
                        <div className="Search_list">
                            <table>
                                <tbody>
                                {
                                    this.state.SearchList.map((item,index) => {
                                        return(
                                            <tr key={index}>
                                                <td>{item.talkname}</td>
                                                <td>{item.maker}</td>
                                                <td className="Search_add"><button className="iconfont" onClick={() => this.joinTalk(item.talkname)}>&#xe6b8;</button></td>
                                            </tr>
                                        )
                                    })
                                    
                                }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
        
    }
}
export default Chat;