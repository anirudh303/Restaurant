import React, { useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CalendarArrowDown } from 'lucide-react';

const schema = z.object({
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  time: z.string().min(1,'Time is required'),
  numberOfPeople: z.number().int().positive().max(10, 'Maximum 10 people allowed'),
});

type FormData = z.infer<typeof schema>;

type ValuePiece = Date | null;

type Value = ValuePiece | [ValuePiece, ValuePiece];

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
  const [showCalendar, setShowCalendar] = useState(false);

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
    setShowCalendar(false);
  }, [reset]);

  const tileDisabled = useCallback(({ date, view }: { date: Date; view: string }) => 
    view === 'month' && date < getStartOfToday(),
  []);

  const handleDateChange = useCallback((value: Date) => {
    setValue('date', value);
    setValue('time', '');
    setShowCalendar(false);
  }, [setValue]);

  const handleTimeSelect = useCallback((slot: string) => {
    setValue('time', slot);
    setShowTimeDropdown(false);
  }, [setValue]);

  return (
    <form className="w-screen h-max flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-wrap gap-4 mb-6">
        {/* Date picker */}
        <div className="relative flex flex-col gap-1 w-64">
          <label htmlFor="date" className="font-medium">Select Date</label>
          <div className="flex items-center border rounded-md overflow-hidden">
            <input 
              type="text" 
              value={selectedDate.toLocaleDateString()} 
              readOnly 
              className="w-full p-2"
            />
            <button 
              type="button" 
              onClick={() => setShowCalendar(!showCalendar)}
              className="p-2 bg-gray-100 hover:bg-gray-200"
            >
              <CalendarArrowDown />
            </button>
          </div>
          {showCalendar && 
            <div className="absolute z-10 mt-1 bg-white shadow-lg rounded-md overflow-hidden">
              <Controller
                control={control}
                name="date"
                render={({ field: { value } }) => (
                  <Calendar
                    onChange={(value) => handleDateChange(value)}
                    value={value}
                    tileDisabled={tileDisabled}
                    minDate={new Date()}
                  />
                )}
              />
            </div>
          }
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
        </div>

        {/* Time picker */}
        <div className="flex flex-col gap-1 w-64">
          <label htmlFor="time" className="font-medium">Time</label>
          <div className="relative">
            <button 
              type="button" 
              onClick={() => setShowTimeDropdown(!showTimeDropdown)}
              className="w-full text-left p-2 border rounded-md"
            >
              {watch('time') || 'Select Time'}
            </button>
            {showTimeDropdown && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 w-full">
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSelect(slot)}
                      className="p-2 border rounded-md hover:bg-gray-100"
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          <input type="hidden" {...register('time')} />
          {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
        </div>

        {/* Number of people picker */}
        <div className="flex flex-col gap-1 w-64">
          <label htmlFor="numberOfPeople" className="font-medium">Number of People</label>
          <input
            type="number"
            id="numberOfPeople"
            {...register('numberOfPeople', { valueAsNumber: true })}
            className="p-2 border rounded-md"
          />
          {errors.numberOfPeople && <span className="text-red-500 text-sm">{errors.numberOfPeople.message}</span>}
        </div>
      </section>

      <div className="flex gap-4">
        <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600">
          Book Table
        </button>
        <button 
          type="button" 
          onClick={handleReset} 
          className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
        >
          ↺ Reset
        </button>
      </div>
    </form>
  );
}

export default BookingForm;