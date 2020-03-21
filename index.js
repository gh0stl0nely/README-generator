//Question to TA 1) Node modules too large, cannot push :) and 2) Should we put it in git ingore or 3) Something else?

// Modules
let inquirer = require("inquirer");
axios = require("axios");
fs = require("fs");
puppeteer = require('puppeteer');
ejs = require('ejs');

// Question to ask the user
const question = [{
        type: "input",
        message: "Please enter Github user name",
        name: "username"
    },

    {
        type: "input",
        message: "Please enter the new repository name",
        name: "repoTitle"
    },
    {
        type: "editor",
        message: "Please write a brief description of your project",
        name: "userDescription"
    },
    {
        type: "editor",
        message: "Please write a brief instruction on how to install the project",
        name: "userInstallation"
    },
    {
        type: "editor",
        message: "Please write about the usage of this project",
        name: "userUsage"
    },
    {
        type: "editor",
        message: "Please provide project's license",
        name: "userLicense"
    },
    {
        type: "editor",
        message: "Please provide name of project's contributors",
        name: "userContributing"
    },

];

// Functions 

const generateREADME = async () => {
    try {
        const userInput = await inquirer.prompt(question); // Type in userName
        const userName = userInput.username;
        const response = await axios.get(
            `https://api.github.com/users/${userName}`
        );
        // console.log(response.data.email)
        const batchURL = await constructBadge();

        const data = processData(userInput, userName, response, batchURL);
        await generatePDF(data, userName)

    } catch (err) {
        throw err;
    }
}

const generatePDF = async (data, userName) => {
    try {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();

        const html = fromTemplateToHTML(data); // This line will get the main content here

        await page.setContent(html);
        await page.emulateMedia('screen'); // Does not try to emulate stylesheet 
        await page.pdf({
            path: './' + userName + '.pdf',
            format: 'A4',
            printBackground: true
        })

        console.log('Your README is ready!');
        await browser.close();
        process.exit();

    } catch (e) {
        console.log(`My error is ${e}`)
    }
}

const constructBadge = async () => {
    const input = await inquirer.prompt([{
        "type": "input",
        "message": "Provide a label for your badge (i.e: Progress)",
        "name" : "label"
    }, {
        "type": "input",
        "message": "Provide a message for your badge Without Special Character(i.e: Completed)",
        "name" : "message"
    },{
        "type": "rawlist",
        "message": "Choose a color for the badge's message",
        "name" : "color",
        "choices": ['brightgreen', 'green', 'yellowgreen' , 'yellow', 'orange', 'red', 'lightgrey', 'blue'],
    }])

   const url = `https://img.shields.io/badge/${input.label}-${input.message}-${input.color}`;
    console.log(url)
   return url;
}

const fromTemplateToHTML = (options) => {
    let template = fs.readFileSync('./template/template.ejs', 'utf8');
    let html = ejs.render(template, options);
    return html;
}

const processData = (userInput, userName, response, batchURL) => {
    const imageURL = response.data.avatar_url;
    const email = !response.data.email ?
        "Not available" :
        response.data.email;
    const repoTitle = userInput.repoTitle;
    const htmlURL = response.data.html_url;

    const tableOfContent = ['Project Description', 'Installation', 'Usage', 'License', 'Contributing']
    const description = userInput.userDescription.split('\n');
    const installation = userInput.userInstallation.split('\n');
    const usage = userInput.userUsage.split('\n');
    const license = userInput.userLicense.split('\n');
    const contributing = userInput.userContributing.split('\n');

    let options = {
        userName,
        email,
        imageURL,
        htmlURL,
        batchURL,
        repoTitle,
        tableOfContent,
        description,
        installation,
        usage,
        license,
        contributing
    }
    return options;
}

/***** This function activates the application  *******/

generateREADME();