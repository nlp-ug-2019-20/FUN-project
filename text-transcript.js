if (typeof textIpaTransc !== 'object') {
    textIpaTransc = {};
  }
  
  (function () {
    'use strict';
  
    if (typeof textIpaTransc._ipaDict !== 'object') {
        textIpaTransc._ipaDict = {};
    }
  
    function ipaWord(error, text) {
      this.error = error;
      this.text = text;
    }
  
    if (typeof textIpaTransc._parseDict !== 'function') {
        textIpaTransc._parseDict = function (lines) {
  
        for (var i in lines) {
          var arr = lines[i].split(/\s+/g);
          textIpaTransc._ipaDict[arr[0]] = arr[1];
        }
      };
    }
  
    if (typeof textIpaTransc.loadDict !== 'function') {
        textIpaTransc.loadDict = function (location) {
        // Will load the dictionart from certain location
  
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
  
    if (typeof textIpaTransc.lookup !== 'function') {
  
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
            console.log('replaced');
            return new ipaWord(error, text);
  
          } else {
            return new ipaWord('undefined', word);
          }
  
        }
  
      };
  
    }
  
  }());
  