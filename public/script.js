function openForm() {
  const width = 400;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popup = window.open('', 'CoffeeCounterPopUp', features);

  popup.document.write(`
      <!DOCTYPE html>
      <html>
      <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width">
          <title>Add Coffee Count</title>
      </head>
      <body>
          <form id="coffeeForm">
              <label for="date">Date:</label>
              <input type="date" id="date" required><br>
              <label for="time">Time:</label>
              <input type="time" id="time" required><br>
              <label for="location">Location:</label>
              <input type="text" id="location" required><br>
              <label for="type">Coffee Type:</label>
              <input type="text" id="type" required><br>
              <label for="rating">Rating (1-5):</label>
              <input type="number" id="rating" min="1" max="5" required><br>
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
      coffeeItem.innerHTML = `
          <p>Date: ${coffee.date}</p>
          <p>Time: ${coffee.time}</p>
          <p>Location: ${coffee.location}</p>
          <p>Type: ${coffee.type}</p>
          <p>Rating: ${coffee.rating}</p>
      `;
      coffeeListDiv.appendChild(coffeeItem);
  });

  // Show the coffee list section
  document.getElementById('coffeeListSection').style.display = 'block';
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

function scrollToCoffeeList() {
  const coffeeListSection = document.getElementById('coffeeListSection');
  coffeeListSection.style.display = 'block';
  coffeeListSection.scrollIntoView({ behavior: 'smooth' });
}

window.onload = updateCoffeeList;