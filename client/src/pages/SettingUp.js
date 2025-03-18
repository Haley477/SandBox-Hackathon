import './App.css';

function SettingUp() {
  return (
    <div className="App">
    <h1>Setting Up Your Environment</h1>
    <h2>To set up your environment, follow these steps:</h2>
    <ol>
        <li>Download the following extension from google store: </li>
        <li>Configure the settings as per timeframe needed to send follow-up email.</li>
        <li>Test the installation by creating an email and setting 
            the timeframe for 30 minutes.<a href='/time-frame'>Setting Time Frame</a></li>
    </ol>
    <a href="/troubleshoot">If you encounter any issues, refer to the troubleshooting guide.</a>
    </div>
  );
}

export default SettingUp;
