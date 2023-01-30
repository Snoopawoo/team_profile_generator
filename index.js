//const Manager = require("./lib/Manager");
//const Engineer = require("./lib/Engineer");
//const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./src/page-template.js");


// TODO: Write Code to gather information about the development team members, and render the HTML file.

const team = [];

function generateManager() {
  return inquirer.prompt({
    name: 'name',
    message: 'Please enter Manager name:',
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

function addEngineer() {
  return inquirer.prompt({
    name: 'name',
    message: 'Please enter the Engineer\'s name.'
  }).then(//data => 
    {
    // team.push({
    //   type: 'engineer',
    //   data: new Employee('engineer')
    // });
    showMenu
  });
}

function addIntern() {
  return inquirer.prompt({
    name: 'name',
    message: 'Please enter the Intern\'s name.'
  }).then(//data => 
    {
    // team.push({
    //   type: 'intern',
    //   data: new Employee('engineer')
    // });
    showMenu
  });
}

function showMenu() {
  return inquirer.prompt({
    type: 'list',
    name: 'option',
    message: 'Please choose an option.',
    choices: [
      {
        name: 'Add an Engineer',
        value: 'engineer'
      },
      {
        name: 'Add an Intern',
        value: 'intern'
      },
      {
        name: 'Finish building the team',
        value: 'fin'
      }
    ]
  }).then(choice => {
    if (choice.option === 'engineer') {
      return addEngineer()
        .then(showMenu);
      }
     else if (choice.option === 'intern') {
      return addIntern()
        .then(showMenu)
     }
    process.exit();
  })
}

function init() {
  console.log('____Employee managment app____');

  generateManager()
    .then(showMenu);
}

init();
