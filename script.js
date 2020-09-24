/************************************
 ******** Quiz Controller ***********
 ************************************/ 

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

  if(questionLocalStorage.getQuestionCollection() === null) {
    questionLocalStorage.setQuestionCollection([]);
  } 

  return {

    getQuestsLocalStorage: questionLocalStorage,

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

      // Adding validations to save data in local storage
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
            return true;
            
          } else {
            alert("You didn't select the correct answer, or you selected the option without any value");
            return false;
          }
        } else {
            alert("You must insert at least 2 options");
            return false;
        }
      } else {
          alert("Please insert a question");
          return false;
      }
    }
  };

})();


/************************************
 ******** UI Controller ***********
 ************************************/

var UIController = (function() {

  var domItems = {
    //Admin Panel Elements:
    questInsertBtn: document.getElementById("question-insert-btn"),
    newQuestionText: document.getElementById("new-question-text"),
    adminOptions: document.querySelectorAll(".admin-option"),
    adminOptionsContainer: document.querySelector(".admin-options-container"),
    insertedQuestionsWrapper: document.querySelector(".inserted-questions-wrapper")

  };

  return {
    getDomItems: domItems,

    addInputDynamically: function() {

      var addInput = function() {

        var inputHTML, z;

        z = document.querySelector('.admin-option').length;

        inputHTML = '<div class="admin-option-wrapper"><input type="radio" class="admin-option-' + z + '" name="answer" value="' + z + '"><input type="text" class="admin-option admin-option-' + z + '" value=""></div>';

        domItems.adminOptionsContainer.insertAdjacentHTML('beforeend', inputHTML);

        domItems.adminOptionsContainer.lastElementChild.previousElementSibling.lastElementChild.removeEventListener('focus', addInput);

        domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener('focus', addInput);

      }

      domItems.adminOptionsContainer.lastElementChild.lastElementChild.addEventListener("focus", addInput);
    },

    // Make the questions to be displayed at the bottom of the page, as they are added
    createQuestionList: function(getQuestions) {
      var questHTML, numberingArr;

      numberingArr = [];

      domItems.insertedQuestionsWrapper.innerHTML = "";

      for( var i = 0; i < getQuestions.getQuestionCollection().length; i++) {

        numberingArr.push(i + 1);

        questHTML = '<p><span>' + numberingArr[i] + '. ' + getQuestions.getQuestionCollection()[i].questionText + '</span><button id="question-' + getQuestions.getQuestionCollection()[i].id + '">Edit</button></p>';

        domItems.insertedQuestionsWrapper.insertAdjacentHTML("afterbegin", questHTML);
      }
    }

  };

})();


/************************************
 *********** Controller *************
 ************************************/ 

var controller = (function(quizCtrl, UICtrl) {

  var selectedDomItems = UICtrl.getDomItems;

  UICtrl.addInputDynamically();

  UICtrl.createQuestionList(quizCtrl.getQuestsLocalStorage);

  selectedDomItems.questInsertBtn.addEventListener('click', function() {

    var adminOptions = document.querySelectorAll('.admin-option');

    var checkBoolean = quizCtrl.addQuestionOnLocalStorage(selectedDomItems.newQuestionText, adminOptions);

    if(checkBoolean) {
      UICtrl.createQuestionList(quizCtrl.getQuestsLocalStorage);
    }

  })

})(quizController, UIController);
