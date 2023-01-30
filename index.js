const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

function generateSSM() {
  return inquirer.prompt({
    name: 'name',
    message: 'Please enter SSM\'s name.',
    // validate: (num) => {
    //   return num > 1 ? true : 'You must enter a number greater than one.';
    // }
  }).then(data => {
    team.push({
      type: 'manager',
      data: data
    });
  });
}

function addStudent() {
  return inquirer.prompt({
    name: 'name',
    message: 'Please enter the student\'s name.'
  }).then(data => {
    team.push({
      type: 'student',
      data: new Student('UK10', '02/24/2023', data.name, ['task one'])
    });
  });
}

function showMainMenu() {
  return inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Please choose an option.',
    choices: [
      {
        name: 'Add a student',
        value: 'student'
      },
      {
        name: 'Exit the Course Manager',
        value: 'exit'
      }
    ]
  }).then(choice => {
    if (choice.option === 'student') {
      return addStudent()
        .then(showMainMenu);
    }

    console.log('Thanks for using our app!');
    console.log(team);
    process.exit();
  })
}

function init() {
  console.log('--- Welcome to the Employee Manager App ---');

  generateSSM()
    .then(showMainMenu);
}

init();
