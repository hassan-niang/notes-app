// intializing this var lets you access the module that you need. Must be linked with the "require" keyword.
// const fs = require('fs')
// this is the 
//fs.writeFileSync('notes.txt', 'My name is Hassan.')
// fs.appendFileSync('notes.txt', ' I live in Charlotte, NC.')

const notes = require('./notes'); 

// in order to load in a npm package you must run npm init to make sure you are loadiong in the package.json 
// loading in the validator NPM package // Must run through command lines with version that you want and adds that to your package.json 
// dont edit any added json
// this is storing all of the content that the package has 
// treat this like an object then call things after based off of documentation
const validator = require('validator')


// Challenge Append a message to notes.txt

// 1. Use fs.appendFileSync to append to the file 
// 2. Run the script 
// 3. Check your work by opening the file and viewing the appended text

// const add = require('./notes')
// instead of letting everything live in your main file have seperate one that stores all extra infromation and link it to the current sheet with the "require" keyword. 
// "./notes" will excute first then whatever is in main becasue it JS is chronological
// const sum = add(4, -2)
// console.log(sum);

//challenge2: Define and use a function in a new file 

// 1. create a new file called notes.js
// 2. create getNotes function that returns "Your note ..."
// 3. export getNotes function 
// 4. from main.js load in and call the function prointing message to console.

// const msg = getNotes()

// console.log(msg); 

//call simliar to calling methods based off of docs 
// console.log(validator.isEmail('gmail.com')); 

// when cloning a repo from github and the node-mod folder is not there just use node init and it will pull it up based off whats in the package.JSON 

const chalk = require('chalk')
// Challenge -- using the Chalk libray in project 

//1. intstall chalk 
// 2. load in chalk 
// 3. use it to print 'success' to conosle in green
//  console.log(chalk.red.bold('Error'));
// 4. test 

// bonus read docs and make bold and inverse. 

// Nodemon allows for you to run node without having to type node everytime. so if you make a change you can see it immediatly. 
// also installed globaly so it doesnt add to the package.JSON 
// run cmd line nodemon main.js 
// to exit nodemon use ctrl + c 

// Using cmd line to make things happen dynamically
// console.log(process.argv[2]);
// retruns all cmd line passed as an array to help you see whats happening
// [
    //     '/usr/local/bin/node',
                 //  location of node.js executable on machine
    //     '/Users/hassanniang/Desktop/Code Demos (JS Practice)/Node.Udemy/main.js',
                // location of files within computer for node.js to run 
     //     'Hassan'
                 // what i tagged along to add a new path 
    //   ] 
    
    // const command = process.argv[2] 
    
    // if (command === 'add'){
    //     console.log('Adding note!');
    // }else if (command === 'remove'){
    //     console.log('Removing note!');
    // }
const yargs = require('yargs') 
    // Yargs allows you to parse strings from the terminal 
    //when passesd it'll parse anything based off the index and any strings passed as all within an object.
    // customizing Yargs  
    yargs.version('1.1.0')
    
    
    //create add command 
    
    yargs.command({
        command: 'add',
        //what the cmd name is
        describe: 'Add a new note',
        // purpose of cmd (not required)
        builder:{
            title: {
                describe: 'Note title',
                demandOption: true,
                type: "string"
            },
            body: { 
                describe: 'Enter text body', 
                demandOption: true,
                type: "string"
            } 

        }, 
        // allows for you to pass other things based off the. 
        //these things are not req but is add-ons that can be had
        // auto sets to a boolean must be set to what value i want
        handler(argv) {
           notes.addNote(argv.title,argv.body) // handler will look back into notes.js and passes the content to a fucntion on notes.js
        } 
        //passing teh argv as a parameter to be able to access title to see and all data passed through cmd line 
    })

    yargs.command({
        command: 'remove',
        describe: 'Removing a note', 
        builder: {
            title: {
                demandOption: true,
                type: "string"
            }
        },
        handler(argv) {
            notes.removeNote(argv.title)
        }
    }) 
    //Challange make a list and read command 
    yargs.command({
        command: 'list',
        describe: 'Listing notes',
        handler() {
            notes.listNotes()
        }
    }) 

    yargs.command({
        command: 'read',
        describe: 'Reading notes', 
        builder: {
            title: {
                demandOption: true,
                type: "string"
            }
        },
        handler(argv) {
            notes.readNotes(argv.title)
        }
    }) 

    // add, remove, read, list 
    //what is passed in cmd line
        //node main.js add --title="This is my title" 
    // returned 
        //{ _: [ 'add' ], title: 'This is my title', '$0': 'main.js' } 
            // _ = key-value pair || [ 'add' ] == name of action im passing || title: 'This is my title' == b/c the == was befor the quots it allows for this to set the string to whatver came before. 
yargs.parse()
// must be at the end of my yargs.command to know what is parsing or else it wont make sense. 
      
