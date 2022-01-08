import React, { Component } from 'react';

 
class Question extends Component{
    constructor(props) {
        super(props);

		this.state = {
            question: this.props.currentQuestion,
        }
    }  

    render(){
        return (

            <div class="card-body">
				<h3 class="card-title" id="query"> 
               {this.props.question.query} {this.getNumberOfCorrectOptions()}
				</h3> 
			
			{
				this.props.question.options.map((option, index)=>
					<div class="form-check my-2" id={"outerOptionDiv" + index}> 
						<input class="form-check-input option-radio" type={this.getType()} name="optionRadios" id={"option"+index} value={"option"+ index}
						defaultChecked={this.props.question.options[index].selected} 
						onClick={() => this.props.toggleOption(index, this.props.question, this.props.questions, this.props.currentNumber)} 
						>
						</input>
						<label class="form-check-label" for={"option"+index} id={"labelOption"+index}>
						{this.props.question.options[index].text}
						</label>
					</div>
				)
			}
			
            </div> 
						
        )
    }
	
	isAnsweredCorrectly() {
		//alert("Hello Cruel World");
		let correctCount = 0;
        let i = 0;
		for (i = 0; i < this.props.question.options.length; i++) {
           if ( (this.props.question.options[i].correct) != (this.props.question.options[i].selected) ) {
			 return "false";
		   }
		}
		return "true";
	}
	
	
	getNumberOfCorrectOptions() {
		let correctCount = 0;
        let i = 0;
		for (i = 0; i < this.props.question.options.length; i++) {
           if (this.props.question.options[i].correct) {
			 correctCount++;
			 console.log("Correct" + correctCount);
		   }
		}
		return correctCount;
	}
	
	getType() {
		if (this.getNumberOfCorrectOptions() >1 ) {
			return "checkbox";
		}
		return "radio";
	}
	
}

export default Question;