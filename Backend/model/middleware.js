import Customer from "./Customer.js";

export const fetchUserMidware = async (req, res, next) => {
  try {
    // 1. Get User ID from session (e.g., req.session.userId)
    const userId = req.session.userId; 

    if (!userId) {
      return res.status(401).json({ message: "Not authorized, no session" });
    }

    // 2. Fetch the full user document
    // We use .select('-password') to exclude the password for security
    const userDoc = await Customer.findById(userId).select('-password');

    if (!userDoc) {
      return res.status(401).json({ message: "User not found" });
    }

    // 3. Attach the document to the 'req' object
    req.userDoc = userDoc;

    next(); // Move to the next function (the controller)
  } catch (error) {
    res.status(401).json({ message: "Not authorized" });
  }
};