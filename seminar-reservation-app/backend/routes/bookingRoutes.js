import express from "express";
import {
  createBooking,
  deleteBooking,
  getUserBookings,
  updateBookingStatus
} from "../controllers/bookingController.js";
import authMiddleware from "../middleware/authMiddleware.js";
import adminMiddleware from "../middleware/adminMiddleware.js";

const router = express.Router();

router.post("/", authMiddleware, createBooking);
router.delete("/:id", authMiddleware, deleteBooking);
router.get("/", authMiddleware, getUserBookings);
router.put("/:id", authMiddleware, adminMiddleware, updateBookingStatus);

export default router;
