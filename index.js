const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts.js");
const { Command } = require("commander");
const program = new Command();
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
      const contacts = await listContacts();
      break;

    case "get":
      const contact = await getContactById(id);
      if (!contact) {
        throw new Error("Contact does not exist");
      }
      break;

    case "add":
      const newContact = await addContact({ name, email, phone });
      console.log("newContact", newContact);
      break;

    case "remove":
      const removeContactById = await removeContact(id);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
};
// let name= 'nknl';
// let email = 'dfkjd@tr.eu';
// let phone = '86586059';
// invokeAction({action: "list"});
// invokeAction({action: "get", id});
// invokeAction({action: "remove", id});
invokeAction({ action: "add", name, email, phone });
