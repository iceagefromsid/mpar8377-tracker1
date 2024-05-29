function openForm() {
  const width = window.innerWidth / 2;
  const height = window.innerHeight / 2;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popup = window.open('', 'CoffeeCounterPopUp', features);

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
          text-align: center;
          margin: 0;
          padding: 20px;
        }
        form {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        label {
          font-size: 16px;
          margin: 10px 0 5px;
        }
        input, select {
          padding: 5px;
          margin-bottom: 10px;
          width: 80%;
        }
        button {
          padding: 10px 20px;
          border: none;
          background-color: #4CAF50;
          color: white;
          cursor: pointer;
          border-radius: 5px;
          font-size: 16px;
          margin-top: 10px;
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

function updateCoffeeList() {
  const coffeeList = JSON.parse(localStorage.getItem('coffees')) || [];
  const coffeeListDiv = document.getElementById('coffeeList');
  coffeeListDiv.innerHTML = '';

  coffeeList.forEach(coffee => {
    const coffeeItem = document.createElement('div');
    coffeeItem.classList.add('coffee-item');
    const coffeeImage = `images/${coffee.type.replace(/\s+/g, '')}.jpeg`;
    coffeeItem.innerHTML = `
      <img src="${coffeeImage}" alt="${coffee.type}" style="width:100px;height:100px;">
      <p>Date: ${coffee.date}</p>
      <p>Time: ${coffee.time}</p>
      <p>Location: ${coffee.location}</p>
      <p>Type: ${coffee.type}</p>
      <p>Rating: ${coffee.rating}</p>
    `;
    coffeeListDiv.appendChild(coffeeItem);
  });

  // Show the coffee list section
  document.getElementById('coffeeListSection').style.display =  'block';
}

function scrollToCoffeeList() {
  document.getElementById('coffeeListSection').scrollIntoView({ behavior: 'smooth' });
}

function sortCoffees() {
  const sortOption = document.getElementById('sortOptions').value;
  let coffeeList = JSON.parse(localStorage.getItem('coffees')) || [];

  switch (sortOption) {
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
  updateCoffeeList();
}

document.getElementById('searchBar').addEventListener('input', function() {
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

function scrollDown() {
  window.scrollBy(0, outerHeight);
}

window.onload = updateCoffeeList;