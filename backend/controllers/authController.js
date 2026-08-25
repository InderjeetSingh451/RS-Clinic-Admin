import bcrypt from "bcrypt";

import adminModel from "../models/adminModel.js";
import pendingAdminModel from "../models/pendingAdmin.js";

import sendEmail from "../utils/sendMails.js";
import { generateOTP, html } from "../utils/mailMessage.js";
import { generateToken } from "../utils/generateToken.js";

// ========================= LOGIN =========================

const login = async (req, res) => {
  try {
    let { username, password } = req.body;

    username = username?.trim();

    if (!username || !password) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    const findUser = await adminModel.findOne({ username });

    if (!findUser) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    const comparePassword = await bcrypt.compare(password, findUser.password);

    if (!comparePassword) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const token = generateToken(findUser._id);

    res.json({
      success: true,
      message: "Login Successfully",
      token,
      admin: {
        name: findUser.name,
        mobile: findUser.mobile,
      },
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= SIGNUP =========================

const signup = async (req, res) => {
  try {
    let { name, username, mobile, password } = req.body;

    name = name?.trim();
    username = username?.trim();
    mobile = mobile?.trim();

    if (!name) {
      return res.json({
        success: false,
        message: "Name is Required",
      });
    }

    if (!username) {
      return res.json({
        success: false,
        message: "Username is Required",
      });
    }

    if (!mobile) {
      return res.json({
        success: false,
        message: "Mobile Number is Required",
      });
    }

    if (!password) {
      return res.json({
        success: false,
        message: "Password is Required",
      });
    }

    if (password.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const mobileExist = await adminModel.findOne({ mobile });

    if (mobileExist) {
      return res.json({
        success: false,
        message: "Mobile Number already exists",
      });
    }

    const pendingMobile = await pendingAdminModel.findOne({ mobile });

    if (pendingMobile) {
      return res.json({
        success: false,
        message:
          "A verification request is already pending for this mobile number.",
      });
    }

    const usernameExist = await adminModel.findOne({ username });

    if (usernameExist) {
      return res.json({
        success: false,
        message: "Username already exists",
      });
    }

    const pendingUsername = await pendingAdminModel.findOne({
      username,
    });

    if (pendingUsername) {
      return res.json({
        success: false,
        message: "A verification request is already pending for this username.",
      });
    }

    const otp = generateOTP();

    const hashedPassword = await bcrypt.hash(password, 10);

    const hashedOTP = await bcrypt.hash(otp, 10);

    await pendingAdminModel.create({
      name,
      username,
      mobile,
      password: hashedPassword,
      otp: hashedOTP,
      attempts: 0,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail(
      process.env.SUPER_ADMIN_EMAIL,
      "Admin Verification OTP",
      html(otp),
    );

    res.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= VERIFY SIGNUP OTP =========================

const verifyOTP = async (req, res) => {
  try {
    let { username, otp } = req.body;

    username = username?.trim();

    if (!username) {
      return res.json({
        success: false,
        message: "Username is required",
      });
    }

    if (!otp) {
      return res.json({
        success: false,
        message: "OTP is required",
      });
    }

    const pending = await pendingAdminModel.findOne({ username });

    if (!pending) {
      return res.json({
        success: false,
        message: "OTP expired or request not found",
      });
    }

    if (pending.expiresAt < new Date()) {
      await pending.deleteOne();

      return res.json({
        success: false,
        message: "OTP has expired. Please register again.",
      });
    }

    const isMatch = await bcrypt.compare(otp, pending.otp);

    if (!isMatch) {
      pending.attempts += 1;

      if (pending.attempts >= 5) {
        await pending.deleteOne();

        return res.json({
          success: false,
          message: "Too many incorrect attempts. Please register again.",
        });
      }

      await pending.save();

      return res.json({
        success: false,
        message: `Invalid OTP. Remaining Attempts : ${5 - pending.attempts}`,
      });
    }

    await adminModel.create({
      name: pending.name,
      username: pending.username,
      mobile: pending.mobile,
      password: pending.password,
    });

    await pending.deleteOne();

    return res.json({
      success: true,
      message: "New Admin Created Successfully.",
    });
  } catch (error) {
    console.log(error);

    res.json({
      success: false,
      message: error.message,
    });
  }
};
// ========================= FORGOT PASSWORD =========================

const forgotPassword = async (req, res) => {
  try {
    let { username, newPassword } = req.body;

    username = username?.trim();

    if (!username || !newPassword) {
      return res.json({
        success: false,
        message: "All fields are required",
      });
    }

    if (newPassword.length < 6) {
      return res.json({
        success: false,
        message: "Password must be at least 6 characters.",
      });
    }

    const findUser = await adminModel.findOne({ username });

    if (!findUser) {
      return res.json({
        success: false,
        message: "Admin not found",
      });
    }

    // Prevent using the same password again
    const isSamePassword = await bcrypt.compare(newPassword, findUser.password);

    if (isSamePassword) {
      return res.json({
        success: false,
        message: "New password cannot be the same as the current password.",
      });
    }

    const pendingRequest = await pendingAdminModel.findOne({ username });

    if (pendingRequest) {
      return res.json({
        success: false,
        message:
          "A verification request is already pending. Please verify the OTP or wait until it expires.",
      });
    }

    const otp = generateOTP();

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    const hashedOTP = await bcrypt.hash(otp, 10);

    await pendingAdminModel.create({
      name: findUser.name,
      username: findUser.username,
      mobile: findUser.mobile,
      password: hashedPassword,
      otp: hashedOTP,
      attempts: 0,
      expiresAt: new Date(Date.now() + 5 * 60 * 1000),
    });

    await sendEmail(
      process.env.SUPER_ADMIN_EMAIL,
      "Password Reset OTP",
      html(otp),
    );

    return res.json({
      success: true,
      message: "OTP sent successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= VERIFY FORGOT PASSWORD OTP =========================

const verifyOTPForForgotPassword = async (req, res) => {
  try {
    let { username, otp } = req.body;

    username = username?.trim();

    if (!username) {
      return res.json({
        success: false,
        message: "Username is required",
      });
    }

    if (!otp) {
      return res.json({
        success: false,
        message: "OTP is required",
      });
    }

    const pending = await pendingAdminModel.findOne({ username });

    if (!pending) {
      return res.json({
        success: false,
        message: "OTP expired or request not found",
      });
    }

    if (pending.expiresAt < new Date()) {
      await pending.deleteOne();

      return res.json({
        success: false,
        message: "OTP has expired. Please request a new OTP.",
      });
    }

    const isMatch = await bcrypt.compare(otp, pending.otp);

    if (!isMatch) {
      pending.attempts += 1;

      if (pending.attempts >= 5) {
        await pending.deleteOne();

        return res.json({
          success: false,
          message: "Too many incorrect attempts. Please request a new OTP.",
        });
      }

      await pending.save();

      return res.json({
        success: false,
        message: `Invalid OTP. Remaining Attempts : ${5 - pending.attempts}`,
      });
    }

    const updated = await adminModel.updateOne(
      {
        username: pending.username,
      },
      {
        $set: {
          password: pending.password,
        },
      },
    );

    if (updated.modifiedCount === 0) {
      return res.json({
        success: false,
        message: "Password update failed.",
      });
    }

    await pending.deleteOne();

    return res.json({
      success: true,
      message: "Password Updated Successfully.",
    });
  } catch (error) {
    console.log(error);

    return res.json({
      success: false,
      message: error.message,
    });
  }
};

// ========================= EXPORTS =========================

export { login, signup, verifyOTP, forgotPassword, verifyOTPForForgotPassword };
