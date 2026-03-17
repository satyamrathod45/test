import Notification from "../models/Notification.js";

/*
----------------------------------------------------
Create Notification (internal use)
----------------------------------------------------
*/
export const createNotification = async (req, res) => {

  try {

    const { recipient, type, title, message, data } = req.body;

    if (!recipient || !type || !title || !message) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields"
      });
    }

    const notification = await Notification.create({
      recipient,
      type,
      title,
      message,
      data
    });

    // send real-time notification
    if (global.io) {
      global.io.to(recipient.toString()).emit(
        "newNotification",
        notification
      );
    }

    res.status(201).json({
      success: true,
      message: "Notification created",
      notification
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
----------------------------------------------------
Get User Notifications
----------------------------------------------------
*/
export const getNotifications = async (req, res) => {

  try {

    const notifications = await Notification.find({
      recipient: req.user._id
    })
      .sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      count: notifications.length,
      notifications
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
----------------------------------------------------
Get Unread Notifications Count
----------------------------------------------------
*/
export const getUnreadCount = async (req, res) => {

  try {

    const count = await Notification.countDocuments({
      recipient: req.user._id,
      isRead: false
    });

    res.status(200).json({
      success: true,
      unread: count
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
----------------------------------------------------
Mark Notification As Read
----------------------------------------------------
*/
export const markAsRead = async (req, res) => {

  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    notification.isRead = true;

    await notification.save();

    res.status(200).json({
      success: true,
      notification
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
----------------------------------------------------
Mark All Notifications As Read
----------------------------------------------------
*/
export const markAllAsRead = async (req, res) => {

  try {

    await Notification.updateMany(
      { recipient: req.user._id },
      { isRead: true }
    );

    res.status(200).json({
      success: true,
      message: "All notifications marked as read"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};



/*
----------------------------------------------------
Delete Notification
----------------------------------------------------
*/
export const deleteNotification = async (req, res) => {

  try {

    const notification = await Notification.findById(req.params.id);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found"
      });
    }

    if (notification.recipient.toString() !== req.user._id.toString()) {
      return res.status(403).json({
        success: false,
        message: "Not authorized"
      });
    }

    await notification.deleteOne();

    res.status(200).json({
      success: true,
      message: "Notification deleted"
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message
    });

  }

};