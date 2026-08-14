const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.office365.com",
  port: 587,
  secure: false,
  auth: {
    user: "info@irisprivateequitygroup.com",
    pass: "YOUR_PASSWORD_HERE",
  },
});

async function test() {
  try {
    await transporter.verify();
    console.log("✅ SMTP authentication successful!");
  } catch (error) {
    console.error("❌ SMTP authentication failed:");
    console.error(error);
  }
}

test();
