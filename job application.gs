function fetchEmailsAndCategorize() {
  var folderName = "Gmail automation";
  var rootFolder = getOrCreateFolder(folderName);
  
  var threads = GmailApp.search("label:inbox is:unread");
  
  for (var i = 0; i < threads.length; i++) {
    var messages = threads[i].getMessages();
    for (var j = 0; j < messages.length; j++) {
      var message = messages[j];
      var subject = message.getSubject().toLowerCase();
      
      var newFolderName = getFolderNameFromSubject(subject);

      if (newFolderName) {
        // look for folder in "Gmail automation" folder
        var folderexists = rootFolder.getFoldersByName(newFolderName);

        if (folderexists.hasNext()) {

          // folder exists
          var subFolder = folderexists.next();

        } else {

          // folder not found. Creating new one.
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

function getFolderNameFromSubject(subject) {
  if ((subject.includes("resume for") || subject.includes("application for")) && subject.includes("software engineer")) {
    return "Job Application - Software Engineer";
  }
  else if((subject.includes("resume for") || subject.includes("application for")) && (subject.includes("full stack developer") || subject.includes("full stack developer"))) {
    return "Job Application - Full Stack Developer";
  }
  else if((subject.includes("resume for") || subject.includes("application for")) && (subject.includes("support") || subject.includes("support engineer"))) {
    return "Job Application - Support Engineer";
  }
  else if((subject.includes("resume for") || subject.includes("application for")) && subject.includes("engineer")) {
    return "Job Application - Engineer";
  }
  
  return "Others";
}

function getOrCreateFolder(folderName) {
  var rootFolder = DriveApp.getRootFolder();
  var folders = rootFolder.getFoldersByName(folderName);
  
  if (folders.hasNext()) {
    return folders.next();
  } else {
    return rootFolder.createFolder(folderName);
  }
}
