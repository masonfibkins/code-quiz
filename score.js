function printHighscores() {
    //gets scores from localstorage or set to empty array
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    //sorts scores from high to low
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      //creates list of stored scores
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + " - " + score.score;
  
      //displays stored scores
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  
  function clearHighscores() {
      //clears all scores if clicked
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  
  document.getElementById("clear").onclick = clearHighscores;
  
  //runs function on page load
  printHighscores();