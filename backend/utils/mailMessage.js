import crypto from "crypto";
const generateOTP = () => {
  return crypto.randomInt(100000, 1000000).toString();
};
const html = (otp) => {
  return `
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<style>
    body{
        margin:0;
        padding:0;
        background:#f4f6f9;
        font-family:Arial,Helvetica,sans-serif;
    }
    .container{
        max-width:600px;
        margin:40px auto;
        background:#ffffff;
        border-radius:10px;
        overflow:hidden;
        box-shadow:0 5px 15px rgba(0,0,0,0.1);
    }
    .header{
        background:#2563eb;
        color:#ffffff;
        padding:25px;
        text-align:center;
    }
    .header h1{
        margin:0;
    }
    .content{
        padding:35px;
        color:#333333;
        line-height:1.8;
    }
    .otp{
        background:#f1f5f9;
        border:2px dashed #2563eb;
        text-align:center;
        font-size:34px;
        font-weight:bold;
        letter-spacing:10px;
        color:#2563eb;
        padding:20px;
        margin:30px 0;
        border-radius:8px;
    }
    .warning{
        background:#fff8e6;
        border-left:5px solid #f59e0b;
        padding:15px;
        margin-top:25px;
        border-radius:5px;
    }
    .footer{
        background:#f8fafc;
        text-align:center;
        padding:20px;
        font-size:13px;
        color:#666666;
    }
</style>
</head>
<body>

<div class="container">

    <div class="header">
        <h1>Doctor Shop Management System</h1>
        <p>Administrator Verification</p>
    </div>

    <div class="content">

        <h2>Hello Super Administrator,</h2>

        <p>
            A request has been received to create a <strong>new Administrator account</strong>
            in the Doctor Shop Management System.
        </p>

        <p>
            To approve this request, please enter the following One-Time Password (OTP)
            on the verification screen.
        </p>

        <div class="otp">
            ${otp}
        </div>

        <p>
            <strong>This OTP is valid for the next 5 minutes.</strong>
            After that, it will automatically expire and a new verification request
            will be required.
        </p>

        <div class="warning">
            <strong>Security Notice</strong><br><br>

            • Never share this OTP with anyone.<br>
            • Our support team will never ask for your OTP.<br>
            • If you did not initiate this request, simply ignore this email.
            No new administrator account will be created without successful OTP verification.
        </div>

        <p style="margin-top:35px;">
            Thank you for helping us keep your Doctor Shop Management System secure.
        </p>

        <p>
            Regards,<br>
            <strong>Doctor Shop Management System</strong><br>
            Security & Authentication Team
        </p>

    </div>

    <div class="footer">
        This is an automated security email. Please do not reply to this message.<br><br>
        © 2026 Doctor Shop Management System. All Rights Reserved.
    </div>

</div>

</body>
</html>
`;
};

export { generateOTP, html };
