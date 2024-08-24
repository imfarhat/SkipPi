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

    if (!adSkipButton) return;

    // Ensure the button is visible and not disabled
    // adSkipButton.style.display = "block";
    // adSkipButton.style.visibility = "visible";
    // adSkipButton.style.opacity = "1";
    // adSkipButton.disabled = false;

    // Simulate a click event
    const mouseEvent = new MouseEvent("click", {
      view: window,
      bubbles: true,
      cancelable: true,
      screenX: 0,
      screenY: 0,
      clientX: 0,
      clientY: 0,
      ctrlKey: false,
      altKey: false,
      shiftKey: false,
      metaKey: false,
      button: 0,
      relatedTarget: null,
    });

    adSkipButton.dispatchEvent(mouseEvent);

    let adCount = parseInt(localStorage.getItem("adCount")) || 0;
    localStorage.setItem("adCount", ++adCount);
  }

  setInterval(clickAdSkipButton, 100);
} catch (error) {
  console.log("An error occurred while running SkipPi!");
  console.log(error);
}
