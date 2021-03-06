let api_key = "wGXhi7fLKdBmDP5PdNR5Eu3N4JOvJ9lez2UnnqwJ";

let today = new Date();
//let start_date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

let start_date = today
  .toLocaleString("en-us", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })
  .replace(/(\d+)\/(\d+)\/(\d+)/, "$3-$1-$2");
let months = [
  "Jan.",
  "Feb.",
  "March",
  "April",
  "May",
  "June",
  "July",
  "Aug.",
  "Sept.",
  "Oct.",
  "Nov.",
  "Dec.",
];
let monthWord = months[today.getMonth()];
//let start_month = today.toLocaleString('en-us', { month: '2-digit' });
// let date = start_date.toString();
//makes a second object date
let second = new Date();
//finds the seven days before
let before = second.getDate() + 7;
//sets the second date to 7 days before the current date
second.setDate(before);
let sevenStr = second.toString();
let monthSec = months[second.getMonth()];

let url = `https://api.nasa.gov/neo/rest/v1/feed?start_date=${start_date}&end_date=${start_date}&api_key=${api_key}`;

async function getResponse(url) {
  try {
    await fetch(url)
      .then((resp) => resp.json()) // Transform the data into json
      .then(function (data) {
        createElements(data);
      });
  } catch {
    alert("TELL NASA TO CODE BETTER. THE API BROKE");
  }
}

function createElements(response) {
  //let length = response.near_earth_objects.length - 1;
  //the line below gets the current date of the device
  //document.getElementById("start_date").innerHTML = today;
  // document.getElementById("second").innerHTML = second;
  //  document.getElementById("start_month").innerHTML = (today.getMonth() + 1);
  document.getElementById("start_month").innerHTML = monthWord;
  document.getElementById("start_day").innerHTML = today.getDate();
  document.getElementById("end_month").innerHTML = monthSec;
  document.getElementById("end_day").innerHTML = second.getDate();

  let asteroids = response.near_earth_objects[start_date];
  console.log(asteroids);

  if (asteroids == undefined || asteroids.length == 0) {
    body: "No asteroids for today.";
    createListItem("No asteroids for today");
  } else {
    try {
      for (var i = 0; i < asteroids.length; i++) {
        // asteroids.push(response);
        createListItem(asteroids[i].name);
        // var obj = asteroids[todayDate][i];

        var name = asteroids[i].name;
        //alert("NAME: " + name);
      }
    } catch (err) {
      console.log("Caught error" + err);
    }
  }
}

function createListItem(name) {
  const list = document.getElementById("list");
  const li = document.createElement("LI");
  li.innerHTML = name;
  list.appendChild(li);
}

getResponse(url);
