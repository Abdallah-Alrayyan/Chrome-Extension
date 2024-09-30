// Create and assign myLeads to an empty array
let myLeads = [];
// Store the input text in a inputEl variable
const inputEl = document.getElementById("input-el");

// Store the input button in a inputBtn variable
const inputBtn = document.getElementById("input-btn");
// Store the unordered list and store it in a const variable called ulEl
const ulEl = document.getElementById("ul-el");

// Store the delete button in a deleteBtn variable
const deleteBtn = document.getElementById("delete-btn");

// LOCALSTORAGE CAN STORE JUST STRING VALUES

// Get the leads from the localStorage (PARSE = string -> array)
const leadsFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));
console.log(leadsFromLocalStorage);

// Store the save tab button and store it in a tabBtn variable
const tabBtn = document.getElementById("tab-btn");

// Check if leadsFromLocalStorage is truthy
if (leadsFromLocalStorage) {
  // If so, set myLeads to its value and call render() with myLeads as argument
  myLeads = leadsFromLocalStorage;
  render(myLeads);
}

tabBtn.addEventListener("click", function () {
  // Check if the 'chrome' object is available (i.e., running as an extension)
  if (typeof chrome !== "undefined" && chrome.tabs) {
    // This part runs in Chrome extension
    chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
      myLeads.push(tabs[0].url);
      localStorage.setItem("myLeads", JSON.stringify(myLeads));
      render(myLeads);
    });
  } else {
    // This part runs in a regular web app, where we can't access Chrome tabs
    alert("This feature is only available in the Chrome extension.");
  }
});

// Create a function render() that update the unordered list manipulating DOM with innerHTML
function render(leads) {
  // Create a variable, listItems, to hold all the HTML for the list items
  let listItems = "";
  //  Add the items in the leads array to listItems using a for loop
  for (let i = 0; i < leads.length; i++) {
    // Use "template string" with backtick to use directly HTML elements
    listItems += `<li>
                        <a target="_blank" href="${leads[i]}">
                        ${leads[i]}
                        </a>
                </li>`;
  }
  // Convert strings into HTML syntax with innerHTML
  ulEl.innerHTML = listItems;
}

// Listen for double clicks on the delete button
deleteBtn.addEventListener("dblclick", function () {
  // When double clicked, clear localStorage, myLeads, and the DOM
  localStorage.clear();
  myLeads = [];
  // Call render() with myLeads(empty) as argument
  render(myLeads);
});

// Listen for clicks on inputBtn
inputBtn.addEventListener("click", function () {
  // Push the value from the inputEl into the myLeads array
  myLeads.push(inputEl.value);
  // Clear out the input field
  inputEl.value = "";

  // Save the myLeads array to localStorage after transformed it into a string
  localStorage.setItem("myLeads", JSON.stringify(myLeads));
  // Call render() with myLeads as argument
  render(myLeads);
});
