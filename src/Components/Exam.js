import Timer from './Timer';
import Question from './Question';
import ExamHistory from './ExamHistory';
import JumperButton from './JumperButton';
import QuestionsPanel from './QuestionsPanel';
import QuestionJumperPanel from './QuestionJumperPanel'
import ExamHistoryPanel from './ExamHistoryPanel'
import React from 'react';
import * as Realm from "realm-web";

const REALM_APP_ID = "exam-app-vzpmu"; // e.g. myapp-abcde
const app = new Realm.App({ id: REALM_APP_ID });


// Set LOCAL_QUESTIONS to true by default. Use process.env.REACT_APP_LOCAL_QUESTIONS for override.
const LOCAL_QUESTIONS = process.env.REACT_APP_LOCAL_QUESTIONS !== 'false';

class Exam extends React.Component {
	

	

	componentDidMount()
	{
		if (this.state.questions==null) {
			this.getExamQuestions();
		}
		


			 
		//localStorage.clear();
//		fetch('http://localhost:8080/questions')
//        .then(res => res.json())
//        .then((data) => {
//          this.setState({ questions: data })
//		  console.log("We got the data");
//		  console.log(data);
 //       })
 //       .catch(console.log)
    }

	
  constructor(props) {
	  console.log("Hello World");

    super(props);
    

    this.saveQuestionState = this.saveQuestionState.bind(this);
	this.gradeTheExam = this.gradeTheExam.bind(this);
	this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
	this.showGrade = false;
	this.elapsedTime=0;
	this.toggleCheat = this.toggleCheat.bind(this);
	const d = new Date();
	
	let currentExam = JSON.parse(localStorage.getItem('currentExam'));
	
		let cheatFlag = false;
		console.log('This is the page prop: ' + this.props.page);
		if (this.props.page=='answer'){

			cheatFlag = true;
		} 
		
	
	if (currentExam!=null && this.props.page!='answer' ) {
		console.log("We found a currentExam!!! The questions are:");
		console.log(currentExam.questions);
		this.state = {
		  name: this.props.name,
		  graded: false,
		  username: "kaisersose",
		  start: d.getTime(),
		  finish: 0,
		  questions: currentExam.questions,
		  currentQuestionNumber: 0,
		  cheating: false,
		};
		
	} else {

		
		//.log("Questions commented out");
	  this.state = {
		  name: this.props.name,
		  graded: false,
		  username: "kaisersose",
		  start: d.getTime(),
		  finish: 0,
		  //questions: require('../questions.json').slice(0, 1),
		  currentQuestionNumber: 0,
		  cheating: cheatFlag,
		};
		//this.getExamQuestions();
		
	}
	


	
	
	
	
	

  }
  
  async getExamQuestions() {
    console.log("in getExamQuestions()");
    if (LOCAL_QUESTIONS) {
      // Use local questions.json
      import('../questions.json')
        .then((module) => {
          const localQuestions = module.default || module;
          this.setState({ questions: localQuestions.slice(0, 3) });
          this.setCurrentQuestion(0);
        })
        .catch((err) => {
          console.error("Failed to load local questions.json", err);
        });
      return;
    }
    try {
      const user = await app.logIn(Realm.Credentials.anonymous());
      const mongodb = app.currentUser.mongoClient("mongodb-atlas");
      const questions = mongodb.db("ceasars-club").collection("practitioner");
      console.log("Hello");
      console.log(questions);
      console.log("About to find questions in: " + this.props.message);
      let message = this.props.message;
      const question = await questions.find(JSON.parse(message));
      console.log(question);
      this.setState({ questions: question });
      this.setCurrentQuestion(0);
    } catch (error) {
      console.error("Failed to fetch from MongoDB, loading local questions.json instead.", error);
      import('../questions.json')
        .then((module) => {
          const localQuestions = module.default || module;
          this.setState({ questions: localQuestions.slice(0, 3) });
          this.setCurrentQuestion(0);
        })
        .catch((err) => {
          console.error("Failed to load local questions.json", err);
        });
    }
  }

    setCurrentQuestion(position) {
		this.setState({currentQuestionNumber: position});
		this.state.questions[position].viewed=true;
		this.saveQuestionState(this.state.questions[position]);
		localStorage.setItem('currentExam', JSON.stringify(this.state));
	}
	
	  
  toggleMarked(){
	  console.log("In toggleMarked");
	  //console.log(this.state.questions[0]);
	  
  }
	
