# Command-line README generator

This is a simple command line application for user to quickly create a README in PDF format for their new project

### Prerequisites

Working internet is needed for communicating with Github API

## Testing the application
This application assumes the user is familiar with typing and exiting VIM

* Clone the application from Github
* Open the application with text editor of choice (Mine is VSCode)
* Navigate to the cloned folder
* Open up terminal, type the following line and press Enter and wait for installation
    > npm install
* Once installation is done, type the following line and press Enter to start the application
    > node index.js
* The terminal will prompt you for an ** Existing GitHub User Name ** and a variety of questions
* Answer prompts asked by the terminal
  * Some questions will require access to VIM editor (Linux + Mac) or Notepad (Microsoft)
  * You will see the prompt for those question to press Enter prior to typing your answer
  * Once finished typing your answer for these questions, Press ESC -> Type :wq -> Press Enter
  > ESC + :wq + Enter
* Once the terminal display "Your README is ready!", this signifies generation of the README file is finished
* Lastly, type "open {github username first entered}.pdf" to view the generated README in PDF format. 
  * For instance
  > open gh0stl0nely.pdf

For visual understanding, refer to Video Demonstration below

## Video Demonstration
![Activating The App](gifs/activateApp.gif)

![Opening README file](gifs/openPDF.gif)

## Built With

* [HTML](https://developer.mozilla.org/en-US/docs/Web/HTML) - Used for template layout
* [CSS](https://www.w3.org/Style/CSS/Overview.en.html) - Used for template styling
* [NodeJS](https://nodejs.org/en/) - Javascript runtime environment for this CLI application
* [Puppeteer](https://pptr.dev/) - Used to generate PDF file from HTML file
* [EJS](https://ejs.co/) - Templating engine used for rendering dynamic user inputs
* [Inquirer](https://www.npmjs.com/package/inquirer) - Nodejs library for collecting user input
* [Axios](https://github.com/axios/axios) - Nodejs module for sending API request to Github API
* [NPM](https://www.npmjs.com/) - A tool for dependency management 
* [Shield.io](https://shields.io/) - A tool for generating README batch

## Author

* [Khoi Nguyen](https://github.com/gh0stl0nely)
