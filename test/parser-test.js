var fs = require("fs");
var parser = require("../lib/parser");
var result
// result = parser.parse("{ varname }");
// console.log(result[0])

// result = parser.parse("{#if a > 1 }yes{#else}no{/if}");
// console.log(result[0])

// result = parser.parse("hi{ name }{ sex }");
// console.log(result[0])


// result = parser.parse(fs.readFileSync("./templates/if0.txt").toString());
// console.log(result[0])

// result = parser.parse(fs.readFileSync("./templates/if1.txt").toString());
// console.log(result[0])


// result = parser.parse(fs.readFileSync("./templates/if2.txt").toString());
// console.log(result[0])

// result = parser.parse(fs.readFileSync("./templates/if0.txt").toString());
// console.log(result[0])

// result = parser.parse("(a + (b - c ))");
// result = parser.parse("(a + (2 + c))");
// result = parser.parse("a * (b + (c/d))");
// result = parser.parse("(a * 2)");
// result = parser.parse("(a)");
// result = parser.parse("(a+1)");
// console.log(result[0])


// 字符串
// result = parser.parse("'a'");
// result = parser.parse("'\\'\"a'");
// result = parser.parse('"a bcd\'\\""');
// result = parser.parse('"a\\""');
// result = parser.parse("\\'");
// console.log(result[0])


result = parser.parse(fs.readFileSync("./templates/simple.txt").toString());

var ast = [];
var next = result[0].next;

function walk(next){
  var list = [];
  //-------------------- each --------------------
  var eachComprehension;
  var eachBody;
  //-------------------- each --------------------

  //-------------------- if   --------------------
  var ifPredict;
  var ifYes;
  var ifElse;//else

  var ifExpression;//包含ifPredict ifYes ifNo
  var ifExpressions;
  //-------------------- if   --------------------

  //-------------------- op   --------------------
  var opcache;
  //-------------------- op   --------------------

  //当前容器
  var pointer = ast;
  while(next){
    if(next.name == "@eachstart"){
      list = ["each"];
    }else if(next.name == "@eachend"){
      ast.push(list);
      // resetting;
      pointer = ast;
    }else if(next.name == "@each-head-start"){
      eachComprehension = [];
    }else if(next.name == "@each-head-end"){
      list.push(eachComprehension);
    }else if(next.name == "@each-body-start"){
      eachBody = [];
      pointer = eachBody;
    }else if(next.name == "@each-body-end"){
      list.push(eachBody);
    }else if(next.name == "each-items"){
      eachComprehension.push(next.value);
      pointer = eachComprehension;
    }else if(next.name == "each-item"){
      eachComprehension.push(next.value);
    }else if(next.name == "each-index"){
      eachComprehension.push(next.value);
    }else if(next.name == "@ifstart"){
      list = ["if"];
      ifExpressions = [];

      pointer = ifExpression;
    }else if(next.name == "@ifend"){
      list.push(ifExpressions);
      //若有else clause 的话
      ifElse.length && list.push(ifElse);
      add(list,ast);

      // resetting;
      pointer = ast;
    }else if(next.name == "@elseifstart"){
    }else if(next.name == "@elseifend"){
    }else if(next.name == "@ifexpstart"){
      ifExpression = [];
      ifPredict = [];
      pointer = ifPredict;
    }else if(next.name == "@ifexpend"){
      ifExpression.push(ifPredict);
    }else if(next.name == "@ifbodystart"){
      ifYes = [];
      pointer = ifYes;
    }else if(next.name == "@ifbodyend"){
      ifExpression.push(ifYes);
      ifExpressions.push(ifExpression);
    }else if(next.name == "@elsestart"){
      ifElse = [];
      pointer = ifElse;
    }else if(next.name == "@elseend"){
    }else if(next.name == "var"){
      add(["var",next.value]);
    }else if(next.name == "number"){
      add(["number",next.value]);
    }else if(next.name == "string"){
      add(["string",next.value]);
    }else if(next.name == "operation"){
      add(["op",next.value]);
    }
    next = next.next;
  }
  function add(list,con){
    var container = con || pointer || ast;
    container.push(list);
  }
}
walk(next);
console.log(JSON.stringify(ast))