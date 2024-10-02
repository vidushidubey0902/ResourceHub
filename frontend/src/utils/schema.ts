import { z } from "zod";
import { maxWords } from "./helpers";

export const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export const signupSchema = z
  .object({
    name: z
      .string()
      .min(3, { message: "Name must be at least 3 characters long" })
      .max(15, { message: "Name can't contain more than 15 characters" }),
    email: z.string().email(),
    password: z.string().min(8),
    confirmPassword: z.string().min(8),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export const updateProfileSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters long" }),
  email: z.string().email(),
  oldPassword: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "Password is too short",
    }),
  newPassword: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "New password should be at least 8 characters long",
    }),
  description: z
    .string()
    .optional()
    .refine((value) => maxWords(value, 50), {
      message: "Description can't exceed 50 words",
    }),
});

export const aboutResourceCollectionSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 letters" })
    .max(40, { message: "Title can't contain more than 40 letters" }),
  languages: z
    .array(
      z.string().max(15, {
        message: "Each language tag can't be more than 15 letters long",
      })
    )
    .min(1, { message: "At least one language is required" })
    .max(3, { message: "Can't have more than 3 language" }),
  description: z
    .string()
    .min(4, { message: "Description must be at least 4 letters long" })
    .max(150, { message: "Description can't exceed 150 letters" }),
  notes: z
    .string()
    .min(4, { message: "Notes must be at least 4 letters long" })
    .max(250, { message: "Notes can't exceed 250 letters" }),
});

export const linksResourceFormSchema = z.object({
  links: z
    .array(
      z.object({
        url: z.string().url({ message: "Must be a valid URL" }).max(200, {
          message: "Each URL can't have more than 200 characters",
        }),
        description: z
          .string()
          .min(10, {
            message: "Description should contain at least 10 characters",
          })
          .max(150, { message: "Description can't exceed 150 characters" }),
      })
    )
    .min(1, { message: "At least one link is required" })
    .max(5, { message: "Can't have more than 5 links" }),
});

export const reviewSchema = z.object({
  rating: z.number().min(1, { message: "At least 1 star is required" }),
  comment: z
    .string()
    .max(100, { message: "Comment can't exceed 100 characters" }),
});

export const reportResourceSchema = z.object({
  reason: z
    .string()
    .min(3, { message: "Reason must be at least 3 characters long" })
    .max(100, { message: "Reason can't exceed 100 characters" }),
  comments: z
    .string()
    .max(200, { message: "Comments can't exceed 200 characters" })
    .optional(),
});

export const addNoteSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters long" })
    .max(40, { message: "Title can't exceed 40 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters long" })
    .max(150, { message: "Content can't exceed 150 characters" }),
  color: z
    .string()
    .regex(/^#[0-9A-F]{6}$/i, { message: "Color must be a valid hex code" })
    .optional(),
});

export const createRoadmapSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters" })
    .max(40, { message: "Title cannot exceed 40 characters" }),
  description: z
    .string()
    .min(4, { message: "Description must contain at least 4 characters" })
    .max(150, { message: "Description cannot exceed 150 characters" }),
  tags: z
    .array(
      z
        .string()
        .max(8, { message: "Each tag can't exceed more than 8 characters" })
    )
    .min(1, { message: "At least one tag is required" })
    .max(3, { message: "Can't have more than 3 tags" }),
  steps: z
    .array(
      z.object({
        title: z
          .string()
          .min(3, { message: "Step title must contain at least 3 characters" })
          .max(30, { message: "Step title can't exceed 30 characters" }),
        description: z
          .string()
          .min(4, {
            message: "Step description must be at least 4 characters long",
          })
          .max(100, {
            message: "Step description can't exceed 100 characters",
          }),
        resources: z
          .array(z.string().url({ message: "Resource must be a valid URL" }))
          .min(1, { message: "At least one resource link is required" })
          .max(4, { message: "Each step can't have more than 4 links" }),
      })
    )
    .min(3, { message: "At least 3 steps are required" }),
});

export const apiCodeGeneratorSchema = z
  .object({
    route: z.string().url({ message: "Enter a valid URL." }),
    method: z.enum(["GET", "POST", "PUT", "DELETE", "PATCH"], {
      required_error: "HTTP method is required",
    }),
    body: z.string().optional(),
    approach: z.enum(["RTK Query", "Fetch", "Axios"], {
      required_error: "Approach is required",
    }),
  })
  .refine(
    (data) => {
      if (["POST", "PUT", "PATCH"].includes(data.method) && !data.body) {
        return false;
      }
      return true;
    },
    {
      message: "Request body is required for POST, PUT, PATCH methods.",
    }
  );

export const updateResourceSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must contain at least 3 characters" })
    .max(40, { message: "Title cannot exceed 40 characters" })
    .optional(),
  description: z
    .string()
    .min(4, { message: "Description must contain at least 4 characters" })
    .max(150, { message: "Description cannot exceed 150 characters" })
    .optional(),
  tags: z
    .array(
      z
        .string()
        .max(8, { message: "Each tag can't exceed more than 8 characters" })
    )
    .min(1, { message: "At least one tag is required" })
    .max(5, { message: "Can't have more than 5 tags" })
    .optional(),
  essentials: z
    .array(z.string().url({ message: "Essential must be a valid URL" }))
    .min(1, { message: "At least one essential link is required" })
    .optional(),
  extras: z
    .array(z.string().url({ message: "Extra must be a valid URL" }))
    .optional(),
  notes: z
    .string()
    .max(500, { message: "Notes can't exceed 500 characters" })
    .optional(),
});
