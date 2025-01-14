# GmailSummarizer

🌟 Summarize your emails and receive a daily digest. Designed for efficiency and simplicity, it helps you stay on top of your communications without having to sift through countless messages. Uses OpenAI api to generate summaries.

🚀 Features:
- Automated Email Summaries: Parses your Gmail inbox daily to identify key messages and summarize them.
- Concise Daily Digest: Sends a single email summarizing your emails from the day, directly to your inbox.
- Customizable Filters: Focus on specific email categories, such as work, personal, or promotions, to tailor your summaries.
- Secure and Private: Built with privacy in mind, ensuring your email data remains safe.

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

---

### **Step 2: Add Scripts to Google Apps Script**
1. In your Google Sheet, click on **Extensions > Apps Script**.
2. Add the following two scripts:
   - **`ExtractAndSummarize.gs`**: This script extracts emails received after 11 AM the previous day and summarizes them using OpenAI API.  
     - Make sure to **add your OpenAI API key** to the script.
   - **`SendSummaryToMe.gs`**: This script sends the summarized email details to your inbox.
     - Ensure to **add your email** as the recipient in the script.

---

### **Step 3: Run the Scripts**
1. Verify you have **unread emails** from 11 AM the previous day.
2. Run **`ExtractAndSummarize.gs`**:
   - A security warning will appear. Click **Continue**, then select **Advanced**, and press **Allow** to grant permissions.
3. Run **`SendSummaryToMe.gs`**:
   - Follow the same steps to allow permissions.
4. Check your inbox to confirm the summary email is delivered.

---
