import Notification from "../models/Notification.js";

export const sendNotification = async (io, userId, payload) => {

  const notification = await Notification.create({
    recipient: userId,
    type: payload.type,
    title: payload.title,
    message: payload.message,
    data: payload.data
  });

  io.to(userId.toString()).emit("newNotification", notification);

};