const fs = require("fs").promises;
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.resolve("./db/contacts.json");
console.log(contactsPath);

const listContacts = async () => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const jsonContacts = JSON.parse(readContacts);
    return jsonContacts;
  } catch (error) {
    console.error("Load error", error.message);
  }
};

const getContactById = async (contactId) => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const jsonContacts = await JSON.parse(readContacts);
    const contact = jsonContacts.filter((cont) => cont.id === contactId);
    return contact;
  } catch (error) {
    console.error("Get contact error", error.message);
  }
};

const removeContact = async (contactId) => {
  try {
    const readContacts = await fs.readFile(contactsPath);    
    const jsonContacts = await JSON.parse(readContacts);
    const contact = jsonContacts.filter((cont) => cont.id === contactId);
    const removedContact = await jsonContacts.filter((cont) => cont.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(removedContact));
    return contact;
  } catch (error) {
    console.error("Remove contact error", error.message);
  }
};

const addContact = async(name, email, phone) => {
  try {
    const readContacts = await fs.readFile(contactsPath);
    const jsonContacts = await JSON.parse(readContacts);
    const addNewContact = {
      id: nanoid(),
      name,
      email,
      phone
    }
    const newContacts = [...jsonContacts, addNewContact];
    await fs.writeFile(contactsPath, JSON.stringify(newContacts));
    return addNewContact;
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
