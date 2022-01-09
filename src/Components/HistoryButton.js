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

		


		
		return 'btn btn-success btn-sm';
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