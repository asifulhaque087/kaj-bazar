import { emailTemplates } from "@src/helpers";
import { IEmailLocals } from "@fvoid/shared-lib";

async function sendEmail(
  template: string,
  receiverEmail: string,
  locals: IEmailLocals
): Promise<void> {
  try {
    emailTemplates(template, receiverEmail, locals);
    console.log("Email sent successfully.");
  } catch (error) {
    console.log(
      "error",
      "NotificationService MailTransport sendEmail() method error:",
      error
    );
  }
}

export { sendEmail };
