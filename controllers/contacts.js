const contacts = require("../models/contacts");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await contacts.listContacts();
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const contact = await contacts.getContactById(id);

  if (!contact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(contact);
};

const add = async (req, res) => {
  const newContact = await contacts.addContact(req.body);
  res.status(201).json(newContact);
};

const updareById = async (req, res) => {
  const { id } = req.params;
  const updateContact = await contacts.updateContact(id, req.body);
  if (!updateContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(updateContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await contacts.removeContact(id);
  if (!deleteContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted" });
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updareById: ctrlWrapper(updareById),
  deleteById: ctrlWrapper(deleteById),
};
