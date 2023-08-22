function fetchEmailsAndCategorize() {
  // declare a folder name "Gmail automation"
  var folderName = "Gmail automation";

  // look for "Gmail automation" folder, if not found, create it.
  var rootFolder = getOrCreateFolder(folderName);
  
  // read unread emails (if any)
  var threads = GmailApp.search("label:inbox is:unread");
  
  // iterate through each email (thread)
  for (var i = 0; i < threads.length; i++) {

    // store message of each email
    var messages = threads[i].getMessages();

    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];

      // fetch subject line
      var subject = message.getSubject().toLowerCase();
      
      // folder name (job applying for)
      var newFolderName = getFolderNameFromSubject(subject);

      // look if folder already exists
      if (newFolderName) {
        // look for folder in "Gmail automation" folder
        var folderexists = rootFolder.getFoldersByName(newFolderName);

        if (folderexists.hasNext()) {

          // folder exists
          var subFolder = folderexists.next();

        } else {

          // folder doesn't exists. Creating new one.
          var subFolder = rootFolder.createFolder(newFolderName);
        }

        // fetch attachment (resume) from the email
        var attachments = message.getAttachments();

        // store the attachment (resume) in the specific folder
        for (var k = 0; k < attachments.length; k++) {
          var attachment = attachments[k];
          subFolder.createFile(attachment);
        }

        // mark email as read
        message.markRead();
      }
    }
  }
}

// function to segregate application into their job profile folder name
function getFolderNameFromSubject(subject) {

  // software engineer
  if ((subject.includes("resume for") || subject.includes("application for")) && subject.includes("software engineer")) {
    return "Job Application - Software Engineer";
  }

  // full stack developer
  else if((subject.includes("resume for") || subject.includes("application for")) && (subject.includes("full stack developer") || subject.includes("fullstack developer"))) {
    return "Job Application - Full Stack Developer";
  }

  // support engineer
  else if((subject.includes("resume for") || subject.includes("application for")) && (subject.includes("support") || subject.includes("support engineer"))) {
    return "Job Application - Support Engineer";
  }

  // just some engineer
  else if((subject.includes("resume for") || subject.includes("application for")) && subject.includes("engineer")) {
    return "Job Application - Engineer";
  }

  // general job application
  else if((subject.includes("resume for") || subject.includes("application for"))) {
    return "Job Application - General";
  }
  
  // none of the above (others)
  return "Others";
}

// look for folderName. if found, return it. if not found, create one.
function getOrCreateFolder(folderName) {

  // jump to root directory of google drive
  var rootFolder = DriveApp.getRootFolder();

  // search for folderName
  var folders = rootFolder.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    // folderName exists
    return folders.next();
  } else {
    // folderName doesn't exists, creating new one
    return rootFolder.createFolder(folderName);
  }
}
