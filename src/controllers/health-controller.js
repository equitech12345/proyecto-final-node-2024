import mongoose from "mongoose";
const HealthController = {
    healthCheck: (req, res) => {
        try {
            if (mongoose.connection.readyState !== 1) {
                return res.status(500).json({ success: false, message: "Database connection error" });
            }
            res.status(200).json({ success: true, message: "Health check" });
        } catch (error) {
            res.status(500).json({ success: false, message: error.message });
        }
    },
};
export default HealthController;