   saveQuestionState(question){
	  var updatedExamQuestions = this.state.questions;
	  updatedExamQuestions[this.currentQuestionNumber] = question;  
      this.setState({questions: updatedExamQuestions});
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
	
	getCorrectCount() {
		let correctCount = 0;
		let i = 0;
		for (i = 0; i < this.state.questions.length; i++) {
           if ( this.isQuestionAnsweredCorrectly(this.state.questions[i]) ) {
			 correctCount++;
		   }
		}
		return correctCount;
	}

	gradeTheExam() {
		const d = new Date();
		let correctCount = this.getCorrectCount();
		let examHistory = this.getExamHistory();

		//examHistory.exams.push(this.state.questions);
		//examHistory.exams.push('questions', this.state.questions);
		
		this.setState({graded: true}, () =>{});
		
	    this.showGrade = true;
		this.setState({cheating: true}, () =>{});
		this.setState({finish: d.getTime()}, () => {
					examHistory.exams.push(this.state); 
					localStorage.setItem('examHistory', JSON.stringify(examHistory));
		});
		localStorage.removeItem("currentExam");
		
		
	}
	
	getExamHistory() {
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

  componentDidUpdate(){
	 this.showGrade = false;
  }
  
  toggleCheat(){
	 this.setState({cheating: !this.state.cheating});
  }

   
  

	
	
	
    save() {
	 console.log('In save');
	 //console.log('${this.state.query}');
	 console.log("Posting with the following JSON: " + JSON.stringify(this.state));

	console.log('COMPONENT DID MOUNT!');
    console.log('About to fetch');
    fetch('http://localhost:8080/exam', {
      method: 'POST',
      body: JSON.stringify(this.state),

    })
      .then((res) => res.json())
      .then((data) => {
			this.setState( data );
			JSON.stringify(data._id);
		  console.log((data.toString()));
		  
		  //String oid = data._id.$oid;
		  var newId = data._id.$oid;
		  this.setState({mongoid: newId});
		  console.log("OID is: " + ((data._id.$oid)));
		  console.log("The current state is now: " + JSON.stringify(this.state));
		  //this.setState(this, data);
      })
      .catch(console.log);
  }

  
  showResults() {
	  if (this.state.graded) {
	  return (
 
	<div class="card mt-2">
		<div class="card-header d-flex justify-content-between align-items-center" id="resultsTitle" >
		Your grade is {this.getCorrectCount()} out of {this.state.questions.length}.
		</div>
		<div id="resultsbody" class="card-body">
			<p class="card-text">Learn more about every question asked.</p>
			
			<ul>
			<li>Short explainations of each question are below.</li>
			<li>Full explainations are linked in the answer.</li>
			<li>Each question has a Twitter link for discussion</li>
			<li>Videos and tutorials covering these examination topics are available through the site.</li>
			</ul>
	 
		</div>
	</div>

	  
	  
	  );
	  
	  
	  
	  
	  
	  
	  }

  }

  render() { 
  
  let jumperPanel = null;
  let historyPanel = null;
  {
	  jumperPanel = 					<QuestionJumperPanel 
			setCurrentQuestion={this.setCurrentQuestion} 
			toggleMarked={this.toggleMarked}
			currentQuestionNumber = {this.state.currentQuestionNumber} 
			questions={this.state.questions}
			cheating={this.state.cheating}
			graded={this.state.graded} 
			
			/>
  } 
  
  if (this.props.page!='answer'){
	  historyPanel = 								<ExamHistoryPanel 
			setCurrentQuestion={this.setCurrentQuestion} 
			toggleMarked={this.toggleMarked}
			currentQuestionNumber = {this.state.currentQuestionNumber} 
			questions={this.state.questions}
			cheating={this.state.cheating}
			graded={this.state.graded} 
			
			/>
			
  } 
  
  
    return (
	


			<div class="container">
			
			{this.showResults()}


			

			<QuestionsPanel questions={this.state.questions} 
							currentQuestionNumber = {this.state.currentQuestionNumber} 
							disabled={this.state.graded} 
							cheating={this.state.cheating} 
							toggleCheat={this.toggleCheat}
							toggleMarked={this.toggleMarked}
							saveQuestionState={this.saveQuestionState}  
							setCurrentQuestion={this.setCurrentQuestion} 
							gradeTheExam = {this.gradeTheExam} 
							page = {this.props.page}

  
/>







			{jumperPanel}
			

			{historyPanel}
		




			
			


			</div>

    );
  }
}
 
export default Exam;