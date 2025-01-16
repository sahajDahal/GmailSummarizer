# GmailSummarizer

🌟 Summarize your emails and receive a daily digest. Designed for efficiency and simplicity, it helps you stay on top of your communications without having to sift through countless messages. Uses OpenAI API to generate summaries.

## 🚀 Features:
- **Automated Email Summaries**: Parses your Gmail inbox daily to identify key messages and summarize them.
- **Concise Daily Digest**: Sends a single email summarizing your emails from the day, directly to your inbox.
- **Customizable Filters**: Focus on specific email categories, such as work, personal, or promotions, to tailor your summaries.
- **Secure and Private**: Built with privacy in mind, ensuring your email data remains safe.

---

## 🛠️ Setup and Instructions

### **Step 1: Create a Google Sheet**
1. Open Google Sheets and create a new sheet.
2. Create columns in the sheet with the following headers:
   - `Date`
   - `Sender`
   - `Subject`
   - `Message`
   - `Summary`
3. Your Google Sheet should look like this:

   ![Google Sheet Example](images/sheetScreenshot.png)

---

### **Step 2: Add Scripts to Google Apps Script**
1. In your Google Sheet, click on **Extensions > Apps Script**.
2. Add the following two scripts:
   - **`ExtractAndSummarize.gs`**:
     - Extracts emails received after 11 AM the previous day and summarizes them using OpenAI API.
     - Add your OpenAI API key to the script.
   - **`SendSummaryToMe.gs`**:
     - Sends the summarized email details to your inbox.
     - Add your email as the recipient in the script.

---

### **Step 3: Set Up Triggers**
1. Schedule the scripts to run automatically:
   - Open **Apps Script** and navigate to **Triggers**.
   - Set up the **`ExtractAndSummarize`** function to run daily between **10:00 AM - 11:00 AM**. Use the following reference:

     ![Extract Trigger Setup](images/ExtractTrigger.png)

   - Set up the **`SendSummaryToMe`** function to run daily between **11:00 AM - 12:00 PM**. Use the following reference:

     ![Send Summary Trigger Setup](images/SendSummaryTrigger.png)

---

## ✅ You're All Set!
Run the scripts manually the first time to test them, and check your inbox for a daily summary email. Enjoy staying organized with GmailSummarizer!
