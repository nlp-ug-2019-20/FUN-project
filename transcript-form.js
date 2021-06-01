if (typeof transcriptForm !== 'object') {
  transcriptForm = {};
}

(function () {

  'use strict';

  // Error message for unidenfied words
  if (typeof transcriptForm._undefMsg !== 'string') {
    transcriptForm._undefMsg = 'Some words you have entered cannot be found in the IPA dictionary.';
  }

  }

  if (typeof transcriptForm._updateParagraph !== 'function') {
    transcriptForm._updateParagraph = function (inID, text) {
      document.getElementById(inID).innerHTML = '<p>' + text + '</p>';
    };
  }

  // Update a text area after input and submit
  if (typeof transcriptForm._updateTextArea !== 'function') {
    transcriptForm._updateTextArea = function (inID, text) {
      document.getElementById(inID).value = text;
    };
  }

  if (typeof transcriptForm.convert !== 'function') {
    transcriptForm.convert = function (inID, outID) {

      // Check the input field
      if (typeof inID !== 'string') {
        console.log(Error: "inID" is not a valid ID"');
      } else if (typeof textIpaTransc !== 'object') {
        console.log(Error: "textIpaTransc" object not found.');
      } else {

        // Reset the error messages
        var currentErrorMessage = '';
        var currentMultiMessage = '';

        // Resulting array of IPA text words
        var ipaText = [];

        // Get the input as an array of separate words
        var englishTextArray = document.getElementById(inID).value.split(/\s+/g);

        for (var i in englishTextArray) {

          // Lookup the word in the dictionary, punctuation and case are stripped.
          var ipaWord = textIpaTransc.lookup(englishTextArray[i].toLowerCase().replace(/[^\w\s]|_/g, '').replace(/\s+/g, ' '));

          // Check if there is a word in a dictionary
          if (typeof ipaWord.error === 'undefined') {

            // If not, send error message and return plain text
            currentErrorMessage = ConverterForm._undefMsg;
            ipaText.push(englishTextArray[i]);

          // If it is, return the transcription
          } else {

            ipaText.push(ipaWord.text);

          }

        }

        // Turn the array back to the sentence
        ipaText = ipaText.join(' ');

        // Check if there is an output field
        if (typeof outID === 'string') {
          transcriptForm._updateTextArea(outID, ipaText);
        } else {
          console.log('Warning: "outID" is not a string.');
        }

      }

    };

  }

}());
