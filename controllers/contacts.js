const { Contact } = require("../models/contact");
const { HttpError, ctrlWrapper } = require("../helpers");

const getAll = async (req, res) => {
  const allContacts = await Contact.find({}, "-createdAt -updatedAt");
  res.json(allContacts);
};

const getById = async (req, res) => {
  const { id } = req.params;

  // один из рабочих вариантов поиска по id
  // const contact = await Contact.findOne({ _id: id });

  const contact = await Contact.findById(id);
  if (!contact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(contact);
};

const add = async (req, res) => {
  const newContact = await Contact.create(req.body);
  res.status(201).json(newContact);
};

const updateById = async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(updateContact);
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const deleteContact = await Contact.findByIdAndRemove(id);
  if (!deleteContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json({ message: "Contact deleted" });
};

const updateFavorite = async (req, res) => {
  const { id } = req.params;
  const updateContact = await Contact.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updateContact) {
    throw HttpError(404, "Contact not found");
  }
  res.json(updateContact);
};

module.exports = {
  getAll: ctrlWrapper(getAll),
  getById: ctrlWrapper(getById),
  add: ctrlWrapper(add),
  updateById: ctrlWrapper(updateById),
  deleteById: ctrlWrapper(deleteById),
  updateFavorite: ctrlWrapper(updateFavorite),
};
