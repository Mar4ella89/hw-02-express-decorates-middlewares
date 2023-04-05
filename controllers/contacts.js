const Joi = require("joi");

const contacts = require("../models/contacts");
const { HttpError } = require("../helpers");

const addSchema = Joi.object({
  name: Joi.string().min(3).max(30).required().messages({
    "any.required": `"name" is required`,
    "string.empty": `"name" cannot be empty`,
    "string.base": `"name" must be string`,
  }),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
    })
    .required()
    .messages({
      "any.required": `"email" is required`,
      "string.empty": `"email" cannot be empty`,
    }),
  phone: Joi.number().integer().required().messages({
    "any.required": `"phone" is required`,
    "string.empty": `"phone" cannot be empty`,
  }),
});

const getAll = async (req, res, next) => {
  try {
    const allContacts = await contacts.listContacts();
    res.json(allContacts);
  } catch (error) {
    next(error);
  }
};

const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const contact = await contacts.getContactById(id);

    if (!contact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(contact);
  } catch (error) {
    next(error);
  }
};

const add = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, error);
    }
    const newContact = await contacts.addContact(req.body);
    res.status(201).json(newContact);
  } catch (error) {
    next(error);
  }
};

const updareById = async (req, res, next) => {
  try {
    const { error } = addSchema.validate(req.body);
    if (error) {
      throw HttpError(400, "Missing fields");
    }
    const { id } = req.params;
    const updateContact = await contacts.updateContact(id, req.body);
    if (!updateContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json(updateContact);
  } catch (error) {
    next(error);
  }
};

const deleteById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const deleteContact = await contacts.removeContact(id);
    if (!deleteContact) {
      throw HttpError(404, "Contact not found");
    }
    res.json({ message: "Contact deleted" });
  } catch (error) {
    next(error);
  }
};

module.exports = { getAll, getById, add, updareById, deleteById };
