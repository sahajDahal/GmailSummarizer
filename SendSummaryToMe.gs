
function sendDailySummaries() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  var data = sheet.getDataRange().getValues(); // Get all data from the sheet
  
  // Get the current date and calculate 11:00 AM on the previous day
  var today = new Date();
  var startTime = new Date(today);
  startTime.setDate(today.getDate() - 1); // Set to the previous day
  startTime.setHours(11, 0, 0, 0); // Set time to 11:00 AM
  
  var summaries = []; // Array to store formatted summaries
  
  // Loop through the sheet data (skip header row)
  for (var i = 1; i < data.length; i++) {
    var emailDate = new Date(data[i][0]); // Assuming Date is in column A
    if (emailDate >= startTime) { // Check if the email date is after 11:00 AM on the previous day
      var sender = data[i][1];     // Sender's email (column B)
      var subject = data[i][2];    // Email subject (column C)
      var message = data[i][3];    // Email message (column D)
      var summary = data[i][4];    // Email summary (column E)
      
      // Format the summary content
      summaries.push(`
        <p><strong>Sender:</strong> ${sender}</p>
        <p><strong>Subject:</strong> ${subject}</p>
        <p><strong>Message:</strong><br>${message.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
        <p><strong>Summary:</strong><br>${summary.replace(/(?:\r\n|\r|\n)/g, '<br>')}</p>
        <hr>
      `);
    }
  }
  
  if (summaries.length > 0) {
    // Compile the email body
    var emailBody = `
      <h2>Daily Email Summaries</h2>
      <p>Here are the email summaries for emails received after 11:00 AM on ${startTime.toDateString()}:</p>
      ${summaries.join('')}
    `;

    // Send the email
    var recipient = "example@gmail.com"; // Replace with your email address
    var subject = `Daily Email Summaries for ${today.toDateString()}`;
    GmailApp.sendEmail(recipient, subject, "", { htmlBody: emailBody });
  } else {
    Logger.log("No summaries found for the specified time range.");
  }
}


