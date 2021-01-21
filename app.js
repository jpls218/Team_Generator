const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
let team = [];
function appMenu(){
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type:"input",
                name:"managerName",
                message:"What is your manager’s name?"
                //Validate user input
            },
            {
                type:"input",
                name:"managerId",
                message:"What is your manager’s id?"
                //Validate user input
            },
            {
                type:"input",
                name:"managerEmail",
                message: "What is your manager’s email address?"
                //Validate user input
            },
            {
                type:"input",
                name:"managerOfficeNumber",
                message: "What is your manager’s office number?"
                //Validate user input
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Would you like to add more employees?",
                choices: ["Yes", "No"],
                //Validate user input
            },
        ]).then(answers => {
            const manager = new Manager(answers.managerName, answers.managerId, answers.managerEmail, answers.managerOfficeNumber);
            console.log(manager);
            team.push(manager);
            if (answers.moreEmployees == "Yes") {
                createTeam();
            } else {
                console.log("Thank you!");
            }
        });
    }
    createManager();
    function createTeam() {
        
        inquirer.prompt([
            {
                type:"list",
                name:"employeeRole",
                message:"What is your employee's role?",
                choices: ["Engineer", "Intern"]
                
                //Validate user input
            },
            {
                type:"input",
                name:"employeeName",
                message:"What is your employee's name?"
                
                //Validate user input
            },
            {
                type:"input",
                name:"employeeId",
                message:"What is your employee’s id?"
                //Validate user input
            },
            {
                type:"input",
                name:"employeeEmail",
                message:"What is your employee’s email address?"
                //Validate user input
            },
            {
                type:"input",
                name:"engineerGithub",
                message:"What is your engineer’s github account?",
                when: (answer) => {
                    return answer.employeeRole == "Engineer";
                }
                //Validate user input
            },
            {
                type:"input",
                name:"internSchool",
                message:"What is your intern's school?",
                when: (answer) => {
                    return answer.employeeRole == "Intern";
                }
                //Validate user input
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Would you like to add more employees?",
                choices: ["Yes", "No"],
                //Validate user input
            },
        ]).then(answers => {
            const engineer = new Engineer(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.engineerGithub);
            const intern = new Intern(answers.employeeName, answers.employeeId, answers.employeeEmail, answers.internSchool);
            if (answers.employeeRole == "Engineer") {
                console.log(engineer);
                team.push(engineer);
            } else if (answers.employeeRole == "Intern") {
                console.log(intern);
                team.push(intern);
            }
            
            if (answers.moreEmployees == "Yes") {
                createTeam();
            } else {
                buildHTML();
            }
        });
    }
    function buildHTML() {
        var html = render(team);
        fs.writeFile("./team.html", html, function (err) {
            if (err) throw err;
        });
    }
}
appMenu();

// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```
