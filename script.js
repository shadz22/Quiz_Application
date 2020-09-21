//******* Quiz Controller *********** 
var quizController = (function() {

  //***** Question Constructor ********
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

})();

//******* UI Controller ********
var UIController = (function() {

  var domItems = {
    //Admin Panel Elements:
    questInsertBtn: document.getElementById("question-insert-btn")
  };

  return {
    getDomItems: domItems
  };

})();

//******** Controller *********
var controller = (function(quizCtrl, UICtrl) {

  UICtrl.getDomItems.questInsertBtn.addEventListener('click', function() {
    
  })

})(quizController, UIController);
