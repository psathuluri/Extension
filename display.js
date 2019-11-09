var tableRef = document.getElementsByClassName("rwd-table results")[0];
var table = tableRef.getElementsByTagName('tbody')[0];
const url = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/waitlist-info-pnyrh/service/wait_aid/incoming_webhook/getNum";
//const url = "https://webhooks.mongodb-stitch.com/api/client/v2.0/app/waitlist-info-pnyrh/service/wait_aid/incoming_webhook/getDB";
var head = tableRef.getElementsByTagName('thead')[0];

//document.getElementsById("table thead th:last-child").after('<th scope=col>Test</th>');

var row = head.rows[0];
var cell = row.insertCell(6);
cell.innerHTML = "<th>Waitlist size</th>";
var cell2 = row.insertCell(7);
cell2.innerHTML = "<th>Last Updated</th>";

helper();

async function helper(){
	const response = await fetch(url
	)
	.then(response => response.json())
	.then(data => {
		//console.log(data);
		//console.log(JSON.stringify(data));
    for(var i = 0; i < table.rows.length; i++){
		var db = data;
		var classRow = table.rows[i];
		//console.log(classRow);
		if((classRow.getElementsByClassName("course_header").length === 0)){
			classRow.insertCell(6).innerHTML = "	";
			classRow.insertCell(7).innerHTML = "	";

			var vals = classRow.innerText.split("	");
			//console.log(vals);
			var status = vals[5];
			if(status === "waitlisted"){
				var numU = vals[0]; //Unique number of class
				if( [numU] in data){
					//console.log(numU + " is in db");
					console.log(data[numU]);
					var wait = data[numU]["wait"];
					var time = data[numU]["time"];
					console.log(wait);
					//classRow.insertCell(6).innerHTML = wait;
					var d = new Date();
					var datestring = ("0" + d.getDate()).slice(-2) + "-" + ("0"+(d.getMonth()+1)).slice(-2) + "-" +
				    d.getFullYear() + " " + ("0" + d.getHours()).slice(-2) + ":" + ("0" + d.getMinutes()).slice(-2)
				     + ":" +  ("0" + d.getSeconds()).slice(-2);
				    var diffTime = Math.abs(datestring - time);
				    var diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
				    console.log("Updated Time: "+time);
				    console.log("Current Time: "+datestring);

					
					var c = classRow.insertCell(6);
					c.innerHTML = "<span style='color: #cc5500; text-decoration: none; font-weight: normal;'>"+wait+"</span>";  
					var t = classRow.insertCell(7);
					t.innerHTML = "<span style='color: #cc5500; text-decoration: none; font-weight: normal;'>"+timeDiff(time, datestring)+"</span>";  
					

					//c.innerHTML = wait;


					//console.log(classRow);
					//console.log(classRow.innerHTML);
					//console.log(classRow.getElementsByTagName("Status").textContent);

				}
				else{
					//not in db, add space
					classRow.insertCell(6).innerHTML = "	";
					classRow.insertCell(7).innerHTML = "	";
				}	
			}
			else{
				//not waitlisted, add space
				classRow.insertCell(6).innerHTML = "	";
				classRow.insertCell(7).innerHTML = "	";
			}
			
		}
	}



    });  
}

function timeDiff(old, now){
	var oldA = old.split(" ");
	var nowA = now.split(" ");
	var oldDate = oldA[0].split("-");
	var nowDate = nowA[0].split("-");
	var oldTime = oldA[1].split(":");
	var nowTime = nowA[1].split(":");
	//compare year
	if(oldDate[2] === nowDate[2]){
		//same year
		//check month
		if(oldDate[1] === nowDate[1]){
		//same month
		//check days
			if(oldDate[0] === nowDate[0]){
				//same day
				//check hours
				if(oldTime[0] === nowTime[0]){
					//same hour, check minutes
					if(oldTime[1] === nowTime[1]){
						//same minute
						return "a few seconds ago";
					}
					else{
						//return min(s) ago
						var mins = parseInt(nowTime[1]) - parseInt(oldTime[1]);
						mins = Math.abs(mins);
						if(mins === 1)
							return ""+mins + " minute ago";
						return ""+mins + " minutes ago";
					}
				}
				else{
					//return hour(s) ago
					var hours = parseInt(nowTime[0]) - parseInt(oldTime[0]);
					hours = Math.abs(hours);
					if(hours === 1)
						return ""+hours + " hour ago";
					return ""+hours + " hours ago";
				}
			}
			else{
				//return day(s) ago
				var days = parseInt(nowDate[0]) - parseInt(oldDate[0]);
				days = Math.abs(days);
				if(days === 1)
					return ""+days + " day ago";
				return ""+days + " days ago";
			}
		}
		else{
			return "Over a month ago";
		}
	}
	else{
		//different year
		return "Over a year ago";
	}



// 	Check year
// 	Check month
// 		Check day
// 			Check Hours
// 				Check Minutes
// 					Check Seconds -> few sec ago 
// 				Return min ago
// 			Return hours ago
// 		Return days ago
// 	return over a month ago
// Return over a year ago


} 


