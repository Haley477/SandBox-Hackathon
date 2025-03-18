import React from 'react';
import './App.css';

function Dashboard() {
  return (
    <div className="App">
      <h1>Welcome to Email Follow-up Reminders</h1>
      
      <h2 className="section">Manual Reminders</h2>
      <p className="explanation">You can set up a manual reminder that will send you an email with the subject line 
          of the email you're following up on. This helps ensure important emails don't slip through the cracks.</p>
      
      <h2 className="section">Time Frame</h2>
      <p className="explanation">You can choose a customizable time frame for receiving reminder emails, such as 1 day, 2 days, 
          3 days, or 1 week.</p>
      
      <h2 className="section">Integration with Email Clients</h2>
      <p className="explanation">We are actively working on integrating with popular email clients like Outlook, Gmail, and Yahoo. 
          Stay tuned for updates on this feature!</p>
      
      <h2 className="section">For more information</h2>
      <a href="/setting-up">Click here for instructions on how to set up reminders!</a>
      <a href="/time-frame">Click here for more information on the time frame!</a>
      <a href="/troubleshoot">Click here for troubleshooting tips!</a>
    </div>
  );
}

export default Dashboard;
