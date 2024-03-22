document.addEventListener("DOMContentLoaded", () => {
  // DOM elements
  const notOnYT = document.getElementById("notOnYT");
  const statsNotLoaded = document.getElementById("statsNotLoaded");
  const adCountSpan = document.getElementById("adCountSpan");
  const adCountInS = document.getElementById("adCountInS");
  const adCountInM = document.getElementById("adCountInM");
  const adCountInH = document.getElementById("adCountInH");
  const adCountInSSpan = document.getElementById("adCountInSSpan");
  const adCountInMSpan = document.getElementById("adCountInMSpan");
  const adCountInHSpan = document.getElementById("adCountInHSpan");
  const stoppedStatus = document.getElementById("stopped");
  const runningStatus = document.getElementById("running");
  const adCountSection = document.getElementById("adCountSection");
  const savingsSection = document.getElementById("savings");
  const sEqualsM = document.getElementById("sEqualsM");
  const mEqualsH = document.getElementById("mEqualsH");

  try {
    // Query active tab and check for YouTube URL
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      const activeTab = tabs[0];
      if (activeTab?.url.startsWith("https://www.youtube.com")) {
        // Hide 'stopped' and show 'running' status
        stoppedStatus.classList.add("hidden");
        notOnYT.classList.add("hidden");
        runningStatus.classList.remove("hidden");
        statsNotLoaded.classList.remove("hidden");
      }
      // Check if the tab has finished loading before sending a message
      if (
        activeTab?.url.startsWith("https://www.youtube.com") &&
        activeTab.status === "complete"
      )
        chrome.tabs.sendMessage(activeTab.id, { requestAdCount: true });
    });

    // Listen for messages from the content script i.e. script.js
    chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
      // Update UI (index.html) based on the received message
      statsNotLoaded.classList.add("hidden");
      adCountSection.classList.remove("hidden");
      savingsSection.classList.remove("hidden");
      let adCount = message.adCount || 0;

      adCountSpan.innerHTML = adCount;
      adCountInS.innerHTML = adCount * 5;

      // Update ad count based on different ranges
      if (adCount >= 12 && adCount < 720) {
        adCountInM.innerHTML = Math.round((adCount * 100) / 12) / 100;
        sEqualsM.classList.remove("hidden");
        adCountInMSpan.classList.remove("hidden");
      } else if (adCount >= 720) {
        adCountInSSpan.classList.add("hidden");
        sEqualsM.classList.add("hidden");
        adCountInM.innerHTML = Math.round((adCount * 100) / 12) / 100;
        adCountInMSpan.classList.remove("hidden");
        adCountInH.innerHTML = Math.round((adCount * 100) / 720) / 100;
        mEqualsH.classList.remove("hidden");
        adCountInHSpan.classList.remove("hidden");
      }
    });
  } catch (error) {
    // Log error details if an exception occurs
    console.log("An error occurred while loading stats for SkipPi!");
    console.log(error);
  }
});
