function ExtractAndSummarize(){
  extractEmailsAndSummarize();
}

function extractEmailsAndSummarize() {  
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  // Get today's date and calculate 11:00 AM on the previous day
  var today = new Date();
  var startTime = new Date(today);
  startTime.setDate(today.getDate() - 1); // Go back one day
  startTime.setHours(11, 0, 0, 0); // Set time to 11:00 AM

  // Convert the startTime to a Unix timestamp (seconds since epoch)
  var unixTimestamp = Math.floor(startTime.getTime() / 1000);
  
  // Gmail search query using Unix timestamp (after:)
  var searchQuery = `in:inbox category:primary is:unread after:${unixTimestamp}`;
  var threads = GmailApp.search(searchQuery);

  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var emailDate = new Date(message.getDate()); // Date of the email
      
      // Ensure the email is after the specified start time
      if (emailDate >= startTime) {
        var emailFrom = message.getFrom();          // Sender's email
        var emailSubject = message.getSubject();    // Email subject
        var emailBody = message.getPlainBody();     // Email body

        // Generate a summary using OpenAI API
        var summary = generateSummary(emailBody); 

        // Append the email data and summary to the sheet
        sheet.appendRow([
          emailDate,
          emailFrom,
          emailSubject,
          emailBody,
          summary
        ]);

        message.markRead(); // Mark email as read to avoid reprocessing
      }
    }
  }
}




function generateSummary(emailBody) {
  var apiKey = "API_KEY"; // Replace with your OpenAI API key
  var url = "https://api.openai.com/v1/chat/completions";

  var payload = {
    model: "gpt-3.5-turbo", // Model of your choice
    messages: [
      { role: "system", content: "You are an assistant summarizing email content." },
      { role: "user", content: `Summarize the following email content:\n${emailBody}` }
    ],
    max_tokens: 100, // Adjust token limit
    temperature: 0.7
  };

  var options = {
    method: "post",
    contentType: "application/json",
    headers: {
      Authorization: `Bearer ${apiKey}`
    },
    payload: JSON.stringify(payload)
  };

  try {
    var response = UrlFetchApp.fetch(url, options);
    var json = JSON.parse(response.getContentText());
    return json.choices[0].message.content.trim(); // Access summary from chat response
  } catch (error) {
    Logger.log("Error while calling OpenAI API: " + error);
    return "Error generating summary.";
  }
}

