// import React from "react"
// import ReactDOM from "react-dom";

const url = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/waitlist-info-pnyrh/service/wait_aid/incoming_webhook/pushVal";
console.log('Running rn');

var x = document.getElementsByClassName("tbg");
// console.log(x.length);
for(var i = 0; i < x.length - 1; i++){
	var table = x[i];

	var firstRow = table.rows[0];
	var fourthRow = table.rows[3];
	var name = firstRow.innerText.split("|")[0];
	var copy = (' ' + name).slice(1);
	var num = copy.split(" ")[0];
	//console.log(num);
	var fullName = name.substring(6,);
	// console.log(fullName);

	var waitlist = fourthRow.innerText;
	var waitArr = waitlist.split(" ");
	var wait = waitArr[waitArr.length-1];
	// console.log(wait);

	var d = new Date();
	var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
     + ":" +  ("0" + d.getSeconds()).slice(-2);

    helper(num, fullName, wait, datestring);
    //helper(12345 ,"AK47", 3, datestring);



 }

//alert("sup dawg");


async function helper(num, fullName, wait, datestring)
{
	     //make json object to post
    var u = num.toString();
	var data = {
		"record": {
  			"id":num, 
  			"class":fullName, 
  			"wait":wait, 
  			"time":datestring
  		}
  	};

	//console.log(data);    
	console.log(JSON.stringify(data));

    const response = await fetch(url, { method: 'POST', // *GET, POST, PUT, DELETE, etc. 
    // mode: 'cors', // no-cors, *cors, same-origin
     // cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached 
     // credentials: 'same-origin', // include, *same-origin, omit 
     headers: { 
     	'Content-Type': 'application/json'
     	 // 'Content-Type': 'application/x-www-form-urlencoded',
     },
     // redirect: 'follow', // manual, *follow, error 
     // referrer: 'no-referrer', // no-referrer, *client
      body: JSON.stringify(data) // body data type must match "Content-Type" header
     });

    response.json().then(data2 => {
    	
    	console.log(data2);
    });  
    
}







