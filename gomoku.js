var express = require('express');
var app = express();

var http = require('http');
var server = http.Server(app);

var socket = require('socket.io');
var io = socket(server);

var port = 5000;
var socketList = [];
var playerList = [];
var userobjects = {};
var observerList = [];
var turn = 'black'
var blackLocation = [];
var whiteLocation = [];
var blackID = [];
var whiteID = [];
var pcolor={"black":"","white":""}
const ShowResult = require('./ShowResult');

app.use(express.static(__dirname));

app.get('/', function(req, resp) {
    resp.redirect('/gomoku');
});

app.use('/gomoku', function(req, resp) {
    resp.sendFile(__dirname + '/gomoku.html');
});

io.on('connection', function(socket) {
  if(typeof(socket.handshake.headers['x-forwarded-for'])=="undefined"){
    console.log("로컬테스트입장");
  }else{
    console.log(socket.handshake.headers['x-forwarded-for'].split(',')[0]," 입장");
  }
  socketList.push(socket);
  userobjects[socket.id]=""

  socket.on('NickName', function(data){
    let nickname = data;
    let user = ""
    if(playerList.length<2){
      playerList.push(nickname);
      userobjects[socket.id]=nickname;
      if(pcolor["black"]==""){
        pcolor["black"]=nickname;
      }else{
        pcolor["white"]=nickname;
      }
      user = "player";
    }else{
      observerList.push(nickname);
      userobjects[socket.id]=nickname;
      user = "observer";
    }

    let userdata = nickname+"$"+user+"$"+turn

    io.emit('UserEnter', userdata, playerList, observerList, pcolor);
    console.log(userobjects);
  });

  socket.on('CLICK', function(data, locationXY){
    let locXY = locationXY;
    let sendturn = turn
    if(turn=="black"){
      blackLocation.push(locXY);
      blackID.push((15 * (locXY.y - 1) + 1 * locXY.x));
      blackID.sort((a, b) => a - b);
      turn="white"
    }else{
      whiteLocation.push(locXY);
      whiteID.push((15 * (locXY.y - 1) + 1 * locXY.x));
      whiteID.sort((a, b) => a - b);
      turn="black"
    }
    result = ShowResult.ShowResult(blackID,whiteID);
    result = result.split("$")[0]
    let winner = result.split("$")[1]
    if (result!="&"){
      turn = 'black'
      blackLocation = [];
      whiteLocation = [];
      blackID = [];
      whiteID = [];
    }
    let nextturn = turn;
    io.emit('RESULT', locXY, result, sendturn, winner, nextturn);
  });

  socket.on('disconnect', function(){
    txt=userobjects[socket.id]+"님이 퇴장하셨습니다."
    console.log(txt);
    delete userobjects[socket.id]
    socketList.splice(socketList.indexOf(socket), 1);
    console.log(userobjects);
    io.emit('EXIT', txt);
  });
});

server.listen(port, function() {
    console.log('server on! http://localhost:'+port)
});
