var allFilesArray = [];
var notReadyToRun = true;
function run(){
	if(notReadyToRun){alert("Please select input files first"); return;}
	var displayString = "";
	console.log("--------------------------sorted By Gender then Name---------------------------------");
	allFilesArray.sort(sortArrayByGender);
	allFilesArray = splitSortAndConcatByGender(allFilesArray);
	displayString = displayFormattedArray(allFilesArray);
	console.log(displayString);
	document.getElementById("output-div").innerHTML+= displayString;
	document.getElementById("output-div").innerHTML+= "\n\n";
	
	console.log("--------------------------sorted By Year---------------------------------");
	allFilesArray.sort(sortArrayByYear);
	displayString = displayFormattedArray(splitSortAndConcatByYear(allFilesArray));
	console.log(displayString);
	document.getElementById("output-div").innerHTML+= displayString;
	document.getElementById("output-div").innerHTML+= "\n\n";
	
	console.log("---------------------------sorted By Name Desc--------------------------------");
	allFilesArray.sort(sortArrayByNameDesc);
	displayString = displayFormattedArray(allFilesArray);
	console.log(displayString);
	document.getElementById("output-div").innerHTML+= displayString;
	document.getElementById("output-div").innerHTML+= "\n\n";
	
}

function readMultipleFiles(evt) {
    //Retrieve all the files from the FileList object
    var files = evt.target.files; 
    		
    if (files) {
	notReadyToRun = false;
        for (var i=0, f; f=files[i]; i++) {
	          var r = new FileReader();
				r.onload = (function(f) {
                return function(e) {
                    var contents = e.target.result;
                    
					//Put each file in array
					var arrLines1 = contents.split("\n");
					for (var k=0; k < arrLines1.length ; k++) {
						if(f.name == "space-separated.txt"){
							formatSpaceLine(arrLines1[k].split(" "));
						}
						if(f.name == "comma-separated.txt"){
							formatCommaLine(arrLines1[k].split(", "));
						}
						if(f.name == "pipe-separated.txt"){
							formatPipeLine(arrLines1[k].split(" | "));
						}
					}
                };
            })(f);

            r.readAsText(f);
        }   
		
    } else {
	      alert("Failed to load files"); 
    }
  }
  
  
  
  function formatSpaceLine(inputLine){
	inputLine = inputLine.slice(0,2).concat(inputLine.slice(3,inputLine.length));
	for (var l=0; l < inputLine.length ; l++) { 
		inputLine[inputLine.length-2] = inputLine[inputLine.length-2].replace(/-/g,"/");
		if(inputLine[l] == "M") inputLine[l]= "Male";
		if(inputLine[l] == "F") inputLine[l]= "Female";
	}
	
	allFilesArray.push(inputLine);
  }
  
  
  function formatCommaLine(inputLine){
	
	for (var l=0; l < inputLine.length ; l++) {
		if(inputLine[l] == "M") inputLine[l]= "Male";
		if(inputLine[l] == "F") inputLine[l]= "Female";
	}
	inputLine = swapArrElements(inputLine,3,4);
	allFilesArray.push(inputLine);
  }
  
  
  function formatPipeLine(inputLine){
	inputLine = inputLine.slice(0,2).concat(inputLine.slice(3,inputLine.length));  
	for (var l=0; l < inputLine.length ; l++) {
		inputLine[inputLine.length-1] = inputLine[inputLine.length-1].replace(/-/g,"/");
		if(inputLine[l] == "M") inputLine[l]= "Male";
		if(inputLine[l] == "F") inputLine[l]= "Female";
	}
	inputLine = swapArrElements(inputLine,3,4);
	allFilesArray.push(inputLine);
  }
  
//Helpers
 function swapArrElements(arr, index1, index2) {
	  var temp = arr[index1];
	  arr[index1] = arr[index2];
	  arr[index2] = temp;
	  
	  return arr;
};

function sortArrayByNameAsc(a, b){
	if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] < b[0]) ? -1 : 1;
    }
}

function sortArrayByNameDesc(a, b){
	if (a[0] === b[0]) {
        return 0;
    }
    else {
        return (a[0] > b[0]) ? -1 : 1;
    }
}

function sortArrayByGender(a, b){
	if (a[2] === b[2]) {
        return 0;
    }
    else {
        return (a[2] < b[2]) ? -1 : 1;
    }
}

function sortArrayByYear(a, b){
	var year1 = a[3].split("/")[2];
	var year2 = b[3].split("/")[2];
	if (year1 === year2) {
        return 0;
    }
    else {
        return (year1 < year2) ? -1 : 1;
    }
}

function splitSortAndConcatByGender(array){
var arrayPart1 = [];
var arrayPart2 = [];
for (var l=0; l < array.length ; l++) {
		if(array[l][2] == "Female") {
			arrayPart1.push(array[l]);
		}else {
			arrayPart2.push(array[l]);
		}
	}
	
	return arrayPart1.sort(sortArrayByNameAsc).concat(arrayPart2.sort(sortArrayByNameAsc));
}


function splitSortAndConcatByYear(array){
var outerTempArray = [];
var arrayPart1 = [];
arrayPart1.push(array[0]);
for (var l=1; l < array.length ; l++) {
		if(array[l][3].split("/")[2] == arrayPart1[arrayPart1.length-1][3].split("/")[2]) {
			arrayPart1.push(array[l]);
		}else {
			outerTempArray.push(arrayPart1);
			arrayPart1 = [];
			arrayPart1.push(array[l]);
		}
	}

outerTempArray.push(arrayPart1);
	
var finalArray = [];
finalArray = outerTempArray[0].sort(sortArrayByNameAsc);
for (var k=1; k < outerTempArray.length ; k++) {
	finalArray = finalArray.concat(outerTempArray[k].sort(sortArrayByNameAsc));
}
return finalArray;
}

function displayFormattedArray(outArray){

var outString="";
	for (var i=0; i < outArray.length ; i++) {
		for (var j=0 ;j < outArray[i].length ; j++) {
			outString+= outArray[i][j]+" ";
			}
		outString+="\n";
	}
return outString;
}




  