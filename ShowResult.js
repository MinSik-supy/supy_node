// 승패 결정
function ShowResult(blackID,whiteID){
  let result=""
  let winner=""
  for(let i = 0; i < blackID.length; i++){
      // 좌우
      if (blackID.includes(blackID[i] + 1) &&
          blackID.includes(blackID[i] + 2) &&
          blackID.includes(blackID[i] + 3) &&
          blackID.includes(blackID[i] + 4))
          {result='좌우 검정 승리!'; winner="black";}

      // 상하
      if (blackID.includes(blackID[i] + 15) &&     // col
          blackID.includes(blackID[i] + 30) && // col * 2
          blackID.includes(blackID[i] + 45) && // col * 3
          blackID.includes(blackID[i] + 60))   // col * 4
          { result='상하 검정 승리!'; winner="black";}

      // 왼쪽 대각선
      if (blackID.includes(blackID[i] + 16) && // (col + 1) * 1
          blackID.includes(blackID[i] + 32) && // (col + 1) * 2
          blackID.includes(blackID[i] + 48) && // (col + 1) * 3
          blackID.includes(blackID[i] + 64))   // (col + 1) * 4
          { result='대각선 검정 승리!'; winner="black";}

      // 오른쪽 대각선
      if (blackID.includes(blackID[i] + 14) && // (col - 1) * 1
          blackID.includes(blackID[i] + 28) && // (col - 1) * 2
          blackID.includes(blackID[i] + 42) && // (col - 1) * 3
          blackID.includes(blackID[i] + 56))   // (col - 1) * 4
          { result='대각선 검정 승리!'; winner="black";}
  }
  for (let i = 0; i < whiteID.length; i++) {

      // 좌우
      if (whiteID.includes(whiteID[i] + 1) &&
          whiteID.includes(whiteID[i] + 2) &&
          whiteID.includes(whiteID[i] + 3) &&
          whiteID.includes(whiteID[i] + 4))
          { result='좌우 흰색 승리!'; winner="white";}

      // 상하
      if (whiteID.includes(whiteID[i] + 15) &&     // col
          whiteID.includes(whiteID[i] + 30) && // col * 2
          whiteID.includes(whiteID[i] + 45) && // col * 3
          whiteID.includes(whiteID[i] + 60))   // col * 4
          { result='상하 흰색 승리!'; winner="white";}

      // 왼쪽 대각선
      if (whiteID.includes(whiteID[i] + 16) && // (col + 1) * 1
          whiteID.includes(whiteID[i] + 32) && // (col + 1) * 2
          whiteID.includes(whiteID[i] + 48) && // (col + 1) * 3
          whiteID.includes(whiteID[i] + 64))    // (col + 1) * 4
          { result='대각선 흰색 승리!'; winner="white";}

      // 오른쪽 대각선
      if (whiteID.includes(whiteID[i] + 14) && // (col - 1) * 1
          whiteID.includes(whiteID[i] + 28) && // (col - 1) * 2
          whiteID.includes(whiteID[i] + 42) && // (col - 1) * 3
          whiteID.includes(whiteID[i] + 56))   // (col - 1) * 4
          { result='대각선 흰색 승리!'; winner="white";}
  }
  return result+"&"+winner
}

module.exports.ShowResult = ShowResult;
