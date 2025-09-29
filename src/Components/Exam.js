import React from 'react';
import * as Realm from "realm-web";

import Timer from './Timer';
import Question from './Question';
import ExamHistory from './ExamHistory';
import JumperButton from './JumperButton';
import QuestionsPanel from './QuestionsPanel';
import QuestionJumperPanel from './QuestionJumperPanel';
import ExamHistoryPanel from './ExamHistoryPanel';

const REALM_APP_ID = "exam-app-vzpmu";
const app = new Realm.App({ id: REALM_APP_ID });

const LOCAL_QUESTIONS = process.env.REACT_APP_LOCAL_QUESTIONS !== 'false';

class Exam extends React.Component {
  constructor(props) {
    super(props);
    this.saveQuestionState = this.saveQuestionState.bind(this);
    this.gradeTheExam = this.gradeTheExam.bind(this);
    this.setCurrentQuestion = this.setCurrentQuestion.bind(this);
    this.toggleCheat = this.toggleCheat.bind(this);

    const d = new Date();
    const currentExam = JSON.parse(localStorage.getItem(this.props.name));
    const cheatFlag = this.props.page === 'answer';

    if (currentExam && !cheatFlag) {
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
      this.state = {
        name: this.props.name,
        graded: false,
        username: "kaisersose",
        start: d.getTime(),
        finish: 0,
        currentQuestionNumber: 0,
        cheating: cheatFlag,
      };
    }

    this.showGrade = false;
    this.elapsedTime = 0;
  }

componentDidMount() {
  window.addEventListener("auth:changed", () => {
    if (window.currentUser?.id_token && !this.state.questions?.length) {
      console.log("Auth changed; retrying fetch with id_token.");
      this.getExamQuestions();
    }
  }, { once: true });

  if (!this.state.questions) {
    this.getExamQuestions();
  }
}

async getExamQuestions() {
  console.log("Entering getExamQuestions() [RESTful API mode]");
  const name = this.props.name;
  const publicBlurAt = this.props.publicBlurAt;
  const protectedBlurAt = this.props.protectedBlurAt;
  
  console.log("blurs: " + this.props.publicBlurAt + " : " + this.props.protectedBlurAt);
  console.log("Exam name prop:", name);

  if (!name || !name.includes('~')) {
    console.error("Invalid 'name' prop format:", name);
    return;
  }

  // --- tiny helper: wait for token without hanging forever
  const getIdOrAccessTokenSoon = async (timeoutMs = 5000) => {
	console.log("In getIdOrAccessTokenSoon...");
    const current = () => (window.currentUser?.id_token || window.currentUser?.access_token || null);
    let token = current();
    if (token) return token;

    if (window.authReady && typeof window.authReady.then === "function") {
      const timeout = new Promise((resolve) => setTimeout(() => resolve(null), timeoutMs));
      const user = await Promise.race([window.authReady, timeout]);
      token = user?.id_token || user?.access_token || current();
    }
    return token || null;
  };

  const [resource, ids] = name.split('~');
let publicUrl = `https://api.certificationexams.guru/public/questions?exam=${resource}&ids=${ids}&exam=${resource}&stripeId=cus_SpwJW3NTk298Kf&productId=prod_Smt6NcuqQnfMjF&hardcoded=true&blurAt=${this.props.publicBlurAt}`;
let protectedUrl =`https://api.certificationexams.guru/protected/questions?exam=${resource}&ids=${ids}&exam=${resource}&stripeId=cus_SpwJW3NTk298Kf&productId=prod_Smt6NcuqQnfMjF&hardcoded=true&blurAt=${this.props.protectedBlurAt}`;
  console.log("Constructed public URL:", publicUrl);
  console.log("Constructed protected URL:", protectedUrl);
  console.log("Parsed resource:", resource);
  console.log("Parsed IDs:", ids);

  // wait for token to be ready (id_token preferred; fallback to access_token)
  let bearerToken = window.currentUser?.id_token || window.currentUser?.access_token;
  console.log("No bearer token... going to do the await thing...");
  if (!bearerToken) {
    bearerToken = await getIdOrAccessTokenSoon(5000);
  }
  console.log("\n\n: " + bearerToken + "\n\n");

  if (bearerToken) {
    console.log("Token found. Attempting POST request with Authorization header.");
	let questions = null;
    try {

	  console.log("GET protected URL:", protectedUrl);
      const postResponse = await fetch(protectedUrl, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${bearerToken}`,
        },
        //body
      });

      console.log("POST response status:", postResponse.status, postResponse.statusText);
	  
      if (postResponse.ok) {
        questions = await postResponse.json();
        console.log(`\n\n\nSuccessfully fetched ${questions.length} questions via protected URL.\n\n`);
        this.setState({ questions }, () => this.setCurrentQuestion(0));
        return;
      } else {
        console.warn("Protected request did not succeed:", await postResponse.text());
		console.log("Here are the questions:", questions); // logs as array in console
		console.log("Here are the questions: " + JSON.stringify(questions, null, 2));
      }
    } catch (postError) {
      console.error("POST request failed:", postError);
	  console.log("Here are the questions: " + questions);
    }
  } else {
    console.warn("No token found after wait. Skipping POST. Proceeding to GET request.");
  }

  try {
    console.log("Attempting GET request to:", publicUrl);
    const getResponse = await fetch(publicUrl);
    console.log("GET response status:", getResponse.status, getResponse.statusText);
    if (getResponse.ok) {
      let questions = await getResponse.json();
      console.log(`Successfully fetched ${questions.length} questions via GET.`);
      this.setState({ questions }, () => this.setCurrentQuestion(0));
      return;
    } else {
      console.warn("GET request did not succeed:", await getResponse.text());
    }
  } catch (getError) {
    console.error("GET request failed:", getError);
  }

  try {
    console.log("Attempting to load fallback questions from local questions.json");
    const module = await import('../questions.json');
    const localQuestions = module.default || module;
    if (Array.isArray(localQuestions) && localQuestions.length > 0) {
      console.log(`Loaded ${localQuestions.length} local questions.`);
      this.setState({ questions: localQuestions }, () => this.setCurrentQuestion(0));
    } else {
      throw new Error("Local questions.json is empty or malformed");
    }
  } catch (localError) {
    console.error("Failed to load local questions.json", localError);
  }
}



  setCurrentQuestion(position) {
    this.setState({ currentQuestionNumber: position });
    this.state.questions[position].viewed = true;
    this.saveQuestionState(this.state.questions[position]);
    localStorage.setItem(this.props.name, JSON.stringify(this.state));
  }

  toggleMarked() {
    console.log("In toggleMarked");
  }

  saveQuestionState(question) {
    const updatedExamQuestions = this.state.questions;
    updatedExamQuestions[this.currentQuestionNumber] = question;
    this.setState({ questions: updatedExamQuestions });
  }

  isQuestionAnsweredCorrectly(question) {
    return question.options.every(opt => opt.correct === opt.selected);
  }

  getCorrectCount() {
    return this.state.questions.filter(q => this.isQuestionAnsweredCorrectly(q)).length;
  }

  gradeTheExam() {
    const d = new Date();
    const examHistory = this.getExamHistory();

    this.setState({ graded: true, cheating: true, finish: d.getTime() }, () => {
      examHistory.exams.push(this.state);
      localStorage.setItem('examHistory', JSON.stringify(examHistory));
    });

    this.showGrade = true;
    localStorage.removeItem(this.props.name);
  }

  getExamHistory() {
    try {
      let object = localStorage.getItem('examHistory');
      if (!object) {
        const examHistory = { name: "Exam History", exams: [] };
        localStorage.setItem('examHistory', JSON.stringify(examHistory));
        return examHistory;
      } else {
        return JSON.parse(object);
      }
    } catch (e) {
      console.log(e);
    }
  }

  componentDidUpdate() {
    this.showGrade = false;
  }

  toggleCheat() {
    this.setState({ cheating: !this.state.cheating });
  }

  showResults() {
    if (this.state.graded) {
      return (
        <div className="card mt-2">
          <div className="card-header d-flex justify-content-between align-items-center" id="resultsTitle">
            Your grade is {this.getCorrectCount()} out of {this.state.questions.length}.
          </div>
          <div id="resultsbody" className="card-body">
            <p className="card-text">Learn more about every question asked.</p>
            <ul>
              <li>Short explanations of each question are below.</li>
              <li>Full explanations are linked in the answer.</li>
              <li>Each question has a Twitter link for discussion.</li>
              <li>Videos and tutorials covering these topics are available through the site.</li>
            </ul>
          </div>
        </div>
      );
    }
  }

  render() {
    const { questions, currentQuestionNumber, graded, cheating } = this.state;

    return (
      <div className="container">
        {this.showResults()}

        <QuestionsPanel
          questions={questions}
          currentQuestionNumber={currentQuestionNumber}
          disabled={graded}
          cheating={cheating}
          toggleCheat={this.toggleCheat}
          toggleMarked={this.toggleMarked}
          saveQuestionState={this.saveQuestionState}
          setCurrentQuestion={this.setCurrentQuestion}
          gradeTheExam={this.gradeTheExam}
          page={this.props.page}
        />

        <QuestionJumperPanel
          setCurrentQuestion={this.setCurrentQuestion}
          toggleMarked={this.toggleMarked}
          currentQuestionNumber={currentQuestionNumber}
          questions={questions}
          cheating={cheating}
          graded={graded}
        />

        {this.props.page !== 'answer' && (
          <ExamHistoryPanel
            setCurrentQuestion={this.setCurrentQuestion}
            toggleMarked={this.toggleMarked}
            currentQuestionNumber={currentQuestionNumber}
            questions={questions}
            cheating={cheating}
            graded={graded}
          />
        )}
      </div>
    );
  }
}

export default Exam;
