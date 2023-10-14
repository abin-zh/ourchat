const express = require('express');
const app = express();

const io = require("socket.io")(10086,{ cors:true });

//用于保证req.body
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

let users = [];
io.on("connection",(socket) => {
    socket.on("CheckLogin",(check) => { //监测何人登录
        let flag = true;
        if(users.length >= 1){
            for(let i = 0;i < users.length;i++){
                if(check === users[i]){
                    flag = false;
                    io.emit("CheckLogin",false);
                    break;
                }
            }
        }
        
        if(flag){
            users.push(check);
            io.emit("CheckLogin",true);
        }
        console.log(users);
    });


    socket.on("msg",(msg) => { //监测消息
        io.emit("chat",msg); //广播消息
        console.log(msg);
    })

    socket.on("outline",(outline) => {
        let index = null;
        for(let i = 0;i < users.length;i++){
            if(outline === users[i]){
                index = i;
            }
        }
        users.splice(index,1);
    })
});

//MongoDB
var MongoDB = require('mongodb').MongoClient;
var MongoUrl = "mongodb://localhost:27017/ourchat";

//设置头，配置跨域
app.all('*',function(req,res,next){
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "content-type");
    res.header("Access-Control-Allow-Methods", "POST,GET");
    res.header("Content-Type", "application/json; charset=utf-8");
    next();
});

app.get("/",(req,res) => {
    res.send("<h1>Helllo World</h1>");
});

//名为foundUser的接口
app.post('/selUser',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        //选择数据库
        var database = db.db("ourchat");
        //选择集合进行查询
        database.collection("Users").find(req.body).toArray(function(errs,result){
            if(result.length == 0){
                res.json({code:500,msg:"用户名或密码错误",data:{}});
            }else{
                res.json({code:200,msg:"欢迎"+ req.body.name +"来聊天！",data:{name:req.body.name}});
            }
            db.close();
        });
    });
});

app.post('/chatList',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        //选择数据库
        var database = db.db("ourchat");
        //选择集合进行查询
        database.collection("Users").find(req.body).toArray(function(errs,result){
            res.json({code:200,msg:"话题列表刷新成功",data:{talk:result[0].talk}});
            db.close();
        });
    });
});

app.post('/signUser',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        //选择数据库
        var database = db.db("ourchat");
        var collection = database.collection("Users");

        collection.find({name:req.body.name}).toArray(function(err,result){
            if(result.length == 0){
                collection.insertOne(req.body,function(errs,results){
                    res.json({code:200,msg:"恭喜"+ req.body.name +"注册成功，欢迎一起来聊天呀！",data:results});
                });
            }else{
                res.json({code:500,msg:"注册失败了，大概率是重名了哦",data:{}});
            }
        });
    });
});

app.post('/addTalk',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Users = database.collection("Users");
        var Talks = database.collection("Talks");
        Talks.find({talkname:req.body.talkname}).toArray(function(err,result){
            if(result.length == 0){
                Users.updateOne({name:req.body.maker},{$addToSet:{talk:{talkname:req.body.talkname}}});
                Talks.insertOne({talkname:req.body.talkname,maker:req.body.maker,talkmsg:[]},function(errs,results){
                    res.json({code:200,msg:"话题创建成功了",data:results});
                });
            }else{
                res.json({code:500,msg:"创建话题失败了，可能已经有这个话题了哦",data:{}});
            }
        });
        
    });
});

app.post('/funTalk',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Talks = database.collection("Talks");
        var patern = new RegExp("\S*" + req.body.talkname + "\S*","i");
        
        Talks.find({talkname:{$regex:patern}}).toArray(function(err,result){
            res.json({code:200,msg:"",data:result});
        });
    });
});

app.post('/joinTalk',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Users = database.collection("Users");
        Users.updateOne({name:req.body.name},{$addToSet:{talk:{talkname:req.body.talkname}}},function(err,result){
            if(result.modifiedCount > 0 && result.matchedCount > 0){
                res.json({code:200,msg:"添加成功了",data:result});
            }else{
                res.json({code:500,msg:"您已经添加过了",data:result});
            }
        });
    });
});

app.post('/addChat',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Talks = database.collection("Talks");
        Talks.updateOne({talkname:req.body.talkname},{$push:{talkmsg:{name:req.body.name,chat:req.body.chat}}},function(err,result){
                res.json({code:200,msg:"添加成功了",data:result});
        });
    });
});

app.post('/funChat',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Talks = database.collection("Talks");
        Talks.find({talkname:req.body.talkname}).toArray(function(err,result){
            res.json({code:200,msg:"话题"+ req.body.talkname +"的聊天记录加载成功",data:result[0].talkmsg});
        });
    });
});

app.post('/deleTalk',function(req,res){
    MongoDB.connect(MongoUrl,function(err,db){
        var database = db.db("ourchat");
        var Users = database.collection("Users");
        Users.updateOne( { name:req.body.name } , { $pull: { talk : { talkname:req.body.talkname } } },function(err,result){
            res.json({code:200,msg:"话题"+ req.body.talkname +"删除成功",data:result});
        })
    });
});

var server = app.listen(8082,function(){
    var port = server.address().port;
    console.log("This server front is http://localhost:"+ port +"/")
});