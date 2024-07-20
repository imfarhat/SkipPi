try {
  // Listen for requests for the ad count
  chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.requestAdCount) {
      // Send the ad count to the popup script i.e. index.js
      chrome.runtime.sendMessage({
        adCount: parseInt(localStorage.getItem("adCount")),
      });
    }
  });

  function clickAdSkipButton() {
    const adSkipButton =
      document.querySelector(".ytp-ad-skip-button-modern") ||
      document.querySelector(".ytp-skip-ad-button");

    // const subscriptionPromoDismissBtn =
    //   document.querySelector("#dismiss-button") ||
    //   document.querySelector(".yt-mealbar-promo-renderer");

    if (!adSkipButton) return;
    if (adSkipButton) {
      adSkipButton.click();
      let adCount = parseInt(localStorage.getItem("adCount")) || 0;
      localStorage.setItem("adCount", ++adCount);
    }

    // if (subscriptionPromoDismissBtn) subscriptionPromoDismissBtn.click();
  }
  setInterval(clickAdSkipButton, 100);
} catch (error) {
  console.log(`An error occured while running SkipPi!`);
  console.log(error);
}
