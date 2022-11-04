const fs = require("fs/promises");
const path = require("path");
const { UserModel } = require("../../models/UserModel");
const Jimp = require("jimp");

const avatarsDir = path.join(__dirname, "../../", "public", "avatars");

const updateAvatar = async (req, res) => {
  const { _id } = req.user;
  const { path: tempUpload, originalname } = req.file;
  try {
    const image = await Jimp.read(tempUpload);
    await image.resize(250, 250).write(tempUpload);

    const extention = originalname.split(".").pop();

    const filename = `${_id}.${extention}`;
    // Jimp.read("./path/to/image.jpg")
    //   .then((image) => {})
    //   .catch((err) => {});
    const resultUpload = path.join(avatarsDir, filename);
    await fs.rename(tempUpload, resultUpload);
    const avatarURL = path.join("avatars", filename);
    await UserModel.findByIdAndUpdate(_id, { avatarURL });
    res.json({
      avatarURL,
    });
  } catch (error) {
    await fs.unlink(req.file.path);
    throw error;
  }
};

module.exports = updateAvatar;
