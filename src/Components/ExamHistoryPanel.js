import React, { Component } from 'react';
import Question from './Question';
import HistoryButton from './JumperButton';

class ExamHistoryPanel extends Component{
	
	constructor(props) {
        super(props);
		this.state = { hasError: false };
		//let history = JSON.parse(localStorage.getItem('examHistory'));
    }
	
	
	clearLocalStorage() {
		localStorage.clear('examHistory');
		this.getExamHistory();
	}
	
	getExamHistory() {
		//console.log("In EHP getExamHistory");
      try{
         let object = localStorage.getItem('examHistory');
         let examHistory = "";
         if (object == null) {
            examHistory = {name:"Exam History"};
            let exams = [];
            examHistory.exams = exams;
            localStorage.setItem('examHistory', JSON.stringify(examHistory));
         } else {
            examHistory = JSON.parse(object);
			
         }
         return examHistory;
      }catch(e){
         console.log(e);
      }
		
	}
	
	
    render(){
	console.log("In ExamHistoryPanel render");
	
	console.log(this.getExamHistory());
	console.log(this.getExamHistory().exams);
	
	let history = this.getExamHistory();
		
	if (history == null ) {
		return <span>No Exam History</span>;
	}
	
	if (history.exams == null ) {
		return <span>No Exams</span>;
	}
	if (history.exams.length == 0 ) {
		return <span></span>;
	}
	
	
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <h1>Something went wrong.</h1>;
    }
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
        return (

			<div class="card  mt-3 mb-3 ">
			   <div class="card-header d-flex justify-content-between align-items-center" id="questionJumperTitle" onClick={() => this.toggleWindow()}>

  <span>Exam History &nbsp;
  
  <a id="clearls" class="" type="submit"
         onClick={() => this.clearLocalStorage()}
      >Clear History</a></span>
  
  
<svg id="history-caret" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>


			   </div>
			   <div id="history-card-body" class="card-body">
				  <p class="card-text"></p>
				  
				  {

				  
				  }
				  
				  
				  <div id="historyJumper">
				  {
				

					this.getExamHistory().exams.map((exam, i) => {
					  //console.log("Outsideeee"+i);

					  let buttons = exam.questions.map((value, index) => { 
							//console.log("Inside"+index + " " + value.query);
							return 	 <span>{this.getButton(value)}</span>
					  }
					  )
					   //console.log("Here are the buttons: " + buttons);
						buttons.unshift(<br/> );
						buttons.unshift(exam.name );
						buttons.push(<hr/>);
					  return buttons;
					}
					)	  
								  

				  }
				  </div>
			   </div>
			</div>

        )
    }
	
  componentDidCatch(error, info) {
    // Display fallback UI
    this.setState({ hasError: true });
    // You can also log the error to an error reporting service
    //console.log(error);
	//console.log(info);
  }

getButton(question) {

var result = 'btn btn-warning btn-sm';
		let correctCount = 0;
        let i = 0;
		let correct = true;
		for (i = 0; i < question.options.length; i++) {
           if ( (question.options[i].correct) != (question.options[i].selected) ) {
			 correct = false;
		   }
		}
		//console.log("Cheating value in jumper: " + this.props.cheating );

		if (!correct) {
			result = <span>
<button class='btn btn-info'>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
</svg>
</button>
&nbsp;

</span>;
		}
		if (correct){
			result = <span>
<button class='btn btn-primary'>
<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-check-square" viewBox="0 0 16 16">
  <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
  <path d="M10.97 4.97a.75.75 0 0 1 1.071 1.05l-3.992 4.99a.75.75 0 0 1-1.08.02L4.324 8.384a.75.75 0 1 1 1.06-1.06l2.094 2.093 3.473-4.425a.235.235 0 0 1 .02-.022z"/>
</svg>
</button>&nbsp;</span>;
		}

		return result;

}

	getClass(question){
		//console.log("In getClass with question: " + question.query);
		var result = 'btn btn-warning btn-sm';

		 
		 

		let correctCount = 0;
        let i = 0;
		let correct = true;
		for (i = 0; i < question.options.length; i++) {
           if ( (question.options[i].correct) != (question.options[i].selected) ) {
			 correct = false;
		   }
		}
		//console.log("Cheating value in jumper: " + this.props.cheating );

		if (!correct) {
			result = 'btn btn-danger btn-sm';
		}
		if (correct){
			result = 'btn btn-info btn-sm';
		}

		return result;
	}


	toggleWindow() {

	
var x = document.getElementById("history-card-body");
var y = document.getElementById("history-caret");

  if (x.style.display === "none") {
    x.style.display = "block";
	y.innerHTML = '<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>';
  } else {
    x.style.display = "none";
	y.innerHTML = '<path d="M3.204 11h9.592L8 5.519 3.204 11zm-.753-.659 4.796-5.48a1 1 0 0 1 1.506 0l4.796 5.48c.566.647.106 1.659-.753 1.659H3.204a1 1 0 0 1-.753-1.659z"/>';

  }
} 

}



export default ExamHistoryPanel;

