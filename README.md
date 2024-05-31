# Node Server
Development Checklist:

## Overview:
Coffee Counter is a simple, single page application thats main purpose is to track a users coffee intake and experience. It follows the user input based on Date, Time, Location, Coffee Type and overall Rating to create a user experience list allowing the user to better understand their own personal coffee experience. HTML, CSS and Javascript alongside a local storage were implemented in order for this SPA to work effectively.

## Planning:
* = tbd
- create a single page
    - contains a large bolded text stating the name of the site (CoffeeCounter) in the center of the screen with the add a new tracker button underneath it in small italics font allowing the user to open the pop-up input menu which lets them input data.
        - the pop-up window of the add a new coffee button should contain the following: Date, Time, Location, Coffee Type, Rating (1-5).
    - have a button (a large downwards facing arrow) which scrolls the page down to see the different coffees which have previously been tracked.
        - *The scroll function should move the whole screen a full page down, showing the results of previous inputs and offer the user the search and sort functions* 
        - within this part of the page which has previously added coffees, add a sort function which lets you change the order of coffees based on specific criteria (Rating High - Low, Rating Low - High, New - Old, Old - New)
        - also add a search bar near the top of the screen which lets the user search for specific keywords to find the specific coffee they are looking for.
    - Add a coffee logo to the screen
    - add javascript elements which make the screen more interactive, e.g. a hover which makes the text move a bit (search the internet for inspiration)
    - make all of the transitions and smooth and nice to look at
    - change the pop-up window to match the text and style of the page
    - make the pop-up window have mandatory inputs (if possible)

## Features:
- Pop-up window: used to take in the user inputs through a form style submission
- Clear all button: used to clear the previously saved data
- Scroll Button: button which scrolls the screen down fully for the user
- Sort and Search functions: both functions offer the user an easy way to find and sort their coffee by different metrics.
- Result Display: shows the results of the users input in a simple form with an image representing their chosen coffee alongside the details of the coffee experience.

## Setup:
No setup is required.

## Usage:
For easy usage, it is recommeneded for the user to right-click on the index.html file and open the project with Live Server (in VS Code).

## Version Control:
This project uses git and github to track the changes made to the development of the project. Please visit the github repository here:https://github.com/iceagefromsid/mpar8377-tracker1.git




## References:
- https://fonts.google.com/selection/embed 
- https://www.w3schools.com/ 
- https://www.thirdwavecoffeeroasters.com

## AI Acknowledgements:
- Pop-Up Window: chatgpt got was used alongside WS3 Schools to build the pop-up window. The prompt given was as follows "please build a pop-up window which will house the following functions:" (with the functions currently within the window.).
- Storing of Data: Generative AI was used alongside personal research to implement the storing of data and the following usage of said data. prompt = "please show me a way to store user input data and then to use it."
- Shake for images: generative AI was used to add a shaking animation over the images when the user hovers over them. the prompt given was along the lines of " How would i go about making an image shake in javascript css."
- The data storage and facilitating: The data storage was built alongside w3s schools and generative AI in order to create a fully usable system. the prompt which was imputted into generative ai was " how would I store data from a user input field and then output it". I also used w3s schools to gain more background knowledge about the actual storage of it.


