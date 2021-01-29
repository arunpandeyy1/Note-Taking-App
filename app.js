const notes = require('./notes.js')
const color = require('chalk')
const yargs = require('yargs')
yargs.command({
    command: 'add',
    describe: 'Add a new note!',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type:'String'
        },
        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'String'
        }
    },
    handler: (argv) => notes.addNotes(argv.title, argv.body)  
})
yargs.command({
    command: 'remove',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'String'
        }
    },
    describe: 'Remove a new note!',
    handler: (argv) => notes.removeNote(argv.title)
})
yargs.command({
    command: 'list',
    describe: 'List a new note!',
    handler() {
        notes.listNotes()
    }
})
yargs.command({
    command: 'read',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'String'
        }
    },
    describe: 'Read a new note!',
    handler(argv) {
        notes.readNote(argv.title)
    }
})
yargs.parse()