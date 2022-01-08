import React, { Component } from 'react';

class JumperButton extends Component{
	
	constructor(props) {
        super(props);
    }
	
	changeQuestion() {
		this.props.setCurrentQuestion( this.props.indexNumber );
	}
	
    render(){
        return (
			<span>
				<button id="btn{this.props.questionNumber}" type="button" class={this.getClass()} onClick={() => this.changeQuestion()}>
				{this.props.indexNumber + 1}{console.log(this.props.questions[this.props.indexNumber].getAnswer)}
				</button>
				&nbsp;
			</span>
        )
    }
	
	getClass(){
		//var question = this.props.
		var result = 'btn btn-light btn-sm';
		
		if (this.props.questions[this.props.indexNumber].viewed) {
			result = 'btn btn-secondary btn-sm';
			console.log("The question has been viweed");
		}
	    if ([this.props.indexNumber] == this.props.currentQuestionNumber) {
			result = 'btn btn-primary btn-sm';
			console.log("Current Questions");

		}
		

		let correctCount = 0;
        let i = 0;
		let correct = true;
		for (i = 0; i < this.props.question.options.length; i++) {
           if ( (this.props.question.options[i].correct) != (this.props.question.options[i].selected) ) {
			 correct = false;
		   }
		}
		console.log("Cheating value in jumper: " + this.props.cheating );
		if (this.props.cheating || this.props.graded ) {
			if (!correct) {
				result = 'btn btn-danger btn-sm';
			}
			if (correct){
				result = 'btn btn-success btn-sm';
			}
		}
		


		
		return result;
	}
	
	
} 

export default JumperButton;


/*
  createJumperButtons(){
   document.getElementById("questionJumper").innerHTML = "";
   var questionsLength = this.state.questions.length;
     for(var i = 0; i < questionsLength; i++){
         var button = document.createElement("button");
         button.appendChild(document.createTextNode(i+1));
         button.setAttribute("id", "btn"+i);
         button.setAttribute("type", "button");
         button.setAttribute("class", "btn btn-secondary btn-sm");
         if(i == this.state.currentQuestionNumber){
            button.setAttribute("class", "btn btn-primary btn-sm");
         }
         document.getElementById("questionJumper").appendChild(button);
         document.getElementById("questionJumper").appendChild(document.createTextNode("\u00A0"));//nbsp
     }

     for(let x = 0; x < questionsLength; x++){
         var elem = document.getElementById("btn"+x);
         elem.addEventListener("click", () => { this.clickJumperButton(x); });
     }
  }

  clickJumperButton(x){

   //this.updateTimeSpent();
   //this.setState({time:0});
   this.setCurrentQuestion(x);
  
  }


*/