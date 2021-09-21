const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require("nanoid");

const contactPath = path.resolve("./db/contacts.json");

const listContacts = async () => {
  const data = await fs.readFile(contactPath, "utf-8");
  return JSON.parse(data);
};

const getContactById = async (contactId) => {
  const contactsList = await listContacts();
  const contact = contactsList.find(
    (contact) => contact.id.toString() === contactId
  );
  if (!contact) return null;

  return contact;
};

const addContact = async (name, email, phone) => {
  const contactsList = await listContacts();
  const newContact = { name, email, phone, id: nanoid() };
  contactsList.push(newContact);
  await fs.writeFile(contactPath, JSON.stringify(contactsList));

  return newContact;
};

const removeContact = async (contactId) => {
  const contactsList = await listContacts();
  const idx = contactsList.findIndex(
    (contact) => contact.id.toString() === contactId
  );
  if (idx === -1) return null;

  contactsList.splice(idx, 1);
  await updateContacts(contactsList);

  return "Success remove";
};

async function updateContacts(newContacts) {
  await fs.writeFile(contactPath, JSON.stringify(newContacts));
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
