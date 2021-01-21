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
//Runs the application
function appMenu(){
    //Asks user for manager information
    function createManager() {
        console.log("Please build your team");
        inquirer.prompt([
            {
                type:"input",
                name:"managerName",
                message:"What is your manager’s name?"
            },
            {
                type:"input",
                name:"managerId",
                message:"What is your manager’s id?"
            },
            {
                type:"input",
                name:"managerEmail",
                message: "What is your manager’s email address?"
            },
            {
                type:"input",
                name:"managerOfficeNumber",
                message: "What is your manager’s office number?"
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Would you like to add more employees?",
                choices: ["Yes", "No"],                
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

    //Asks user for New Employee Information
    function createTeam() {
        
        inquirer.prompt([
            {
                type:"list",
                name:"employeeRole",
                message:"What is your employee's role?",
                choices: ["Engineer", "Intern"]
            },
            {
                type:"input",
                name:"employeeName",
                message:"What is your employee's name?"
            },
            {
                type:"input",
                name:"employeeId",
                message:"What is your employee’s id?"
            },
            {
                type:"input",
                name:"employeeEmail",
                message:"What is your employee’s email address?"
            },
            {
                type:"input",
                name:"engineerGithub",
                message:"What is your engineer’s github account?",
                when: (answer) => {
                    return answer.employeeRole == "Engineer";
                }
            },
            {
                type:"input",
                name:"internSchool",
                message:"What is your intern's school?",
                when: (answer) => {
                    return answer.employeeRole == "Intern";
                }
            },
            {
                type:"list",
                name:"moreEmployees",
                message: "Would you like to add more employees?",
                choices: ["Yes", "No"],
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


