//******* Quiz Controller *********** 
var quizController = (function() {

  //***** Question Constructor ********
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  return {
    addQuestionOnLocalStorage: function(newQuesText, opts) {
      var optionsArr, corrAns, newQuestion, questionId;

      optionsArr = [];
      questionId = 0;

      for(var i = 0; i < opts.length; i++) {
        if(opts[i].value !== "") {
          optionsArr.push(opts[i].value);
        }

        if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
          corrAns = opts[i].value;
        }
      }

      newQuestion = new Question(questionId, newQuesText.value, optionsArr, corrAns);
      console.log(newQuestion);
    }
  };

})();

//******* UI Controller ********
var UIController = (function() {

  var domItems = {
    //Admin Panel Elements:
    questInsertBtn: document.getElementById("question-insert-btn"),
    newQuestionText: document.getElementById("new-question-text"),
    adminOptions: document.querySelectorAll(".admin-option")

  };

  return {
    getDomItems: domItems
  };

})();

//******** Controller *********
var controller = (function(quizCtrl, UICtrl) {

  var selectedDomItems = UICtrl.getDomItems;

  selectedDomItems.questInsertBtn.addEventListener('click', function() {
    quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, selectedDomItems.adminOptions);

  })

})(quizController, UIController);
