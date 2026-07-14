const ContactMessageModel = require("../models/contactMessageModel");

exports.getAllMessages = async (req, res) => {
  const messages = await ContactMessageModel.find().sort({ createdAt: -1 });
  res.status(200).json({ success: true, messages });
};
