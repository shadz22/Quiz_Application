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


})();

//******** Controller *********
var controller = (function(quizCtrl, UICtrl) {


})(quizController, UIController);
