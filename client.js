$(".cover").on("click",function(){
  return;
});

const nickname = prompt('닉네임을 말씀해주세요.');
let mycolor = ""
var pcolors = {}
var socket = io();
var player = ""


socket.emit('NickName', nickname);

socket.on('UserEnter',function(msg, lst, observerList, pcolor){
  if(msg.split("$")[1]=="player"){
    alert("플레이어 "+msg.split("$")[0]+"님이 입장하셨습니다.");
  }else{
    let oblist=""
    observerList.forEach(function(item,index){
      oblist += "<li>"+item+"</li>"
      $(".observers").html(oblist);
    });
  }
  pcolors=pcolor;
  console.log(pcolors)
  $("#order").html(msg.split("$")[2]+" 차례")
  $("#plyr1").html("플레이어1: "+lst[0]);
  $("#plyr2").html("플레이어2: "+lst[1]);
  if(lst.length>=2){
    $("#startbtn").show();
  }else{
    $("#startbtn").hide();
  }
});

function dolclick(dol){
  // 좌표 저장
  let locationXY = {x : '', y : ''};
  locationXY.x = dol.prop("classList")[0].split("-")[1];
  locationXY.y = dol.parent().prop("classList")[0].split("-")[1];

  let sendData=nickname;
  socket.emit('CLICK', sendData, locationXY);
}

// 오목돌 놓기
$(".col").on("click",function(){
  if(player=="observer"){
    return;
  }

  if($(this).hasClass("black") || $(this).hasClass("white")){
    alert("요기는 안댐");
  }else{
    dolclick($(this));
  }
})

//서버에서 결과 데이터 받기
socket.on('RESULT', function(locXY, result, sendturn, winner, nextturn) {
  if(result!="&"){ //승부가 난 경우
    if(sendturn=="black"){
      $(".row-"+locXY.y).find(".col-"+locXY.x).addClass("black");
      $("#userpicture1").attr("src","img/ttabong.jpg");
    }else{
      $(".row-"+locXY.y).find(".col-"+locXY.x).addClass("white");
      $("#userpicture2").attr("src","img/ttabong.jpg");
    }
    setTimeout(function(){
      alert(result.split("$")[0]);
      $(".white").removeClass("white");
      $(".black").removeClass("black");
      $(".userpic").attr("src","img/default.jpg");
    },50)
  }else{ //승부가 안 난 경우
    if(sendturn=="black"){
      $(".row-"+locXY.y).find(".col-"+locXY.x).addClass("black");
    }else{
      $(".row-"+locXY.y).find(".col-"+locXY.x).addClass("white");
    }

    $("#order").html(nextturn+" 차례");
    console.log(pcolors[sendturn],"=",nickname);
    if(nickname==pcolors[sendturn]){
      $(".cover").addClass("disabled");
    }else{
      $(".cover").removeClass("disabled");
    }
  }
});


socket.on('EXIT', function(txt) {
  alert(txt);
});
