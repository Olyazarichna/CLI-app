const fs = require("fs/promises");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
uuidv4();

const contactsPath = path.join(__dirname, "db/contacts.json");
const updateContacts = async (contacts) => await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const contactList = JSON.parse(contacts);
    return contactList;
  } catch (e) {
    console.log("error", e.message);
    return e;
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await listContacts();
    const result = contacts.find((contact) => contactId === contact.id);
    if (!result) {
      return null;
    }
    return result;
  } catch (e) {
    console.log("error", e.message);
    return e;
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await listContacts();
    const index = contacts.findIndex((contact) => contactId === contact.id);
    if (index === -1) {
      return null;
    };
    const [result] = contacts.splice(index, 1);

await updateContacts(contacts);

    return result;
  } catch (e) {
    console.log("error", e.message);
    return e;
  }
};

const addContact = async ( name, email, phone ) => {
  try {
    const contacts = await listContacts();
    const newContact = {
      id: uuidv4(),
      name,
      email,
      phone,
    };

    
    contacts.push(newContact);
    await updateContacts(contacts);
    return newContact;
  } catch (e) {
    console.log("error", e.message);
    return e;
  }
};

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
