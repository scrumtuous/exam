import React, { Component } from 'react';

class Question extends Component {
  constructor(props) {
    super(props);

    this.state = {
      cheating: false,
    };
  }

  getNumberOfCorrectOptions() {
    let correctCount = 0;
    for (let i = 0; i < this.props.question.options.length; i++) {
      if (this.props.question.options[i].correct) {
        correctCount++;
      }
    }
    return correctCount;
  }

  getRadioOrCheckboxType() {
    return "checkbox";
  }

  toggleOption(index) {
    try {
      var flag = this.props.question.options[index].selected;
      this.props.question.options[index].selected = !flag;
      this.props.saveQuestionState(this.props.question);
    } catch (e) {
      console.log(e);
    }
  }

  isAnsweredCorrectly() {
    for (let i = 0; i < this.props.question.options.length; i++) {
      if ((this.props.question.options[i].correct) !== (this.props.question.options[i].selected)) {
        return "false";
      }
    }
    return "true";
  }

  isDisabled() {
    return this.props.disabled === true;
  }

  getAnswer() {
    return (
      <div className="btn-warning" dangerouslySetInnerHTML={{ __html: this.props.question.answer }} />
    );
  }

  highlightAnswer(index) {
    if (this.props.cheating || this.props.disabled) {
      if (this.props.question.options[index].correct) {
        return " border border-success ";
      }
    }
    return "";
  }

  handleRightClick = (e, index) => {
    e.preventDefault();

    const label = document.getElementById(`labelOption${index}`);
    const input = document.getElementById(`option${index}`);

    const isDisabled = label.getAttribute("data-disabled") === "true";

    if (isDisabled) {
      label.style.opacity = "1";
      input.disabled = false;
      label.setAttribute("data-disabled", "false");
    } else {
      label.style.opacity = "0.5";
      input.disabled = true;
      label.setAttribute("data-disabled", "true");
    }
  }

  render() {
    return (
      <div className="card-body">
        <p className="card-title" id="query"
          dangerouslySetInnerHTML={{
            __html: `${this.props.question.query} <small>(Choose ${this.getNumberOfCorrectOptions()})</small>`
          }}>
        </p>

        {
          this.props.question.options.map((option, index) =>
            <div className={"form-check my-2 " + this.highlightAnswer(index)} id={"outerOptionDiv" + index} key={index}>
              <input
                className="form-check-input option-radio"
                type={this.getRadioOrCheckboxType()}
                name="optionRadios"
                id={"option" + index}
                value={"option" + index}
                checked={this.props.question.options[index].selected}
                disabled={this.isDisabled()}
                onClick={() => this.toggleOption(index)}
              />
              <label
                className="form-check-label"
                htmlFor={"option" + index}
                id={"labelOption" + index}
                onContextMenu={(e) => this.handleRightClick(e, index)}
                data-disabled="false"
              >
                {this.props.question.options[index].text}
              </label>
            </div>
          )
        }
      </div>
    );
  }
}

export default Question;
