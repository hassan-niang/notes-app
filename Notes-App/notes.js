const { default: chalk } = require('chalk')
const fs = require('fs')

// const getNotes = () => { 
//     return "Your notes..."
// } 

const addNote = (title,body) => {
    const notes = loadNotes()
    //this will load anything from the JSON if anything is there   
    const dupNote = notes.find((note)=> note.title === title)
if (!dupNote){
    notes.push(
        {title: title,
        body: body
        }
    ) 
    // this pushes this object to the load f(x) and allows for you to creat the JSON or add too it.
    savedNotes(notes)
    // once note is added this allows for you to store the data to note.JSON
    console.log(chalk.green.bold("'"+ title + "' has been added!"));
}else{
    console.log(chalk.red.bold("'"+ title + "' title has already been taken!"));
}

} 
const removeNote = (title)=>{
    const notes = loadNotes() // this loads in anythin gin teh JSON currently. 
    const notesToKeep = notes.filter((note)=> note.title) !== title // will keep everything thats not that title we are removing. 
     

    if (notes.length > notesToKeep.length){
        console.log(chalk.green.bold(title + " is now removed!"));
        savedNotes(notesToKeep)
    }else{
        console.log(chalk.red.bold("'"+title+"' has already been removed!"));
    }
}
const listNotes = (title) =>{
   console.log(chalk.inverse.orange);
    const notes = loadNotes()
    notes.forEach((note)=>{
        console.log(note.title);
    })
} 
const readNotes = (title) => {
    const notes = loadNotes()
    const note = notes.find((note)=> note.title === title)
    if (note){
        console.log(chalk.inverse(note.title)); 
        console.log(note.body);
    }else{
        console.log(chalk.red.inverse ("Note not found!"));
    }
}
const savedNotes = (notes)=>{
    const dataJSON = JSON.stringify(notes) // takes data that you either add or remove and chg to a str
    fs.writeFileSync('notes.json', dataJSON) // take str and added it to JSON 
}

const loadNotes = ()=>{
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
        // when we run this function if a file is not already created it will run it adding to the existing JSON 
        // if not then it looks at the begins to add it to the array and then thr next note will be added to notes JSON

    }catch (e){
        return []
    }
}   
module.exports = {
    // getNotes: getNotes, // b/c we have manything that need to be sent to main.js this allows for evrything to be able to get functions and vars from this file 
    addNote: addNote, 
    removeNote: removeNote, 
    listNotes: listNotes,
    readNotes: readNotes
}

//Outside Notes 
    // () => are not suited for objs if ref something in the obj. It doesnt allow for binding by using the "this." keyword. if we are using a keyvalue pair for the f(x)
        // you can use an ()=> just call it without using the ":" in the this keyword. 
