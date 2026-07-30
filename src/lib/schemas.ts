import { z } from "zod";

export const InquirySchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  message: z.string().min(10, { message: "Message must be at least 10 characters." }),
  propertyId: z.string().optional(),
  community: z.string().optional(),
});

export type InquiryFormValues = z.infer<typeof InquirySchema>;

export const ScheduleSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters." }),
  email: z.string().email({ message: "Please enter a valid email address." }),
  phone: z.string().min(10, { message: "Please enter a valid phone number." }),
  date: z.string().min(1, { message: "Please select a date." }),
  time: z.string().min(1, { message: "Please select a time slot." }),
  tourType: z.enum(["in-person", "video-call"]),
  notes: z.string().optional(),
});

export type ScheduleFormValues = z.infer<typeof ScheduleSchema>;

export const NewsletterSchema = z.object({
  email: z.string().email({ message: "Please enter a valid email address." }),
});

export type NewsletterFormValues = z.infer<typeof NewsletterSchema>;
