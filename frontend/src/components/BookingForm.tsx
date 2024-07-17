import React, { useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

const schema = z.object({
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  time: z.string().min(1,'Time is required'),
  numberOfPeople: z.number().int().positive().max(10, 'Maximum 10 people allowed'),
});

type FormData = z.infer<typeof schema>;

const generateTimeSlots = (selectedDate: Date): string[] => {
  const slots: string[] = [];
  const now = new Date();
  const isToday = selectedDate.toDateString() === now.toDateString();
  let startHour = isToday ? now.getHours() + 1 : 11;
  startHour = Math.max(startHour, 11);

  for (let i = startHour; i <= 21; i++) {
    slots.push(`${i}:00`);
  }

  return slots;
};

const getStartOfToday = (): Date => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return today;
  };

function BookingForm() {
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      time: '',
      numberOfPeople: 1,
    },
  });

  const selectedDate = watch('date');

  const availableTimeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Here you would typically send the data to your backend
  };

  const handleReset = useCallback(() => {
    reset({
      date: new Date(),
      time: '',
      numberOfPeople: 1,
    });
    setShowTimeDropdown(false);
  }, [reset]);

  const tileDisabled = useCallback(({ date, view }: { date: Date; view: string }) => 
    view === 'month' && date < getStartOfToday(),
  []);

  const handleDateChange = useCallback((value: any) => {
    setValue('date', value);
    setValue('time', '');
  }, [setValue]);

  const handleTimeSelect = useCallback((slot: string) => {
    setValue('time', slot);
    setShowTimeDropdown(false);
  }, [setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="date">Date:</label>
        <Controller
          control={control}
          name="date"
          render={({ field: { value } }) => (
            <Calendar
              onChange={(value)=>handleDateChange(value)}
              value={value}
              tileDisabled={tileDisabled}
              minDate={new Date()}
            />
          )}
        />
        {errors.date && <span>{errors.date.message}</span>}
      </div>

      <div>
        <label htmlFor="time">Time:</label>
        <div>
          <button type="button" onClick={() => setShowTimeDropdown(!showTimeDropdown)}>
            {watch('time') || 'Select Time'}
          </button>
          {showTimeDropdown && (
            <div style={{ border: '1px solid black', padding: '10px' }}>
              {availableTimeSlots.map((slot) => (
                <button
                  key={slot}
                  type="button"
                  onClick={() => handleTimeSelect(slot)}
                >
                  {slot}
                </button>
              ))}
            </div>
          )}
        </div>
        <input type="hidden" {...register('time')} />
        {errors.time && <span>{errors.time.message}</span>}
      </div>

      <div>
        <label htmlFor="numberOfPeople">Number of People:</label>
        <input
          type="number"
          id="numberOfPeople"
          {...register('numberOfPeople', { valueAsNumber: true })}
        />
        {errors.numberOfPeople && <span>{errors.numberOfPeople.message}</span>}
      </div>

      <div>
        <button type="submit">Book Table</button>
        <button type="button" onClick={handleReset}>
          ↺ Reset
        </button>
      </div>
    </form>
  );
}

export default BookingForm;