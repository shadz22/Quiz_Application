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
      var optionsArr, corrAns, newQuestion, questionId, getStoredQuestions, isChecked;

      if(questionLocalStorage.getQuestionCollection() === null) {
        questionLocalStorage.setQuestionCollection([]);
      } 

      optionsArr = [];
      isChecked = false;

      for(var i = 0; i < opts.length; i++) {
        if(opts[i].value !== "") {
          optionsArr.push(opts[i].value);
        }

        if(opts[i].previousElementSibling.checked && opts[i].value !== "") {
          corrAns = opts[i].value;
          isChecked = true;
        }
      }

      // setting the id number:
      if(questionLocalStorage.getQuestionCollection().length > 0) {
        questionId = questionLocalStorage.getQuestionCollection()[questionLocalStorage.getQuestionCollection().length - 1].id + 1;

      } else {
        questionId = 0;
      }

      if(newQuesText.value !== "") {
        if(optionsArr.length > 1) {
          if(isChecked) {
            newQuestion = new Question(questionId, newQuesText.value, optionsArr, corrAns);

            getStoredQuestions = questionLocalStorage.getQuestionCollection();

            getStoredQuestions.push(newQuestion);

            questionLocalStorage.setQuestionCollection(getStoredQuestions);

            // Clear text input and the 'answer options' after inserting each new questions:
            newQuesText.value = "";
            for(var x = 0; x < opts.length; x++) {
              opts[x].value = "";
              opts[x].previousElementSibling.checked = false;
            }

            console.log(questionLocalStorage.getQuestionCollection());
          } else {
            alert("You didn't select the correct answer, or you selected the option without any value");
          }
        } else {
            alert("You must insert at least 2 options");
        }
      } else {
          alert("Please insert a question");
      }
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
