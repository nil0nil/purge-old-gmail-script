function Activate() {
  ScriptApp.newTrigger("purgeMails")
           .timeBased().everyDays(1).create();
}

function Deactivate() {
  ScriptApp.getScriptTriggers()
            .forEach(tirgger => ScriptApp.deleteTrigger(trigger));
}

function purgeMails() {
  let day = new Date();
  day.setDate(day.getDate() - 100);
  const dateString = day.getFullYear() + "/" + (day.getMonth() + 1) + "/" + day.getDate();
  const criteria = "(before:" + dateString + " category:promotions -label:important -is:starred)";
  let threads = [0];

  while(threads.length > 0) {
    threads = GmailApp.search(criteria, 0, 500);
    Logger.log("purgeMails: " + criteria + " => " + threads.length + "threads");
    threads.forEach(thread => thread.moveToTrash());
  }
}
