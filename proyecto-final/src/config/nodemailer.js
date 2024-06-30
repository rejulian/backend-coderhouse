import nodemailer from "nodemailer";

export const transporter = nodemailer.createTransport({
  service: "gmail",
  port: 587,
  auth: {
    user: "contacto.re.julian@gmail.com",
    pass: "swzxasvofgurniap",
  },
});