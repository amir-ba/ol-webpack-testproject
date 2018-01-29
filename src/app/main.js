import '../styles/style.css' ;
import '../styles/input-elements.css' ;
import {secretButton , secretParagraph} from './dom-loader'

var showSecret = false;
  	secretButton.addEventListener('click', toggleSecretState);
updateSecretParagraph();


 ready(function() {
console.log(1)
var alertMe= 'Hello world webpack is running'
alert(alertMe)
})
//setTimeout(function(){ alert("Hello"); }, 3000);

function toggleSecretState() {
    showSecret = !showSecret;
    updateSecretParagraph();
    updateSecretButton()
}

function updateSecretButton() {
    if (showSecret) {
        secretButton.textContent = 'Hide the Secret';
    } else {
        secretButton.textContent = 'Show the Secret';
    }
}

function updateSecretParagraph() {
    if (showSecret) {
        secretParagraph.style.display = 'block';
    } else {
        secretParagraph.style.display = 'none';
    }
}
function ready(fn) {
  if (document.readyState == 'DONE'){
    fn();
  } else {
    document.addEventListener('DOMContentLoaded', fn);
  }
}
