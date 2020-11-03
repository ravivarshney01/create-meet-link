chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
  if (request.msg === 'copy') {
    navigator.clipboard.writeText(document.URL);
  }
});
