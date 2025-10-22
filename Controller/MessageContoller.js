const MessageModel = require("../Models/MessageSchema");

const sendMessage = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: "Name, email, and message are required.",
      });
    }

    const newMessage = await MessageModel.create({
      name,
      email,
      subject,
      message,
    });

    res.status(201).json({
      success: true,
      message: "Message sent successfully!",
      data: newMessage,
    });
  } catch (error) {
    console.error("Error saving message:", error);
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

const getAllMessages = async (req, res) => {
  try {
    const role = req.user.role
    if (role !== "admin"){
      return res.staus(403).json({
        success:false,
        message:"Only admin can acess the message."
      })
    }
    const messages = await MessageModel.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: messages.length,
      messages,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error. Try again later.",
    });
  }
};

module.exports = { sendMessage, getAllMessages };
