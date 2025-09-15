import emailjs from "emailjs-com";

const SERVICE_ID: string = "service_pj38ic4";
const APPROVAL_TEMPLATE_ID: string = "template_wbi6dyk";
const PUBLIC_KEY: string = "I0V8D80ZeFRR4AnJ0";

const ApprovedEmail = async (toEmail: string, toName: string) => {
  try {
    const templateParams = {
      to_name: toName,
      to_email: toEmail,
    };

    await emailjs.send(
      SERVICE_ID,
      APPROVAL_TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    console.log("Approval Email Sent!");
  } catch (error: any) {
    console.error("Error sending email:", error.text || error);
  }
};

export default ApprovedEmail;