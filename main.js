// Save Bookmark
function saveBookmark(e) {
  // Prevent from page reloading
  e.preventDefault();

  // Get SiteName and URL
  var siteName = document.querySelector("#siteName").value;
  var siteUrl = document.querySelector("#siteUrl").value;

  // Create Bookmark object
  var bookmark = {
    name: siteName,
    url: siteUrl
  };

  // Store bookmark
  var bookmarks = [];

  //check if the local storage is not empty
  if (localStorage.getItem("bookmarks") !== null) {
    // Get bookmarks from local storage
    bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  }
  // adding new bookmark
  bookmarks.push(bookmark);

  // update bookmarks in local storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  // fetch bookmarks(create fetch bookmarks function separately first)
  fetchBookmarks();

  //  empty input
  document.querySelector("form").reset();
}

//Fetch bookmarks
function fetchBookmarks() {
  // Get current bookmarks from local storage.
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // Select the output bookmarks DIV
  var output = document.querySelector("#bookmarks");

  // Reset bookmarks div
  output.innerHTML = "";

  // loop over bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    // create div
    var div = document.createElement("div");
    // creat h3 with bookmark name as content
    var h3 = document.createElement("h3");
    h3.textContent = bookmarks[i].name;
    // create visit link
    var a = document.createElement("a");
    a.href = bookmarks[i].url;
    a.className = "btn btn-success";
    a.textContent = "Visit";

    // Create Delete Button
    var button = document.createElement("button");
    button.className = "btn btn-danger";
    button.textContent = "Delete";

    //   Add event Listner
    button.addEventListener("click", function(e) {
      var name = e.target.parentElement.children[0].textContent;
      deleteBookmark(name);
    });

    // Append h3, a into div
    div.appendChild(h3);
    div.appendChild(a);
    div.appendChild(button);

    // Append div into ouptput
    output.appendChild(div);
  }
}

// function to delete bookmark
function deleteBookmark(name) {
  // Get bookmarks from local storage
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

  // loop over Bookmarks
  for (var i = 0; i < bookmarks.length; i++) {
    if (bookmarks[i].name === name) {
      bookmarks.splice(i, 1);
      break;
    }
  }

  // Update local Storage
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));

  // re-fetch bookamrks output
  fetchBookmarks();
}

// adding even listener to submit button
document.querySelector("form").addEventListener("submit", saveBookmark);

// Adding event listener for page loading
window.addEventListener("load", fetchBookmarks);
