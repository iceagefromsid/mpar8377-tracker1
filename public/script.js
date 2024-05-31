function openForm() { // this form is the pop-up window to intake users input and then reciprocate them in the results section
  const width = window.innerWidth * 0.8; // 80% of the viewport width
  const height = window.innerHeight * 0.8; // 80% of the viewport height
  const left = (window.innerWidth - width) / 2; 
  const top = (window.innerHeight - height) / 2;
  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popup = window.open('', 'CoffeeCounterPopUp', features);

  //this is the pop-up document containing the html, css, and javascript controlling the way the pop-up window works
  //the use of generative ai was implemented to create this as I had neither the knowledge nor skills to implement it by myself.
  popup.document.write(` 
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Add Coffee Count</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          text-align: left;
          margin: 0;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
        }
        label {
          font-size: 1em;
          margin: 10px 0 5px;
        }
        input, select {
          padding: 5px;
          margin-bottom: 10px;
          width: 100%;
        }
        button {
          padding: 10px;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          font-size: 1em;
          margin-top: 10px;
          width: 100%;
        }
        button:hover {
          background-color: #45a049;
        }
      </style>
    </head>
    <body>
      <form id="coffeeForm">
        <label for="date">Date:</label>
        <input type="date" id="date" required>
        <label for="time">Time:</label>
        <input type="time" id="time" required>
        <label for="location">Location:</label>
        <input type="text" id="location" required>
        <label for="type">Coffee Type:</label>
        <select id="type" required>
          <option value="Espresso">Espresso</option>
          <option value="Latte">Latte</option>
          <option value="Black-Coffee">Black Coffee</option>
          <option value="Mocha">Mocha</option>
          <option value="Americano">Americano</option>
          <option value="Cappuccino">Cappuccino</option>
          <option value="Flat-White">Flat White</option>
          <option value="Cafe-au-Lait">Cafe au Lait</option>
          <option value="Macchiato">Macchiato</option>
          <option value="Cold-Brew">Cold Brew</option>
          <option value="Irish-Coffee">Irish Coffee</option>
          <option value="Frappe">Frappe</option>
          <option value="Vietnamese-Coffee">Vietnamese Coffee</option>
          <option value="Affogato">Affogato</option>
          <option value="Red-Eye">Red Eye</option>
        </select>
        <label for="rating">Rating (1-5):</label>
        <input type="number" id="rating" min="1" max="5" required>
        <button type="button" onclick="submitForm()">Submit</button>
      </form>
      <script>
      function submitForm() {
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const location = document.getElementById('location').value;
        const type = document.getElementById('type').value;
        const rating = document.getElementById('rating').value;

        if (!date || !time || !location || !type || !rating) {
          alert('Please fill out all fields.');
          return;
        }

        const coffee = { date, time, location, type, rating };

        const coffeeList = JSON.parse(localStorage.getItem('coffees')) || [];
        coffeeList.push(coffee);
        localStorage.setItem('coffees', JSON.stringify(coffeeList));

        window.opener.updateCoffeeList();
        window.close();
      }
      </script>
    </body>
    </html>
  `);
}

function clearAllCoffees() { //this functions as a way to clear all the coffees if the user wants to restart
  localStorage.removeItem('coffees');
  updateCoffeeList(); // Update the displayed coffee list
}

function updateCoffeeList() { //updates the list when a new coffee is inputted
  const coffeeList = JSON.parse(localStorage.getItem('coffees')) || []; 
  const coffeeListDiv = document.getElementById('coffeeList');

  coffeeListDiv.innerHTML = ''; 
  coffeeList.forEach((coffee, index) => {
    const coffeeItemDiv = document.createElement('div');
    coffeeItemDiv.className = 'coffee-item';

    // Convert coffee type to a valid image file name
    const coffeeImage = `images/${coffee.type.replace(/\s+/g, '')}.jpeg`;

    coffeeItemDiv.innerHTML = `
      <div class="coffee-details">
        <p><strong>Date:</strong> ${coffee.date}</p>
        <p><strong>Time:</strong> ${coffee.time}</p>
        <p><strong>Location:</strong> ${coffee.location}</p>
        <p><strong>Type:</strong> ${coffee.type}</p>
        <p><strong>Rating:</strong> ${coffee.rating}</p>
      </div>
      <img src="${coffeeImage}" alt="${coffee.type}">
    `;

    coffeeListDiv.appendChild(coffeeItemDiv); //adds the items details to the list
  });

  document.querySelector('.coffee-list-section').style.display = coffeeList.length ? 'block' : 'none';
}

document.addEventListener('DOMContentLoaded', updateCoffeeList);

function scrollToCoffeeList() { //makes the scrolling smooth when pressing the down arrow button
  document.getElementById('coffeeListSection').scrollIntoView({ behavior: 'smooth' });
}

function sortCoffees() { //controls how the coffees are sorted
  const sortOption = document.getElementById('sortOptions').value;
  let coffeeList = JSON.parse(localStorage.getItem('coffees')) || [];

  switch (sortOption) { //uses a switch to offer multiple options for the user to sort the page, 
    case 'ratingHighLow':
      coffeeList.sort((a, b) => b.rating - a.rating);
      break;
    case 'ratingLowHigh':
      coffeeList.sort((a, b) => a.rating - b.rating);
      break;
    case 'newOld':
      coffeeList.sort((a, b) => new Date(b.date) - new Date(a.date));
      break;
    case 'oldNew':
      coffeeList.sort((a, b) => new Date(a.date) - new Date(b.date));
      break;
  }

  localStorage.setItem('coffees', JSON.stringify(coffeeList));
  updateCoffeeList(); // updates the list to display the new changes made through the sorting.
}

document.getElementById('searchBar').addEventListener('input', function() { //this controls the search bar and how it searches the results for matching words / digits.
  const query = this.value.toLowerCase();
  const coffeeItems = document.querySelectorAll('.coffee-item');

  coffeeItems.forEach(item => {
    const text = item.textContent.toLowerCase();
    if (text.includes(query)) {
      item.style.display = '';
    } else {
      item.style.display = 'none';
    }
  });
});

function scrollDown() { //scrolls the window down by the screen height
  window.scrollBy(0, outerHeight);
}

window.onload = updateCoffeeList;