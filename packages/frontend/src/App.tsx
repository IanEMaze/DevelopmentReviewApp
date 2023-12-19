import { useState } from 'react';
import './App.css';
import axios from 'axios';

function App() {
  const [result, setResult] = useState('');
  const [textColor, setTextColor] = useState('');

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevents the default form submission behavior

    const formData = new FormData(event.currentTarget); // Get form data

    const questionList: string[] = [
      'companyName',
      'deadlineExperience',
      'communicationExperience',
      'uiExperience',
      'expectationsMet',
      'recommendation',
    ];

    const data: { [key: string]: string } = {};

    questionList.forEach((question) => {
      const value = formData.get(question); // Get value for each question
      data[question] = value as string; // Assign value to newData object
    });

    try {
      const response = await axios.post(
        import.meta.env.VITE_API_URL + '/review',
        {
          data,
        },
      );
      setTextColor('#3FF96F');
      setResult(response.data);
    } catch (e) {
      setTextColor('red');
      setResult('Error submitting review');
    }
  };

  return (
    <>
      <header>
        <h1>Application Development Review Form</h1>
      </header>
      <div id="main-content">
        <p>
          Welcome to the Application Development Form. Your input plays a
          pivotal role in facilitating a seamless review process.
        </p>
        <p>
          We value your cooperation and remain dedicated to thoroughly reviewing
          and considering your feedback
        </p>
        <br />
        <form onSubmit={handleSubmit}>
          <label>
            <b>Enter your company name:</b>
            <input id="name" name="companyName" type="text" />
          </label>
          <br />
          <br />
          <label>
            <b>How did we handle expected deadlines?</b>
            <br />
            <input
              type="radio"
              id="deadline-excellent"
              name="deadlineExperience"
              value="Excellent"
            />
            <label htmlFor="deadline-excellent">Excellent</label>
            <input
              type="radio"
              id="deadline-good"
              name="deadlineExperience"
              value="Good"
            />
            <label htmlFor="deadline-good">Good</label>
            <input
              type="radio"
              id="deadline-fair"
              name="deadlineExperience"
              value="Fair"
            />
            <label htmlFor="deadline-fair">Fair</label>
            <input
              type="radio"
              id="deadline-poor"
              name="deadlineExperience"
              value="Poor"
            />
            <label htmlFor="deadline-poor">Poor</label>
          </label>
          <br />
          <br />
          <label>
            <b>How was the communication with our developers?</b>
            <br />
            <input
              type="radio"
              id="communication-excellent"
              name="communicationExperience"
              value="Excellent"
            />
            <label htmlFor="communication-excellent">Excellent</label>
            <input
              type="radio"
              id="communication-good"
              name="communicationExperience"
              value="Good"
            />
            <label htmlFor="communication-good">Good</label>
            <input
              type="radio"
              id="communication-fair"
              name="communicationExperience"
              value="Fair"
            />
            <label htmlFor="communication-fair">Fair</label>
            <input
              type="radio"
              id="communication-poor"
              name="communicationExperience"
              value="Poor"
            />
            <label htmlFor="communication-poor">Poor</label>
          </label>
          <br />
          <br />
          <label>
            <b>Were you satisfied with the user interface of our platform?</b>
            <br />
            <input
              type="radio"
              id="ui-excellent"
              name="uiExperience"
              value="Excellent"
            />
            <label htmlFor="ui-excellent">Excellent</label>
            <input type="radio" id="ui-good" name="uiExperience" value="Good" />
            <label htmlFor="ui-good">Good</label>
            <input type="radio" id="ui-fair" name="uiExperience" value="Fair" />
            <label htmlFor="ui-fair">Fair</label>
            <input type="radio" id="ui-poor" name="uiExperience" value="Poor" />
            <label htmlFor="ui-poor">Poor</label>
          </label>
          <br />
          <br />
          <label>
            <b>Did our services meet your expectations?</b>
            <br />
            <input
              type="radio"
              id="expectations-yes"
              name="expectationsMet"
              value="Yes"
            />
            <label htmlFor="expectations-yes">Yes</label>
            <input
              type="radio"
              id="expectations-no"
              name="expectationsMet"
              value="No"
            />
            <label htmlFor="expectations-no">No</label>
          </label>
          <br />
          <br />
          <label>
            <b>Would you recommend our services to others?</b>
            <br />
            <input
              type="radio"
              id="recommend-yes"
              name="recommendation"
              value="Yes"
            />
            <label htmlFor="recommend-yes">Yes</label>
            <input
              type="radio"
              id="recommend-no"
              name="recommendation"
              value="No"
            />
            <label htmlFor="recommend-no">No</label>
          </label>
          <br />
          <br />
          <input id="submitButton" type="submit" />
          <p id="resultText" style={{color:textColor}}><b>{result}</b></p>
        </form>
      </div>
    </>
  );
}

export default App;
