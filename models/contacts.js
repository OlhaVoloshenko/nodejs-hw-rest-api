const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactsPath = path.join(__dirname, "contacts.json");

const updateContacts = async (contacts) =>
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));

const getAll = async () => {
  const data = await fs.readFile(contactsPath);
  return JSON.parse(data);
};

const getById = async (contactId) => {
  const contacts = await getAll();
  const result = contacts.find((item) => item.id === contactId);
  return result || null;
};
const add = async ({ name, email, phone }) => {
  const contacts = await getAll();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  contacts.push(newContact);
  await updateContacts(contacts);
  return newContact;
};
const removeContact = async (contactId) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  const [result] = contacts.splice(index, 1);
  await updateContacts(contacts);
  return result;
};

const updateById = async (contactId, { name, email, phone }) => {
  const contacts = await getAll();
  const index = contacts.findIndex((item) => item.id === contactId);
  if (index === -1) {
    return null;
  }
  contacts[index] = { contactId, name, email, phone };
  await updateContacts(contacts);
  return contacts[index];
};

module.exports = {
  getAll,
  getById,
  updateById,
  removeContact,
  add,
  updateContacts,
};
