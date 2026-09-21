import { z } from "zod";
import { isKnownMagnet } from "./magnets";

// Mirrors the Pydantic models in the old backend/server.py.

const text = (max: number) => z.string().trim().min(1, "Required").max(max);
const optionalText = (max: number) =>
  z
    .string()
    .trim()
    .max(max)
    .nullish()
    .transform((v) => v || null);
// Lower-cased so a repeat newsletter signup matches regardless of capitalisation.
const email = z.string().trim().toLowerCase().email("Enter a valid email address").max(254);

export const contactSchema = z.object({
  name: text(200),
  email,
  role: z.enum(["student", "parent", "teacher", "other"]),
  subject: optionalText(200),
  message: text(5000),
});

export const newsletterSchema = z.object({
  email,
  source: optionalText(50).transform((v) => v ?? "footer"),
});

export const leadMagnetSchema = z.object({
  first_name: text(100),
  email,
  audience: z.enum(["student", "parent", "teacher"]),
  magnet: z.string().refine(isKnownMagnet, "Unknown resource"),
});

export const tutorApplicationSchema = z.object({
  name: text(200),
  email,
  phone: optionalText(50),
  qualifications: text(5000),
  experience: text(5000),
  why_join: text(5000),
});

export type ContactInput = z.infer<typeof contactSchema>;
export type NewsletterInput = z.infer<typeof newsletterSchema>;
export type LeadMagnetInput = z.infer<typeof leadMagnetSchema>;
export type TutorApplicationInput = z.infer<typeof tutorApplicationSchema>;
