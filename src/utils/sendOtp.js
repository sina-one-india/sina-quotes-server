export const sendOtp = async ({ emailId, otp }) => {
  try {
    // If not in production, log the OTP to the console to save email quota and ease local debugging
    if (process.env.NODE_ENV !== "production") {
      console.log("\n=========================================");
      console.log(`📨 [LOCAL EMAIL BYPASS] OTP for ${emailId}`);
      console.log(`🔑 OTP Code: ${otp}`);
      console.log("=========================================\n");
      return { message: "OTP logged to console in local mode" };
    }

    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        accept: "application/json",
        "content-type": "application/json",
        "api-key": process.env.BREVO_PASS,
      },
      body: JSON.stringify({
        sender: {
          name: "QuoteShare",
          email: "noreply@quoteshare.work.gd",
        },
        to: [
          {
            email: emailId,
          },
        ],
        subject: "Your One-Time Password (OTP) for QuoteShare",
        textContent: `Hello,

Thank you for using QuoteShare! To verify your email address and continue, please use the One-Time Password (OTP) below:

OTP: ${otp}

This OTP is valid for the next 3 minutes. Please do not share it with anyone.

If you did not request this OTP, you can safely ignore this message. Your account remains secure.

Need help or have questions? Reach out to us anytime at balagamsachin337@gmail.com

Best wishes,  
Team QuoteShare

—

QuoteShare is a platform where creativity meets daily inspiration. Thank you for being part of our journey!`,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(
        errorData.message || "Failed to send email via Brevo API",
      );
    }

    const data = await response.json();
    return data;
  } catch (e) {
    throw new Error(e.message);
  }
};
