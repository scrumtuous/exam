import React, { Component } from 'react';
import Question from './Question';
import HistoryButton from './JumperButton';

class QuestionJumperPanel extends Component{
	
	constructor(props) {
        super(props);
		let history = JSON.parse(localStorage.getItem('examHistory'));
		console.log("here is the history: " +history.exams[0]);
		//console.log(object.exams[0]);
    }
	
    render(){
        return (

			<div class="card  mt-3 mb-3 ">
			   <div class="card-header d-flex justify-content-between align-items-center" id="questionJumperTitle" onClick={() => this.toggleWindow()}>

  Exam History
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
				

					JSON.parse(localStorage.getItem('examHistory')).exams.map((exam, i) => {
					  console.log("Outsideeee"+i);

					  let buttons = exam.map((value, index) => { 
							console.log("Inside"+index + " " + value.query);
							return 				<span><button class={this.getClass(value)}>q.{value.quid}
												</button>&nbsp;</span>
					  }
					  )
					   console.log("Here are the buttons: " + buttons);
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

	getClass(question){
		console.log("In getClass with question: " + question.query);
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



export default QuestionJumperPanel;

