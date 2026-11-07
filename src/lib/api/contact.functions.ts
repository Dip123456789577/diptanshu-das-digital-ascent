import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { getServerConfig } from "../config.server";

export const contactFormSchema = z.object({
  name: z.string().trim().min(2, "Name must be at least 2 characters").max(100, "Name is too long"),
  email: z.string().trim().email("Please enter a valid email address"),
  subject: z
    .string()
    .trim()
    .min(2, "Subject must be at least 2 characters")
    .max(150, "Subject is too long"),
  message: z
    .string()
    .trim()
    .min(10, "Message must be at least 10 characters")
    .max(3000, "Message is too long"),
});

export type ContactFormData = z.infer<typeof contactFormSchema>;

export type ContactResponse = {
  success: boolean;
  message?: string;
  error?: string;
  details?: string;
  messageId?: string;
};

export const submitContactForm = createServerFn({ method: "POST" })
  .validator((data: unknown) => contactFormSchema.parse(data))
  .handler(async ({ data }): Promise<ContactResponse> => {
    const config = getServerConfig();
    const apiKey = config.brevoApiKey;

    if (!apiKey) {
      console.error("[Contact API] BREVO_API_KEY is not defined.");
      return {
        success: false,
        error:
          "Contact service is momentarily unconfigured. Please email directly to diptanshudas920@gmail.com",
      };
    }

    try {
      const sanitizedName = data.name.replace(/<[^>]*>?/gm, "").trim();
      const sanitizedSubject = data.subject.replace(/<[^>]*>?/gm, "").trim();
      const formattedMessage = data.message
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/\n/g, "<br/>");

      const emailPayload = {
        sender: {
          name: config.contactFromName,
          email: config.contactFromEmail,
        },
        to: [
          {
            email: config.contactToEmail,
            name: "Diptanshu Das",
          },
        ],
        replyTo: {
          email: data.email,
          name: sanitizedName,
        },
        subject: `[Portfolio Inquiry] ${sanitizedSubject} - from ${sanitizedName}`,
        htmlContent: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>New Portfolio Message</title>
            <style>
              body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #0A192F; color: #CCD6F6; margin: 0; padding: 24px; }
              .card { max-width: 600px; margin: 0 auto; background: #112240; border-radius: 8px; border: 1px solid #233554; padding: 32px; box-shadow: 0 10px 30px -15px rgba(2,12,27,0.7); }
              .header { border-bottom: 1px solid #233554; padding-bottom: 20px; margin-bottom: 24px; }
              .title { color: #64FFDA; font-size: 20px; font-weight: 700; margin: 0 0 6px 0; }
              .subtitle { color: #8892B0; font-size: 14px; margin: 0; }
              .field { margin-bottom: 18px; }
              .label { color: #8892B0; font-size: 11px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.08em; margin-bottom: 4px; }
              .value { color: #CCD6F6; font-size: 15px; line-height: 1.5; }
              .message-box { background: #0A192F; border-left: 3px solid #64FFDA; border-radius: 4px; padding: 16px; margin-top: 10px; font-size: 15px; color: #E6F1FF; line-height: 1.6; }
              .footer { border-top: 1px solid #233554; margin-top: 30px; padding-top: 16px; font-size: 12px; color: #8892B0; text-align: center; }
            </style>
          </head>
          <body>
            <div class="card">
              <div class="header">
                <h1 class="title">New Portfolio Contact Message</h1>
                <p class="subtitle">Direct submission from Diptanshu Das Digital Ascent Portfolio</p>
              </div>
              <div class="field">
                <div class="label">From</div>
                <div class="value"><strong>${sanitizedName}</strong> &lt;${data.email}&gt;</div>
              </div>
              <div class="field">
                <div class="label">Subject</div>
                <div class="value">${sanitizedSubject}</div>
              </div>
              <div class="field">
                <div class="label">Message Content</div>
                <div class="message-box">${formattedMessage}</div>
              </div>
              <div class="footer">
                Sent via Diptanshu Das Portfolio (Brevo Transactional API) · ${new Date().toISOString()}
              </div>
            </div>
          </body>
          </html>
        `,
      };

      const res = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
          "api-key": apiKey,
        },
        body: JSON.stringify(emailPayload),
      });

      const responseData = (await res.json().catch(() => ({}))) as {
        message?: string;
        code?: string;
        messageId?: string;
      };

      if (!res.ok) {
        console.error("[Brevo API Error]", res.status, responseData);
        const errMsg = responseData.message || `Brevo request failed with status ${res.status}`;

        if (errMsg.includes("unrecognised IP address") || errMsg.includes("authorised_ips")) {
          return {
            success: false,
            error:
              "Brevo API requires authorizing this IP address. Please open https://app.brevo.com/security/authorised_ips to permit access or disable IP restrictions in your Brevo security settings.",
            details: errMsg,
          };
        }

        return {
          success: false,
          error: errMsg,
        };
      }

      return {
        success: true,
        message: "Your message has been delivered directly to Diptanshu's inbox!",
        messageId: responseData.messageId,
      };
    } catch (err: unknown) {
      console.error("[Contact API Exception]", err);
      const errorMessage =
        err instanceof Error
          ? err.message
          : "An unexpected error occurred while communicating with the mail server.";
      return {
        success: false,
        error: errorMessage,
      };
    }
  });
