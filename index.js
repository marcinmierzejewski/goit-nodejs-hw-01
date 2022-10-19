const contacts = require("./contacts");
const { Command } = require("commander");
const program = new Command();
require("colors");
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

const invokeAction = async ({ action, id, name, email, phone }) => {
  switch (action) {
    case "list":
      console.log("View contacts list successful".blue);
      const contactsList = await contacts.listContacts();
      console.table(contactsList);
      break;

    case "get":
      console.log(`Get contacts with id ${id} successful`.yellow);
      const getContact = await contacts.getContactById(id);
      console.table(getContact);
      break;

    case "add":
      console.log("New contact has been written".green);
      const addNewContact = await contacts.addContact(name, email, phone);
      console.table(addNewContact);
      break;

    case "remove":
      console.log(`Remove contact with id ${id} successful`.red);
      const removeContact = await contacts.removeContact(id);
      console.table(removeContact);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};

invokeAction(argv);
