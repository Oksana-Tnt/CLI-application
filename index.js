const contact = require("./contacts");

const { Command } = require('commander');
const program = new Command();
program
  .option('-a, --action <type>', 'choose action')
  .option('-i, --id <type>', 'user id')
  .option('-n, --name <type>', 'user name')
  .option('-e, --email <type>', 'user email')
  .option('-p, --phone <type>', 'user phone');

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({action ,id, name, email, phone})=>{
    switch (action){
        case "list":
            const allContacts = await contact.listContacts();
            return console.table(allContacts);

        case "get":
            const contactbyId = await contact.getContactById(id);
            return console.log(contactbyId);

        case "add":
            const newContact = await contact.addContact({name, email, phone});
            return console.log(newContact);

        case "remove":
            const removeContact = await contact.removeContact(id);
            return console.log(removeContact);

        default : 
        console.warn('\x1B[31m Unknown action type!');
    }

}

invokeAction(argv);

