(this.webpackJsonpourchat=this.webpackJsonpourchat||[]).push([[0],{46:function(t,a,e){},47:function(t,a,e){},78:function(t,a,e){},80:function(t,a,e){},81:function(t,a,e){},82:function(t,a,e){"use strict";e.r(a);var n=e(6),s=e.n(n),i=e(41),o=e.n(i),c=(e(46),e(9)),l=e(10),h=e(12),m=e(11),r=(e(47),e(17)),d=e(19),u=e.n(d),_=e(24),j=(e(78),e(40),e(0)),C=function(t){Object(h.a)(e,t);var a=Object(m.a)(e);function e(t){var n;return Object(c.a)(this,e),(n=a.call(this,t)).login=function(){var t=Object(_.hex)(n.state.user.pswd);fetch("http://127.0.0.1:8082/selUser",{body:JSON.stringify({name:n.state.user.name,pswd:t}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){200===t.code?(n.socket.emit("CheckLogin",n.state.user.name),n.socket.once("CheckLogin",(function(t){t?(n.props.parent.getLoginMsg(!0),n.props.parent.getChatMsg({name:n.state.user.name})):n.props.parent.getLoginMsg(!1)}))):n.props.parent.getLoginMsg(!1)}))},n.sign=function(){var t="";if(""===n.state.user.name||""===n.state.user.pswd)return n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"\u7528\u6237\u540d\u5bc6\u7801\u4e0d\u80fd\u4e3a\u7a7a\u54e6"}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500),0;t=Object(_.hex)(n.state.user.pswd),fetch("http://127.0.0.1:8082/signUser",{body:JSON.stringify({name:n.state.user.name,pswd:t,talk:[]}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){console.log(t),n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:t.msg}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500)}))},n.handleChange=function(t,a){var e=n.state.user;for(var s in n.state.user)s===t&&(e[s]=a.target.value,n.setState({user:e}))},n.login=n.login.bind(Object(r.a)(n)),n.sign=n.sign.bind(Object(r.a)(n)),n.state={user:{name:"",pswd:""},IsLogin:"",toast:"",ToastClass:"toastCenter disnone"},n.socket=u()("ws://localhost:10086"),n}return Object(l.a)(e,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"Login_content",children:[Object(j.jsx)("div",{className:"Login_left"}),Object(j.jsx)("div",{className:"Login_right",children:Object(j.jsxs)("div",{className:"Login_login",children:[Object(j.jsx)("h2",{children:"\u767b\u5f55"}),Object(j.jsx)("input",{type:"text",id:"name",placeholder:"\u8f93\u5165\u7528\u6237\u540d",onChange:this.handleChange.bind(this,"name")}),Object(j.jsx)("input",{type:"password",id:"pswd",placeholder:"\u8f93\u5165\u4f60\u7684\u5bc6\u7801",onChange:this.handleChange.bind(this,"pswd")}),Object(j.jsxs)("div",{className:"Login_right_bottom",children:[Object(j.jsx)("button",{onClick:this.login,children:"\u767b\u5f55"}),Object(j.jsx)("button",{onClick:this.sign,children:"\u6ce8\u518c"})]})]})}),Object(j.jsx)("div",{className:this.state.ToastClass,children:this.state.toast})]})}}]),e}(s.a.Component),f=(e(80),e(81),function(t){Object(h.a)(e,t);var a=Object(m.a)(e);function e(t){var n;return Object(c.a)(this,e),(n=a.call(this,t)).componentDidUpdate=function(){n.scrollToBottom()},n.updateChat=function(){fetch("http://127.0.0.1:8082/chatList",{body:JSON.stringify({name:n.props.chatData.name}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){n.setState({ChatList:t.data.talk})}))},n.serach=function(){""===n.state.talk.talkname?(n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"\u641c\u7d22\u7684\u8bdd\u9898\u540d\u4e0d\u80fd\u4e3a\u7a7a\u54e6"}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500)):fetch("http://127.0.0.1:8082/funTalk",{body:JSON.stringify({talkname:n.state.talk.talkname}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){n.setState({SearchClass:"searchClass animate__animated animate__zoomInDown",SearchList:t.data})}))},n.addTalk=function(){""===n.state.talk.talkname?(n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"\u8bdd\u9898\u540d\u4e0d\u80fd\u4e3a\u7a7a\u54e6"}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500)):fetch("http://127.0.0.1:8082/addTalk",{body:JSON.stringify({talkname:n.state.talk.talkname,maker:n.props.chatData.name}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){if(n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:t.msg}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500),200===t.code){var a=n.state.ChatList;a.push({talkname:n.state.talk.talkname}),n.setState({ChatList:a})}}))},n.joinTalk=function(t){fetch("http://127.0.0.1:8082/joinTalk",{body:JSON.stringify({talkname:t,name:n.props.chatData.name}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(a){if(n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:a.msg}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500),200===a.code){var e=n.state.ChatList;e.push({talkname:t}),n.setState({ChatList:e})}}))},n.getChat=function(t){n.setState({ChatName:t}),fetch("http://127.0.0.1:8082/funChat",{body:JSON.stringify({talkname:t}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){n.setState({msgs:t.data})}))},n.sendChat=function(){""!==n.state.ChatName?(fetch("http://127.0.0.1:8082/addChat",{body:JSON.stringify({talkname:n.state.ChatName,name:n.props.chatData.name,chat:n.state.talk.msg}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){var a=n.state.msgs;a.push({name:n.props.chatData.name,chat:n.state.talk.msg}),n.setState({msgs:a,talk:{msg:""}})})),n.socket.emit("msg",{name:n.props.chatData.name,talkname:n.state.ChatName,msg:n.state.talk.msg})):(n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"\u60a8\u8fd8\u672a\u9009\u7740\u8bdd\u9898\u54e6"}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500))},n.shutdown=function(){n.setState({SearchClass:"searchClass animate__animated animate__fadeOut"})},n.handleChange=function(t,a){var e=n.state.talk;for(var s in n.state.talk)s===t&&(e[s]=a.target.value,n.setState({talk:e}))},n.scrollToBottom=function(){if(n.messagesEnd){var t=n.messagesEnd.scrollHeight-n.messagesEnd.clientHeight;n.messagesEnd.scrollTop=t>0?t:0}},n.deleteTalk=function(){if(""!==n.state.ChatName){fetch("http://127.0.0.1:8082/deleTalk",{body:JSON.stringify({talkname:n.state.ChatName,name:n.props.chatData.name}),method:"POST",headers:{"Content-Type":"application/json; charset=utf-8"}}).then((function(t){return t.json()})).then((function(t){n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:t.msg}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500)}));for(var t=n.state.ChatList,a=null,e=0;e<t.length;e++)t[e].talkname===n.state.ChatName&&(a=e);t.splice(a,1),console.log(t),n.setState({ChatList:t})}else n.setState({ToastClass:"toastCenter animate__animated animate__zoomInDown",toast:"\u60a8\u8fd8\u672a\u9009\u7740\u8bdd\u9898\u54e6"}),setTimeout((function(){n.setState({ToastClass:"toastCenter animate__animated animate__fadeOut"})}),1500)},n.outline=function(){n.socket.emit("outline",n.props.chatData.name),window.location.reload()},n.state={talk:{talkname:"",maker:"",msg:""},ToastClass:"",SearchClass:"disnone",toast:"",SearchList:[],ChatList:[],ChatName:"",msgs:[],Isline:"offline animate__animated animate__fadeIn",IsChatline:"online animate__animated animate__fadeIn"},n.socket=u()("ws://localhost:10086"),n.socket.on("connect",(function(){n.setState({Isline:"offline animate__animated animate__fadeOut"}),setTimeout((function(){n.setState({Isline:"online animate__animated animate__fadeIn"})}),1e3),n.socket.on("chat",(function(t){n.props.chatData.name!==t.name&&(n.setState({Isline:"online animate__animated animate__fadeOut"}),setTimeout((function(){n.setState({Isline:"online animate__animated animate__fadeIn"})}),500),n.state.ChatName===t.talkname&&(n.setState({IsChatline:"online animate__animated animate__fadeOut"}),setTimeout((function(){n.setState({IsChatline:"online animate__animated animate__fadeIn"});var a=n.state.msgs;a.push({name:t.name,chat:t.msg}),n.setState({msgs:a})}),500)))}))})),n}return Object(l.a)(e,[{key:"render",value:function(){var t=this;return Object(j.jsxs)("div",{className:"Chat_content",children:[Object(j.jsxs)("div",{className:"Chat_Tab",children:[Object(j.jsxs)("div",{className:"Chat_left",children:[Object(j.jsxs)("div",{className:"Chat_Left_head",children:[Object(j.jsx)("div",{className:"Chat_Left_img"}),Object(j.jsx)("div",{className:"Chat_Left_name",children:this.props.chatData.name}),Object(j.jsx)("div",{className:this.state.Isline,onClick:this.outline})]}),Object(j.jsxs)("div",{className:"Chat_nav",children:[Object(j.jsx)("input",{className:"Chat_input",onChange:this.handleChange.bind(this,"talkname")}),Object(j.jsx)("button",{className:"iconfont",onClick:this.serach,children:"\ue6b3"}),Object(j.jsx)("button",{className:"iconfont",onClick:this.addTalk,children:"\ue6b8"})]}),Object(j.jsx)("div",{className:"Chat_refresh",children:Object(j.jsx)("button",{className:"iconfont",onClick:this.updateChat,children:"\ue6ae"})}),Object(j.jsx)("div",{className:"Chat_list",children:this.state.ChatList.map((function(a,e){return Object(j.jsxs)("div",{className:"cl",onClick:function(){return t.getChat(a.talkname)},children:[Object(j.jsx)("div",{className:"cl_img"}),Object(j.jsx)("div",{className:"cl_name",children:a.talkname}),Object(j.jsx)("div",{className:"outline "+(a.talkname===t.state.ChatName?t.state.IsChatline:"")})]},e)}))})]}),Object(j.jsxs)("div",{className:"Chat_right",children:[Object(j.jsxs)("div",{className:"Chat_Right_head",children:[Object(j.jsx)("div",{className:"Chat_Right_img"}),Object(j.jsx)("div",{className:"Chat_Right_name",children:this.state.ChatName}),Object(j.jsx)("div",{className:"Chat_Delete",children:Object(j.jsx)("button",{className:"iconfont",onClick:this.deleteTalk,children:"\ue6b1"})})]}),Object(j.jsx)("div",{className:"Chat_body",ref:function(a){t.messagesEnd=a},children:this.state.msgs.map((function(a,e){return Object(j.jsx)("div",{className:"Talk",children:Object(j.jsxs)("div",{className:a.name===t.props.chatData.name?"Talk_all Right":"Talk_all Left",children:[Object(j.jsx)("div",{className:"Talk_chat",children:a.chat}),Object(j.jsx)("div",{className:a.name===t.props.chatData.name?"Talk_img Right_img":"Talk_img Left_img",id:a.name})]})},e)}))}),Object(j.jsxs)("div",{className:"input_body",children:[Object(j.jsx)("textarea",{value:this.state.talk.msg,onChange:this.handleChange.bind(this,"msg")}),Object(j.jsx)("button",{className:"iconfont",onClick:this.sendChat,children:"\ue6b2"})]})]})]}),Object(j.jsx)("div",{className:this.state.ToastClass,children:this.state.toast}),Object(j.jsxs)("div",{className:this.state.SearchClass,children:[Object(j.jsx)("div",{className:"Search_head",children:Object(j.jsx)("button",{className:"iconfont",onClick:this.shutdown,children:"\ue6af"})}),Object(j.jsx)("div",{className:"Search_list",children:Object(j.jsx)("table",{children:Object(j.jsx)("tbody",{children:this.state.SearchList.map((function(a,e){return Object(j.jsxs)("tr",{children:[Object(j.jsx)("td",{children:a.talkname}),Object(j.jsx)("td",{children:a.maker}),Object(j.jsx)("td",{className:"Search_add",children:Object(j.jsx)("button",{className:"iconfont",onClick:function(){return t.joinTalk(a.talkname)},children:"\ue6b8"})})]},e)}))})})})]})]})}}]),e}(s.a.Component)),g=function(t){Object(h.a)(e,t);var a=Object(m.a)(e);function e(t){var n;return Object(c.a)(this,e),(n=a.call(this,t)).getLoginMsg=function(t){n.setState({LoginClass:"Login"}),n.setState({IsLogin:t}),n.state.IsLogin?n.setState({LoginClass:"Login animate__animated animate__zoomOut"}):n.setState({LoginClass:"Login animate__animated animate__shakeX"}),setTimeout((function(){n.state.IsLogin?(n.setState({LoginClass:"Login disnone"}),n.setState({ChatClass:"Chat animate__animated animate__zoomIn"})):n.setState({LoginClass:"Login"})}),1e3)},n.getChatMsg=function(t){n.setState({ChatMsg:t})},n.state={LoginClass:"Login",ChatClass:"Chat disnone",IsLogin:!1,ChatMsg:{}},n}return Object(l.a)(e,[{key:"render",value:function(){return Object(j.jsxs)("div",{className:"content",children:[Object(j.jsx)("div",{className:this.state.LoginClass,children:Object(j.jsx)(C,{parent:this})}),Object(j.jsx)("div",{className:this.state.ChatClass,children:Object(j.jsx)(f,{chatData:this.state.ChatMsg})})]})}}]),e}(s.a.Component),p=function(t){t&&t instanceof Function&&e.e(3).then(e.bind(null,83)).then((function(a){var e=a.getCLS,n=a.getFID,s=a.getFCP,i=a.getLCP,o=a.getTTFB;e(t),n(t),s(t),i(t),o(t)}))};o.a.render(Object(j.jsx)(s.a.StrictMode,{children:Object(j.jsx)(g,{})}),document.getElementById("root")),p()}},[[82,1,2]]]);
//# sourceMappingURL=main.7a1a426f.chunk.js.map