import { z } from "zod";

export const specieOptions: Array<string> = ["human", "alien", "other"] as const;

// const MAX_FILE_SIZE = 1024 * 1024 * 5;

// const ACCEPTED_IMAGE_MIME_TYPES = [
//   "image/jpeg",
//   "image/jpg",
//   "image/png",
//   "image/webp",
// ];

export const userSchema = z.object({
  characterName: z
    .string()
    .min(3, {
      message: "Character name must be at least 3 characters long",
    })
    .max(20, {
      message: "Character name must be at most 20 characters long",
    }),
  specie: z.enum(specieOptions, {
    required_error: "Please select a contact method",
    invalid_type_error: 'Please select a contact method',
  }),
  // image: z
  //   .any()
  //   .refine((files) => {
  //     return files?.[0]?.size <= MAX_FILE_SIZE;
  //   }, `Max image size is 5MB.`)
  //   .refine(
  //     (files) => ACCEPTED_IMAGE_MIME_TYPES.includes(files?.[0]?.type),
  //     "Only .jpg, .jpeg, .png and .webp formats are supported."
  //   ),
  email: z.string().email({
    message: "Please enter a valid email",
  }),
});
