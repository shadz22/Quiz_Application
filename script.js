//******* Quiz Controller *********** 
var quizController = (function() {

  //***** Question Constructor ********
  function Question(id, questionText, options, correctAnswer) {
    this.id = id;
    this.questionText = questionText;
    this.options = options;
    this.correctAnswer = correctAnswer;
  }

  var questionLocalStorage = {
    setQuestionCollection: function(newCollection) {
      localStorage.setItem("questionCollection", JSON.stringify(newCollection));
    },
    getQuestionCollection: function() {
      return JSON.parse(localStorage.getItem("questionCollection")); // this returns an array
    },
    removeQuestionCollection: function() {
      localStorage.removeItem("questionCollection");
    }
  };

  return {
    addQuestionOnLocalStorage: function(newQuesText, opts) {
      var optionsArr, corrAns, newQuestion, questionId, getStoredQuestions;

      if(questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      } 

      optionsArr = [];

      for(var i = 0; i < opts.length; i++) {
        if(opts[i].value !== "") {
          optionsArr.push(opts[i].value);
        }

        if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
          corrAns = opts[i].value;
        }
      }

      // setting the id number:
      if(questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;

      } else {
        questionId = 0;
      }

      newQuestion = new Question(questionId, newQuesText.value, optionsArr, corrAns);

      getStoredQuestions = questionLocalStorage.getQuestionCollection();
      getStoredQuestions.push(newQuestion);
      questionLocalStorage.setQuestionCollection(getStoredQuestions);
      console.log(questionLocalStorage.getQuestionCollection());
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
