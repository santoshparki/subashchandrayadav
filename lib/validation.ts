import { z } from "zod";

export const opportunityTypes = [
  "Site Engineering",
  "Quality Control",
  "Residential Design",
  "Drafting Support",
  "Project Coordination",
  "Job Opportunity",
  "Collaboration",
  "Other"
] as const;

export const contactMethods = ["Email", "Phone", "WhatsApp"] as const;

export const enquirySchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name.").max(120),
  email: z.string().trim().email("Please enter a valid email address.").max(160),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  location: z.string().trim().max(140).optional().or(z.literal("")),
  opportunityType: z.enum(opportunityTypes, { message: "Please choose an opportunity type." }),
  companyName: z.string().trim().max(140).optional().or(z.literal("")),
  preferredContactMethod: z.enum(contactMethods, { message: "Please choose a contact method." }),
  message: z.string().trim().min(10, "Please add a short message.").max(5000),
  website: z.string().trim().optional()
});

export function optionalText(value?: string) {
  const clean = value?.trim();
  return clean ? clean : null;
}
