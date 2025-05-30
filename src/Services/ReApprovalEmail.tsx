import emailjs from "emailjs-com";

const SERVICE_ID: string = "service_pj38ic4";
const REAPPROVAL_TEMPLATE_ID: string = "template_km87him";
const PUBLIC_KEY: string = "I0V8D80ZeFRR4AnJ0";

const ReApprovalEmail = async (
  toEmail: string,
  toName: string,
  fieldsArray: string[],
  reason: string,
  updateLink: string
) => {
  const toFieldsHTML = fieldsArray.map((field) => `${field}`).join(", ");
  const templateParams = {
    to_name: toName,
    to_reason: reason,
    to_email: toEmail,
    to_fields: toFieldsHTML,
    update_link: updateLink,
  };

  try {
    const response = await emailjs.send(
      SERVICE_ID,
      REAPPROVAL_TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    console.log("Re-Approval Email Sent to:", toEmail, response);
    return response; // Return response for success confirmation
  } catch (error: any) {
    console.error("Error sending re-approval email:", error.text || error);
    throw new Error(
      `Failed to send re-approval email: ${error.text || error.message}`
    );
  }
};

export default ReApprovalEmail;
