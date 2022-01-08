import React, { Component } from 'react';
 
class ExamHistory extends Component{
 
	
	
    render(){
        return (

<div class="card mt-2">
   <div class="card-header" id="localStorageTitle">
      Local Storage
   </div>
   <div class="card-body">
      <h3 class="card-title" id="localStorageCardTitle">What's in Storage?</h3>
      <p>Number of exams in your history: {this.getExamHistory().length} </p>
      <button id="clearls" class="btn btn-primary" type="submit"
         onClick={() => this.clearLocalStorage()}
      >Clear Local Storage</button>&nbsp;


	  	  				<button id="formatToTable" className="btn btn-primary" type="submit" onClick={() => this.formatToTable()}>Format to Table</button>&nbsp;
						
	  				<button className="btn btn-primary" type="submit" onClick={() => this.formatToCode()}>Format to Code</button>
	  
      <div>
         <pre id="examHistory" key={Math.random()}> { JSON.stringify(this.getExamHistory(), "", "\t") } </pre>
      </div>
      <p class="card-text">
      </p>
   </div>
</div>
           
            
        )
    }
	
	getExamHistory() {
		//alert("Get Exam History");
      try{
         let object = localStorage.getItem('examHistory');
         let examHistory = "";
         
         if (object == null) {
            examHistory = {name:"Exam History"};
            let exams = [];
            examHistory.exams = exams;
            localStorage.setItem('examHistory', JSON.stringify(examHistory));
            //this.setState({history: examHistory})
         } else {
            examHistory = JSON.parse(object);
         }
         return examHistory;
      }catch(e){
         console.log(e);
      }
		
	}
	
	clearLocalStorage() {
		localStorage.clear('examHistory');
		this.setState({history: this.getExamHistory()});
      document.getElementById("formatToTable").setAttribute("class", "enabled btn btn-primary");
      document.getElementById("formatToCode").setAttribute("class", "disabled btn btn-primary");
	}

   formatToCode() {
      document.getElementById("formatToTable").setAttribute("class", "enabled btn btn-primary");
      document.getElementById("formatToCode").setAttribute("class", "disabled btn btn-primary");
      document.getElementById("examHistory").innerHTML = JSON.stringify(this.getExamHistory(), "", "\t");
   }

   formatToTable() {
      document.getElementById("formatToTable").setAttribute("class", "disabled btn btn-primary");
      document.getElementById("formatToCode").setAttribute("class", "enabled btn btn-primary");
      var examHistory = this.getExamHistory();
      
         document.getElementById("examHistory").innerHTML = "";
         var table = document.createElement("table");
         table.setAttribute("id", "tablestyle");
         var tr = document.createElement("tr");
         var headers = ["Exam number", "Question", "Options Given", "Correct Options", "Selected Options"];
         for (var i = 0; i < headers.length; i++) {
            var th = document.createElement("th");
            th.appendChild(document.createTextNode(headers[i]));
            tr.appendChild(th);
         }
         table.appendChild(tr);

         if(examHistory.exams.length < 1){
            tr = document.createElement("tr");
            td = document.createElement("td");
            td.setAttribute("colspan", "5");
            td.setAttribute("style", "text-align: center");
            td.appendChild(document.createTextNode("**Nothing to show**"));
            tr.appendChild(td);
            table.appendChild(tr); 
         }
         for (var counter = 0; counter < examHistory.exams.length; counter++) { //per exam
            console.log("Exam History: " + (counter + 1));
            tr = document.createElement("tr");
            var td = document.createElement("td"); //Start of Exam Number
            td.appendChild(document.createTextNode("Exam History: " + (counter + 1))); 
            tr.appendChild(td);
            table.appendChild(tr);//End of Exam Number
            for (var q = 0; q < examHistory.exams[counter].length; q++) { //per question
               var question = examHistory.exams[counter][q].query;
               var correctOptions = [];
               var selectedOptions = [];
               var optionsGiven = [];
               var options = examHistory.exams[counter][q].options;
               var isCorrect = true;
               console.log(JSON.stringify(question));
               for (var opt = 0; opt < options.length; opt++) { //selected and correct options gathering
                  if (examHistory.exams[counter][q].options[opt].correct) {
                     correctOptions.push(examHistory.exams[counter][q].options[opt].text);
                  }
                  if (examHistory.exams[counter][q].options[opt].selected) {
                     selectedOptions.push(examHistory.exams[counter][q].options[opt].text);
                  }
                  optionsGiven.push(examHistory.exams[counter][q].options[opt].text);
               }
   
               tr = document.createElement("tr");
               tr.appendChild(document.createElement("td")); //for blank td
               
               td = document.createElement("td");
               td.appendChild(document.createTextNode(question));
               tr.appendChild(td);
   
               td = document.createElement("td");
               var p = document.createElement("p");
               p.appendChild(document.createTextNode("Given Options:"));
               td.appendChild(p);
               var ul = document.createElement("ul");
               for (opt = 0; opt < optionsGiven.length; opt++) {
                  var li = document.createElement("li");
                  li.setAttribute("style", "margin-left: 40px");
                  li.appendChild(document.createTextNode(optionsGiven[opt]));
                  td.appendChild(li);
               }
               tr.appendChild(td);
   
               td = document.createElement("td");
               p = document.createElement("p");
               p.appendChild(document.createTextNode("Correct Options:"));
               td.appendChild(p);
               for (opt = 0; opt < correctOptions.length; opt++) {
                  var li = document.createElement("li");
                  li.setAttribute("style", "margin-left: 40px");
                  li.appendChild(document.createTextNode(correctOptions[opt]));
                  td.appendChild(li);
               }
               tr.appendChild(td);
   
               td = document.createElement("td");
               p = document.createElement("p");
               p.appendChild(document.createTextNode("Selected Options:"));
               td.appendChild(p);
               for (opt = 0; opt < selectedOptions.length; opt++) {
                  var li = document.createElement("li");
                  li.setAttribute("style", "margin-left: 40px");
                  li.appendChild(document.createTextNode(selectedOptions[opt]));
                  td.appendChild(li);
               }
               tr.appendChild(td);
   
               console.log("-------correct: " + correctOptions.toString());
               console.log("-------selected: " + selectedOptions.toString());
   
               if (selectedOptions.length < 1) { //check if the user answered the question
                  isCorrect = false;
               } else {
                  for (i = 0; i < selectedOptions.length; i++) { //decision if the answer is correct
                     var selected = selectedOptions[i];
                     if (!correctOptions.includes(selected)) {
                        isCorrect = false;
                     }
                  }
               }
   
               if (isCorrect) {
                  console.log("-------You are correct");
                  tr.setAttribute("style", "background-color:#ccffcc");
               } else {
                  tr.setAttribute("style", "background-color:#ff6666");
                  console.log("-------You are wrong");
               }
   
               table.appendChild(tr);
   
            }
   
         }
         document.getElementById("examHistory").appendChild(document.createElement("br"));
         document.getElementById("examHistory").appendChild(table);
      
      
   }
	
	
	
	
	
	
	
}
 
 
 
 
 
export default ExamHistory;