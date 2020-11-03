import '../../assets/img/meet.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

let tabId = null;

chrome.commands.onCommand.addListener((command) => {
  if (command === 'create-meeting') {
    createMeet();
  }
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'create-meeting') {
    createMeet();
  }
});
const createMeet = () => {
  chrome.storage.local.get(['user'], (res) => {
    console.log(res);
    let authUser = res.user;
    var newURL = `http://meet.google.com/new?authuser=${authUser}`;
    chrome.tabs.create({ url: newURL }, (tab) => {
      tabId = tab.id;
      console.log(tab.url);
    });
    chrome.tabs.onUpdated.addListener((tab_id, changeInfo, tab) => {
      if (tabId === tab_id) {
        chrome.tabs.sendMessage(tabId, { msg: 'copy' });
      }
    });
  });
};
