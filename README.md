# Gmail-Automation
Automate job applications received and store the attached files (Resume) in the specified job role folder in Google Drive.

# Setup the process
Proceed with the following steps to setup your own gmail automation sytem:
1.  Log in as your organization in gmail.
2.  Go to Google Drive.
3.  Right click on "My Drive" > "More" > "Google Apps Script"
4.  Or directly follow this link (https://script.google.com/) and change the account to your organization at the top right corner.
5.  Create a new .gs file (Already created - Rename if need to)
6.  Paste the "job application.gs" file contents in the Editor.
7.  Save it.
8.  At the left hand panel, navigate to the "Triggers" section.
9.  Setup the trigger for the automation process to run.

# Set Trigger for the automation
Triggers are necessary for when the automation should start executing. As you proceed to the trigger section, follow the below steps:
1.  "Choose which function to run" > fetchEmailsAndCategorize
2.  "Which runs at deployment" > Head
3.  "Select event source" > Time-driven
4.  "Select type of time based trigger" > Minutes timer
5.  "Select minute interval" > Every minute
6.  "Failure notification settings" > Notify me immediately

By following the above steps, your emails will be automated every minute.
If you want to change the intervals, change the options in steps 4 & 5 of "Set Trigger for the automation" above.

# Deploy your project
1.  Upper right corner of the editor, you will find "Deploy" button.
2.  "Deploy" > "New deployment" > "Select type" > "Web app" > Add description if required in "Description" > click on "Deploy".

Your project is now deployed and in use.
