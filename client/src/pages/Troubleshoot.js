import './App.css';

function Troubleshoot() {
  return (
    <div className="App">
    <h1>Troubleshooting Tips</h1>
    <h2>Common Issues and Solutions</h2>
    <ul>
        <li>
            <strong>Issue:</strong> I am not receiving reminder emails.<br/>
            <strong>Solution:</strong> Check your spam folder and ensure that the email address you provided is correct.
        </li>
        <li>
            <strong>Issue:</strong> The reminder email is not formatted correctly.<br/>
            <strong>Solution:</strong> Ensure that you have set the correct time frame and that your email client supports HTML formatting.
        </li>
        <li>
            <strong>Issue:</strong> I cannot find the extension in the Google Store.<br/>
            <strong>Solution:</strong> Make sure you are searching for the correct name of the extension and that you are logged into your Google account.
        </li>
    </ul>
    <h2>Contact Support</h2>
    <p>If you are still experiencing issues, please contact our support team at <a href="mailto:">followupfollowup35@gmail.com</a></p>
    <br/>
    <a href="/">Click here to go back to the main page!</a>
    </div>
  );
}

export default Troubleshoot;
