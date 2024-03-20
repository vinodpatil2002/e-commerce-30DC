import express from "express";
import cloudinary from "cloudinary";
import { isAuthenticated } from "../middleware/auth.js";
import { authAdmin } from "../middleware/authAdmin.js";
import fs from "fs";
// import fileUpload from "express-fileupload"; // Import express-fileupload middleware

const router = express.Router();

// Apply express-fileupload middleware
// router.use(fileUpload());

cloudinary.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.CLOUD_API_KEY,
    api_secret: process.env.CLOUD_API_SECRET,
});

router.post("/upload", isAuthenticated, authAdmin, (req, res) => {
    try {
        console.log(req.files);
        if (!req.files || !req.files.file)
            return res.status(400).send({ msg: "No file uploaded" });

        const file = req.files.file;

        // Ensure file has a temporary path
        if (!file.tempFilePath)
            return res.status(400).send({ msg: "Temporary file path not found" });

        // Check file size
        if (file.size > 1024 * 1024) {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "Size too large" });
        }

        // Check file format
        if (file.mimetype !== "image/jpeg" && file.mimetype !== "image/png") {
            removeTmp(file.tempFilePath);
            return res.status(400).json({ msg: "File format is incorrect" });
        }

        cloudinary.v2.uploader.upload(
            file.tempFilePath,
            { folder: "test" },
            async (err, result) => {
                removeTmp(file.tempFilePath);
                if (err) throw err;
                res.json({
                    public_id: result.public_id,
                    url: result.secure_url,
                });
            }
        );
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});

router.post("/destroy", isAuthenticated, authAdmin, (req, res) => {
    try {
        const { public_id } = req.body;
        if (!public_id)
            return res.status(400).json({ msg: "No images selected" });

        cloudinary.v2.uploader.destroy(public_id, async (err, result) => {
            if (err) throw err;
            res.json({ msg: "Deleted" });
        });
    } catch (err) {
        return res.status(500).json({ msg: err.message });
    }
});

const removeTmp = (path) => {
    fs.unlink(path, (err) => {
        if (err) throw err;
    });
};

export default router;
