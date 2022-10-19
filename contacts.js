const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const jsonContacts = JSON.parse(contacts);
    console.table(jsonContacts);
    return jsonContacts;
  } catch (error) {
    console.error("Load error", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const jsonContacts = JSON.parse(contacts);
    const contact = jsonContacts.filter((cont) => cont.id === contactId);
    console.log(contact);
    return contact;
  } catch (error) {
    console.error("Get contact error", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const jsonContacts = await JSON.parse(contacts);
    const removedContact = await jsonContacts.filter((cont) => cont.id !== contactId);
    const newContacts = await fs.writeFile(contactsPath, JSON.stringify(removedContact));
  } catch (error) {
    console.error("Remove contact error", error.message);
  }
};

const addContact = async(name, email, phone) => {
  try {
    const contacts = await fs.readFile(contactsPath);
    const jsonContacts = await JSON.parse(contacts);
    const addNewContact = {
      id: nanoid(),
      name,
      email,
      phone
    }
    const newContacts = [...jsonContacts, addNewContact];
    const updateContacts = await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    console.log(updateContacts)
  } catch (error) {
    console.error("Add contact error", error.message);
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
