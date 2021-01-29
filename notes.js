const chalk = require('chalk')
const fs = require('fs')
const addNotes = (title, body) => {
    const notes = loadNotes()
    const duplicateNotes = notes.find((note) => note.title === title)
    if(!duplicateNotes){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.bgGreen('New Note Added'))
    }
    else{
        console.log(chalk.bgRed('Note title taken!'))
    }
}
const saveNotes = (notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}
const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}
const removeNote = (title) => {
    const notes = loadNotes()
    const notesToKeep = notes.filter((notes) => title!==notes.title)
    if(notes.length > notesToKeep.length){
        saveNotes(notesToKeep)
        console.log(chalk.bgGreen('Note removed!'))
    }
    else{
        console.log(chalk.bgRed('No note found!'))
    }
}
const listNotes = () => {
    console.log(chalk.blue('Your Notes...'))
    const notes = loadNotes()
    notes.forEach(note => {
        console.log(note.title)
    });
}
const readNote = (title) => {
    const notes = loadNotes()
    const noteTobeRead = notes.find((note) => note.title === title)
    if(noteTobeRead){
        console.log(chalk.blue(noteTobeRead.title))
        console.log(noteTobeRead.body)
    }else{
        console.log(chalk.red('Unable to find note!'))
    }
    
}
module.exports = {
    addNotes : addNotes,
    removeNote : removeNote,
    listNotes : listNotes,
    readNote : readNote
}