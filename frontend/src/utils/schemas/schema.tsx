import * as z from 'zod';

export const BookingFormSchema = z.object({
    date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
    time: z.string().min(1, 'Time is required'),
    numberOfPeople: z.number().int().positive().max(10, 'Maximum 10 people allowed'),
  });