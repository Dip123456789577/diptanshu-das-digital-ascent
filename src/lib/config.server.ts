import process from "node:process";

// Server-only config. The .server.ts suffix prevents Vite from bundling
// this file into the client — values here never reach the browser.
// Always read process.env inside a function or handler so it works across
// Node, Nitro, and edge runtimes.

export function getServerConfig() {
  const emailApiKey =
    process.env.EMAIL_API_KEY || process.env.MAIL_API_KEY || process.env.BREVO_API_KEY;

  return {
    nodeEnv: process.env.NODE_ENV,
    emailApiKey,
    brevoApiKey: emailApiKey, // backward-compatibility alias
    contactToEmail: process.env.CONTACT_TO_EMAIL || "diptanshudas920@gmail.com",
    contactFromEmail: process.env.CONTACT_FROM_EMAIL || "diptanshudas920@gmail.com",
    contactFromName: process.env.CONTACT_FROM_NAME || "Diptanshu Das Portfolio",
  };
}
