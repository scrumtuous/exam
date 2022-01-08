import React, { Component } from 'react';
import Question from './Question';
import JumperButton from './JumperButton';

class QuestionJumperPanel extends Component{
	
	constructor(props) {
        super(props);
    }
	
    render(){
        return (

			<div class="card mt-3 mb-3 qj">
			   <div class="card-header d-flex justify-content-between align-items-center" id="questionJumperTitle" onClick={() => this.formatToTable()}>

  Question Jumper
<button type="button" class="close" aria-label="Close">
  <span aria-hidden="true"><small>_</small></span>
</button>
			  



			   </div>
			   <div id="jumper-card-body" class="card-body">
				  <p class="card-text"></p>
				  <div id="questionJumper">
				  {
					  this.props.questions.map((value, index) => { 
						return <JumperButton indexNumber={index} setCurrentQuestion={this.props.setCurrentQuestion} ></JumperButton>
					  }
					)
				  }
				  </div>
			   </div>
			</div>

        )
    }

	formatToTable() {

	
var x = document.getElementById("jumper-card-body");


  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
} 

}



export default QuestionJumperPanel;

