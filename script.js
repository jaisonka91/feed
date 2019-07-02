const module1Output = "Obama visited Facebook headquarters: http://bit.ly/xyz @elversatile";

const module2Output = [
  {
    startPoint: 14,
    endPoint: 22,
    type: "Entity"
  },{
    startPoint: 0,
    endPoint: 5,
    type: "Entity"
  },{
    startPoint: 55,
    endPoint: 67,
    type: "Twitter username"
  },{
    startPoint: 37,
    endPoint: 54,
    type: "Link"
  }
];

function compare( a, b ) {
  if ( a.startPoint < b.startPoint ){
    return -1;
  }
  if ( a.startPoint > b.startPoint ){
    return 1;
  }
  return 0;
}

let output = '<div class="feedItem">';
let prev = 0;

module2Output.sort( compare ).map(function(item, index){
  if(item.startPoint >= 0 && item.startPoint <= module1Output.length && item.endPoint >= 0 && item.endPoint <= module1Output.length ){
    if(index != 0){
       output += module1Output.slice(prev, item.startPoint-1) + " ";
    }

    let replaceStr;
    let btwOrgStr = module1Output.substring(item.startPoint,item.endPoint);

    if(item.type == "Entity"){
      replaceStr = "<strong>" + btwOrgStr + "</strong>";
    }else if(item.type == "Twitter username"){
      replaceStr = '<a href="http://twitter.com/'+ btwOrgStr +'">' + btwOrgStr + '</a>';
    }else if (item.type == "Link") {
      replaceStr = '<a href="'+ btwOrgStr +'">' + btwOrgStr + '</a>';
    }else if(item.type == "Hashtag") {
      replaceStr = '<a href="http://twitter.com/'+ btwOrgStr +'"> #' + btwOrgStr + '</a>';
    }

    output += replaceStr;
    prev = item.endPoint;
  }
});

output += "</div>";

document.getElementById("feedLayout").insertAdjacentHTML( 'beforeend', output );
