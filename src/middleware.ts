export { default } from "next-auth/middleware";

export const config = {
  matcher: [
    "/admin/dashboard",
    "/admin/aanmeldingen",
    "/admin/cursussen",
    "/admin/gebruikers",
    "/admin/instellingen",
    "/admin/mail-templates",
    "/admin/mail-logs",
    "/admin/audit-logs",
    "/api/upload",
  ],
};