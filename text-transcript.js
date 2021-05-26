//create an object, dictionary, in the database
if (typeof textIpaTransc !== 'object') {
    textIpaTransc = {};
  }
  
  (function () {
    'use strict';
  
    if (typeof textIpaTransc._ipaDict !== 'object') {
        textIpaTransc._ipaDict = {};
    }
  
    //create a function that differentiates words in ipa and errors and makes them easier to see 
    function ipaWord(error, text) {
      this.error = error;
      this.text = text;
    }
  
    //this will analyze the dictionary and divide it into separate elements, members of an array
    if (typeof textIpaTransc._parseDict !== 'function') {
        textIpaTransc._parseDict = function (lines) {
            console.log('Dictionary parsing attempt');
    
    //this will create a dictionary for the computer, by looking for words and their ipa match using regular expessions. Then it will use word as e key and ipa match as a result
        for (var i in lines) {
          var arr = lines[i].split(/\s+/g);
          textIpaTransc._ipaDict[arr[0]] = arr[1];
        }
        console.log('Parsing success');
      };
    }

    // this will load the dictionart from certain location
    if (typeof textIpaTransc.loadDict !== 'function') {
        textIpaTransc.loadDict = function (location) {
            console.log('Loading dictionary from location A');    
        if (typeof location !== 'string') {
          console.log('Error: Invalid location, no dictionary found');
        } else {
          var txtFile = new XMLHttpRequest();
          txtFile.open('GET', location, true);
          txtFile.onreadystatechange = function() {
            if (txtFile.readyState == 4) {
              if (txtFile.status == 200 || txtFile.status == 0) {
                textIpaTransc._parseDict(txtFile.responseText.split('\n'));
              }
            }
          };
  
          txtFile.send(null);
        }
      }; 
    }
    
    //this is the finction to find ipa match for a word we need in a newly created (parsed) dictionary
    if (typeof textIpaTransc.lookup !== 'function') {
    //lines below allow us to get mistakes AND more than one option for ipa match (but no more than 3 options)
        textIpaTransc.lookup = function (word) {
    
        if (Object.keys(textIpaTransc._ipaDict).length === 0) {
          console.log('Error: No data found');
        } else {
          if ( typeof textIpaTransc._IpaDict[word] != 'undefined' ) {
            var error = null;
            var text = textIpaTransc._ipaDict[word];
            for (var i = 1; i < 4; i++) {
              if ( typeof textIpaTransc._ipaDict[word + '(' + i + ')'] != 'undefined' ) {
                error = 'multi';
                
              } else {
                break;
              }
            }
            text = text.replace(/ˈ/g, '');
            console.log('Text replaced');
            return new ipaWord(error, text);
  
          } else {
            return new ipaWord('undefined', word);
          }
        }
      };
    }
  })();
