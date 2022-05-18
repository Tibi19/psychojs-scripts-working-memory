/**********  BEGIN ROUTINE  **********/

// Remove the click tracker used for calibration
window.webgazer.removeMouseEventListeners();

/**********  EACH FRAME  **********/

// Hide webcam thumbnail if eyes are in validation box
if (webgazer.checkEyesInValidationBox() === true) {
    // If last time that eyes were outside of validation box was longer than 
    // window.eyesReturnedDelay ago, hide thumbnail
    if (
      document.getElementById('webgazerFaceFeedbackBox').style.display != 'none' &&
      (new Date).getTime() > window.eyesExitedTimestamp + window.eyesReturnedDelay
    ) {   
      document.getElementById('webgazerFaceFeedbackBox').style.display = 'none';
      document.getElementById('webgazerVideoFeed').style.display = 'none';
    }
  } else {
      // Eyes outside of validation box; show thumbnail
      window.eyesExitedTimestamp = (new Date).getTime();
      document.getElementById('webgazerFaceFeedbackBox').style.display = 'block';
      document.getElementById('webgazerVideoFeed').style.display = 'block';
  }
  // Update tracking square to the average of last n gazes
  //let x = util.sum(window.xGazes) / window.xGazes.length;
  //let y = util.sum(window.yGazes) / window.yGazes.length;
  // Set tracking square to x and y, transformed to height units
  //tracking_square.setPos(
  //  util.to_height(
  //    [
  //      x - psychoJS.window.size[0] / 2,
  //      -1 * (y - psychoJS.window.size[1] / 2)
  //    ], 
  //    'pix', 
  //    psychoJS.window
  //  )
  //);
  //