import React, { useState } from 'react';
import './App.css';

function TimeFrame() {
  // Define state to hold the value of the textarea
  const [timeFrame, setTimeFrame] = useState('');

  // Function to handle form submission (log the value of the textarea)
  const handleSubmit = (event) => {
    event.preventDefault(); // Prevent the page from reloading on submit
    console.log(timeFrame); // Log the value to the console
  };

  return (
    <div className="App">
      <h1>Time Frame</h1>
      <p>The time frame for the email follow-up is as follows:</p>

      <form onSubmit={handleSubmit}>
        {/* Textarea with value linked to state */}
        <textarea
          rows="4"
          cols="50"
          placeholder="Enter your time frame here..."
          value={timeFrame} // Bind the textarea to the state value
          onChange={(e) => setTimeFrame(e.target.value)} // Update state on change
        ></textarea>
        <br />
        
        <button type="submit">Submit</button>
      </form>

      <p>For example, you can set reminders for 1 day, 2 days, 3 days, or 1 week.</p>
      <p>Make sure to adhere to reply to follow-up yes or no depending on if you need
        another reminder or not.</p>

      <br />
      <a href="/setting-up">Click here for instructions on how to set up reminders!</a>
      <a href="/">Click here to go back to the main page!</a>
      <a href="/troubleshoot">Click here for troubleshooting tips!</a>
    </div>
  );
}

export default TimeFrame;
