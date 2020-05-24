$(document).ready(() => {

  /*Global Variables*/
  let displayString = '';
  let currentValue = '';
  let answer = '';

  /*Numbers 0-9*/
  $('.number').on('click', () => {
    /*Assign number variable*/
    let id = $(event.currentTarget).attr('id');
    let number;

    /*Needed this to pass test. Could make id's numbers to reduce code?*/
    switch(id) {
      case "zero":
        number = 0;
        break;
      case "one":
        number = 1;
        break;
      case "two":
        number = 2;
        break;
      case "three":
        number = 3;
        break;
      case "four":
        number = 4;
        break;
      case "five":
        number = 5;
        break;
      case "six":
        number = 6;
        break;
      case "seven":
        number = 7;
        break;
      case "eight":
        number = 8;
        break;
      case "nine":
        number = 9;
        break;
    }

    /*Reset if answer has already been calculated*/
    let regex = /[=]/g;

    if (regex.test(displayString)) {
      currentValue = '';
      displayString = '';
    }

    /*Ensure currentValue doesn't start with multiple zeroes*/
    /*Don't let calc symbol stay at start of currentValue*/
    if (currentValue !== '0' && currentValue !== '+' && currentValue !== '/' && currentValue !== '-' && currentValue !== '*') {
      /*Don't let currentValue or displayString exceed  length limits*/
      if (currentValue.length < 29 && displayString.length < 87) {
          currentValue += number;
          displayString += number;
      } else {
        currentValue;
        displayString;
      }
    } else {
      /*If number starts with zero, remove it*/
      if (currentValue === '0') {
      currentValue = currentValue.slice(0, currentValue.length-1) + number;
      displayString = displayString.slice(0, displayString.length-1) + number;
      }
      /*If number starts with calc symbol keep it in displayString, but not in currentValue*/
      else {
      currentValue = currentValue.slice(0, currentValue.length-1) + number;
      displayString += number;
      }
    }

    /*Show calculation in display field*/
    $('#display-sum').html(() => {
      if (displayString.length === 87) {
        $('#display-sum').html('DIGITAL LIMIT MET');
        setTimeout(
          function() {
           $('#display-sum').html(displayString);
          },
          1000
        );
      } else {
        return displayString;
      }
    });

    /*Show currentValue in answer field*/
    /*If number is at max length, show 'DIGITAL LIMITE MET'*/
    $('#display').html(() => {
      if (currentValue.length === 29) {
        $('#display').html('DIGITAL LIMIT MET');
        setTimeout(
          function() {
            $('#display').html(currentValue);
          },
          1000
        );
      } else {
        return currentValue;
      }
    });
  });

  /*Decimal*/
  $('#decimal').on('click', () => {
    /*Reset if answer has already been calculated*/
    let regex = /[=]/g;

    if (regex.test(displayString)) {
      currentValue = '';
      displayString = '';
    }

    /*Ensure decimal isn't used twice*/
    let regexTwo = /[.]/g;
    if (regexTwo.test(currentValue) === false) {
      /*Replace decimal with 0. if at start*/
     if (currentValue === '') {
        currentValue += '0.';
        displayString += '0.';
      }
      /*Replace decimal with 0. if calc symbol at start*/
      else if (currentValue === '+' || currentValue === '*' || currentValue === '/' || currentValue === '-') {
        currentValue = '0.';
        displayString += '0.';
      } else {
        currentValue += '.';
        displayString += '.';
      }

    /*Show calculation in display field*/
    $('#display-sum').html(() => {
      return displayString;
    });

    /*Show currentValue in answer field*/
    $('#display').html(() => {
      return currentValue;
    });
    }
  });

  /*Calculation Symbols*/
  $('.calc-symbol').on('click', () => {
    /*Assign variable*/
    let id = $(event.currentTarget).attr('id');
    let calcSymbol;

    switch(id) {
      case "add":
        calcSymbol = '+';
        break;
      case "subtract":
        calcSymbol = '-';
        break;
      case "divide":
        calcSymbol = '/';
        break;
      case "multiply":
        calcSymbol = '*';
        break;
    }
    /*If answer has been calculated, apply new calculation to the answer*/
    let regex = /[=]/g;
    if (regex.test(displayString)) {
      currentValue = calcSymbol;
      displayString = answer + calcSymbol;
    } else {
      /*If there are two or more consecutive operators, use the last*/
      let regexTwo =/[/+*-]+$/;
      let last = displayString.substr(-1);
      if (calcSymbol === '-') {
        displayString;
      } else {
        displayString = displayString.replace(regexTwo, '');
      }

    currentValue = '';
    displayString += calcSymbol;
  } 

    /*Show calculation in display field*/
    $('#display-sum').html(() => {
      return displayString;
    });

    /*Show currentValue in answer field*/
    $('#display').html(() => {
      return calcSymbol;
    });
  });

  /*Equals*/
  $('#equals').on('click', () => {
    /*Reset if calculation starts with divide or multiply*/
    let regex = /^[/]|^[*]/;
    if (regex.test(displayString)) {
      displayString = '';
      currentValue = '0';
      $('#display').html(() => {
        return displayString;
      });
      $('#answer').html(() => {
        return currentValue;
      });
    }

    /*Otherwise, calculate and display the answer*/
    else {
      /*If calculation ends with an operator, remove it*/
      let last = displayString.substr(-1);

      if (last === '/' || last === '*' || last === '+' || last === '-') {
        displayString = displayString.slice(0, displayString.length-1);
      }

      /*Then calculate the answer*/
      let answerFunc = new Function('return ' + displayString);
      answer = answerFunc();
      displayString += '=';
      $('#display-sum').html(() => {
        return displayString + answer;
      });

      $('#display').html(() => {
        return answer;
      });
    }
  });

  /*Clear*/
  $('#clear').on('click', () => {
    /*Reset variables and display*/
    currentValue = '';
    displayString = '';

    $('#display-sum').html(() => {
      return displayString;
    });

    $('#display').html(() => {
      return '0';
    });
  });
});
