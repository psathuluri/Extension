
var tableRef = document.getElementsByClassName("rwd-table results")[0];
var table = tableRef.getElementsByTagName('tbody')[0];


for(var i = 0; i < table.rows.length; i++){
	var classRow = table.rows[i];
	
	if((classRow.getElementsByClassName("course_header").length === 0)){

		var vals = classRow.innerText.split("	");
		var numU = vals[0]; //Unique number of class

	}


}
