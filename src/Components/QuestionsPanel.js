import React, { Component } from 'react';
import Question from './Question';

class QuestionsPanel extends Component{
	
	constructor(props) {
        super(props);
    } 
	
	isQuestionAnsweredCorrectly(question) {
        let i = 0;
		for (i = 0; i < question.options.length; i++) {
			
           if ( (question.options[i].correct) != (question.options[i].selected) ) {
			 return false;
		   }
		}
		return true;
	}
	
	getCurrentQuestion() {
		return this.props.questions[this.props.currentQuestionNumber];
	};


	//toggleQuestions() {
	//	this.props.toggleQuestion();
	//};

	//toggleCheat() {
		
	//	console.log("toggle cheat");
	//	console.log("Value of cheating: " + this.props.cheating);
		//this.setState({cheating: !this.state.cheating});
	//	this.props.toggleCheat();
	//};
	
	changeQuestion() {
		this.props.setCurrentQuestion( this.props.indexNumber)
	}
	
	nextQuestion() {
	  this.props.setCurrentQuestion(this.props.currentQuestionNumber + 1);
	}
	
    previousQuestion() {
	  this.props.setCurrentQuestion(this.props.currentQuestionNumber - 1);
	}

	
   getEnabledOrDisabledButtonState(flag) {
	if(flag){
      return " enabled btn btn-primary ";
    } else {
	  return " disabled btn btn-primary ";
	}  
   }

   
   setPreviousButtonState() {
	   let buttonEnabled = this.props.currentQuestionNumber > 0;
	   return this.getEnabledOrDisabledButtonState(buttonEnabled);
   }
   
   setNextButtonState() {
	let buttonEnabled = this.props.currentQuestionNumber < this.props.questions.length-1;
	return this.getEnabledOrDisabledButtonState(buttonEnabled);
   }
   
   setFinishButtonState() {
	   let buttonEnabled = !this.props.graded;
	   return this.getEnabledOrDisabledButtonState(buttonEnabled);
   }
   
   getCheatButton() {
	   if(!this.props.disabled){
	   	  return <a id="cheat" class=" enabled btn btn-warning " onClick={() => this.props.toggleCheat()}>{(this.props.cheating ? 'Uncheat' : 'Cheat')}</a>;
	   }
   }
   
   getFinishButton() {
	   
	   if(!this.props.disabled){
	   	  return <a id="finish" class={this.setFinishButtonState()} onClick={() => this.props.gradeTheExam()}>Finish</a>;
	   }
	   
	   						
   }
   
    render(){
        return (


			<div class="card  mt-3">
			   <div class="card-header d-flex justify-content-between" id="questionNumber">
				  Question {this.props.currentQuestionNumber + 1}
					  {this.getCheatButton()}
				  
				  
			   </div>
			   <div class="card-body">
			   
				  <Question saveQuestionState = {this.props.saveQuestionState} question={ this.getCurrentQuestion()} disabled={this.props.disabled} cheating={this.props.cheating}/>
				  
				  <div class="card-text mt-3   d-flex justify-content-between ">
					 
<span>
						<a id="previous" class={this.setPreviousButtonState()} onClick={() => this.previousQuestion()}>&lt;&lt; Back</a>&nbsp;
						<a id="next" class={this.setNextButtonState()} onClick={() => this.nextQuestion()}>Next &gt;&gt;</a> &nbsp;
</span>
<span>
						
						{this.getFinishButton()}


</span>					  
					 
				  </div>
			   </div>
			</div>

        )
    }
} 

export default QuestionsPanel;

