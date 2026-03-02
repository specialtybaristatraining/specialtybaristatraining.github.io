const fs=require('fs');
let code=fs.readFileSync('c:/Users/rtabo/Desktop/norsang/tempScriptUtf8.js','utf8');
let stack=[];
let unmatched = [];
for(let i=0;i<code.length;i++){
  if(code[i]==='{') {
      stack.push(i);
  } else if(code[i]==='}') {
      if(stack.length>0) stack.pop();
      else unmatched.push(i);
  }
}
if(stack.length>0) unmatched = unmatched.concat(stack);
let report = 'remaining braces: ' + stack.length + '\nindexes: ' + unmatched.join(',');
if(unmatched.length>0){
  let idx = unmatched[0];
  // compute line number and column
  let linesArr = code.split('\n');
  let cum = 0;
  let lineNo = 0, col = 0;
  for(let i=0;i<linesArr.length;i++){
    if(cum + linesArr[i].length + 1 > idx){
      lineNo = i+1;
      col = idx - cum + 1;
      break;
    }
    cum += linesArr[i].length + 1;
  }
  report += '\ncontext around index ' + idx + ' (line ' + lineNo + ', col ' + col + '):\n';
  let before = code.slice(Math.max(0, idx-40), idx);
  let after = code.slice(idx, Math.min(code.length, idx+40));
  report += before.replace(/\n/g,'\\n') + '[' + code[idx] + ']' + after.replace(/\n/g,'\\n');
}
require('fs').writeFileSync('c:/Users/rtabo/Desktop/norsang/bracesReport.txt', report);
