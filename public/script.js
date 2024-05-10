function openForm() {
  // Open a new pop-up window centered on the screen
  const width = 400;
  const height = 400;
  const left = (window.innerWidth - width) / 2;
  const top = (window.innerHeight - height) / 2;
  const features = `width=${width},height=${height},left=${left},top=${top}`;
  const popup = window.open('', 'CoffeeCounterPopUp', features);

  // Write the HTML content for the pop-up window
  popup.document.write(`
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width">
        <title>Add Coffee Count</title>
      </head>
      <body>
        <form id="taskform">
          <label for="task">Task:</label>
          <input type="text" name="task" id="taskInput">
          <br>
          <!-- Date input -->
          <label for="dueDate">Due Date: </label>
          <input type="date" name="dueDate" id="dueDateInput">
          <br>
          <!-- Time input -->
          <label for="completionTime">Completion Time: </label>
          <input type="time" name="completionTime" id="completionTimeInput">
          <br>
          <label for="estimatedTime">Estimated completion time (in mins):</label>
          <input type="number" name="estimatedTime" id="estimatedTimeInput">
          <!-- Priority -->
          <br>
          <label for="priority">Task Priority:</label>
          <select name="prority" id="priorityInput">
            <option value="">Select one</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>
          <br>
          <button type="button" onclick="submitForm()">Submit</button>
        </form>
      </body>
    </html>
  `);
}

function submitForm() {
  // Get the form elements from the pop-up window
  const taskInput = window.opener.document.getElementById("taskInput").value;
  const dueDateInput = window.opener.document.getElementById("dueDateInput").value;
  const completionTimeInput = window.opener.document.getElementById("completionTimeInput").value;
  const estimatedTimeInput = window.opener.document.getElementById("estimatedTimeInput").value;
  const priorityInput = window.opener.document.getElementById("priorityInput").value;

  // Close the pop-up window
  window.close();

  // You can now use the form data as needed, such as sending it to a server or storing it locally.
  // Example:
  console.log("Task:", taskInput);
  console.log("Due Date:", dueDateInput);
  console.log("Completion Time:", completionTimeInput);
  console.log("Estimated Completion Time:", estimatedTimeInput);
  console.log("Priority:", priorityInput);
}
