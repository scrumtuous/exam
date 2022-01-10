import React, { Component } from 'react';
import Question from './Question';
import JumperButton from './JumperButton';

class QuestionJumperPanel extends Component{
	
	constructor(props) {
        super(props);
    }
	
	getCurrentQuestion() {
		

		try {
			if (this.props.questions==null) {
				console.log("Questions are null.");
				return null;
			} else {
				return this.props.questions[this.props.currentQuestionNumber];
			}
		} catch (error) {
		  console.error("Error trying to return current question" + error);
		  return null;
		}
		
		
		
	};
	
    render(){
		if (this.getCurrentQuestion() == null ) {
			return <div class="card  mt-3">
  <div class="card-header d-flex justify-content-between" id="questionNumber">Loading...<a id="cheat" class=" enabled btn btn-warning ">Cheat</a></div>
  <div class="card-body">
    <div class="card-body">
	Loading...
    </div>

  </div>
</div>
		}
		
		
        return (

			<div class="card  mt-3 mb-3 ">
			   <div class="card-header d-flex justify-content-between align-items-center" id="questionJumperTitle" onClick={() => this.toggleWindow()}>

  Question Jumper
<svg id="caret" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-caret-up" viewBox="0 0 16 16">
<path d="M3.204 5h9.592L8 10.481 3.204 5zm-.753.659 4.796 5.48a1 1 0 0 0 1.506 0l4.796-5.48c.566-.647.106-1.659-.753-1.659H3.204a1 1 0 0 0-.753 1.659z"/>
</svg>


			  



			   </div>
			   <div id="jumper-card-body" class="card-body">
				  <p class="card-text"></p>
				  <div id="questionJumper">
				  {
					  this.props.questions.map((value, index) => { 
						return <JumperButton 
						indexNumber={index} 
						setCurrentQuestion={this.props.setCurrentQuestion} 
						questions={this.props.questions}
						question={this.props.questions[index]}
						currentQuestionNumber = {this.props.currentQuestionNumber} 
						cheating={this.props.cheating}
						graded={this.props.graded}
						toggleMarked={this.props.toggleMarked}
						></JumperButton>
					  }
					)
				  }
				  </div>
			   </div>
			</div>

        )
    }

	toggleWindow() {

	
var x = document.getElementById("jumper-card-body");
var y = document.getElementById("caret");

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

