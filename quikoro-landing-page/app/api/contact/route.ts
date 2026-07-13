import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { message: "All fields are required." },
        { status: 400 },
      );
    }

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT),
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    });

    await transporter.sendMail({
      from: `"Website Contact" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_RECEIVER,
      replyTo: email,
      subject: `Contact Form: ${subject}`,
      html: `
       <div style="font-family:Arial,sans-serif;padding:24px">
  <h2>📩 New Contact Form Submission</h2>

  <table cellspacing="0" cellpadding="8">
    <tr>
      <td><strong>Name</strong></td>
      <td>${name}</td>
    </tr>
    <tr>
      <td><strong>Email</strong></td>
      <td>${email}</td>
    </tr>
    <tr>
      <td><strong>Subject</strong></td>
      <td>${subject}</td>
    </tr>
  </table>

  <h3>Message</h3>

  <div style="padding:16px;background:#f5f5f5;border-radius:8px;">
    ${message.replace(/\n/g, "<br>")}
  </div>
</div>
      `,
    });

    return NextResponse.json(
      { message: "Email sent successfully." },
      { status: 200 },
    );
  } catch (error) {
    console.error(error);

    return NextResponse.json(
      { message: "Failed to send email." },
      { status: 500 },
    );
  }
}
