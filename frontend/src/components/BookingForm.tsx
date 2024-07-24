import React, { useState, useCallback, useMemo } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { CalendarIcon, Clock, Plus, Minus } from 'lucide-react';

// schema
const schema = z.object({
  date: z.date().min(new Date(), { message: "Date cannot be in the past" }),
  time: z.string().min(1, 'Time is required'),
  numberOfPeople: z.number().int().positive().max(10, 'Maximum 10 people allowed'),
});

type FormData = z.infer<typeof schema>;

// time slot generation
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

function BookingForm() {
  const [showTimeDropdown, setShowTimeDropdown] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);

  const { control, register, handleSubmit, formState: { errors }, watch, setValue, reset } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: {
      date: new Date(),
      time: '',
      numberOfPeople: 1,
    },
  });

  const selectedDate = watch('date');
  const numberOfPeople = watch('numberOfPeople');

  const availableTimeSlots = useMemo(() => generateTimeSlots(selectedDate), [selectedDate]);

  const onSubmit = (data: FormData) => {
    console.log(data);
    // Send the data to your backend here
  };

  const handleReset = useCallback(() => {
    reset({
      date: new Date(),
      time: '',
      numberOfPeople: 1,
    });
    setShowTimeDropdown(false);
    setShowDatePicker(false);
  }, [reset]);

  const handleDateChange = useCallback((date: Date | null) => {
    if (date != null) setValue('date', date);
    setValue('time', '');
    setShowDatePicker(false);
  }, [setValue]);

  const handleTimeSelect = useCallback((slot: string) => {
    setValue('time', slot);
    setShowTimeDropdown(false);
  }, [setValue]);

  const handleNumberOfPeopleChange = useCallback((increment: number) => {
    setValue('numberOfPeople', Math.max(1, Math.min(10, (numberOfPeople || 0) + increment)));
  }, [setValue, numberOfPeople]);

  return (
    <form className="w-screen h-max flex flex-col p-4" onSubmit={handleSubmit(onSubmit)}>
      <section className="flex flex-wrap h-64 gap-4 mb-10 border-2">
        <div className="relative flex flex-col gap-1 w-64 border-2">
          <label htmlFor="date" className="font-medium">Select Date</label>
          <Controller
            control={control}
            name="date"
            render={({ field: { onChange, value } }) => (
              <div className="relative">
                <div className="flex items-center border rounded-md overflow-hidden">
                  <input 
                    type="text" 
                    value={value.toLocaleDateString()} 
                    readOnly 
                    className="w-full p-2"
                  />
                  <button 
                    type="button" 
                    onClick={() => setShowDatePicker(!showDatePicker)}
                    className="p-2 bg-gray-100 hover:bg-gray-200"
                  >
                    <CalendarIcon />
                  </button>
                </div>
                {showDatePicker && (
                  <DatePicker
                    selected={value}
                    onChange={(date: Date | null) => {
                      onChange(date || new Date());
                      handleDateChange(date);
                    }}
                    minDate={new Date()}
                    inline
                  />
                )}
              </div>
            )}
          />
          {errors.date && <span className="text-red-500 text-sm">{errors.date.message}</span>}
        </div>

        <div className="flex flex-col gap-1 w-64">
          <label htmlFor="time" className="font-medium">Time</label>
          <div className="relative">
            <div className="flex items-center border rounded-md overflow-hidden">
              <input
                type="text"
                value={watch('time') || 'Select Time'}
                readOnly
                className="w-full p-2"
              />
              <button 
                type="button" 
                onClick={() => setShowTimeDropdown(!showTimeDropdown)}
                className="p-2 bg-gray-100 hover:bg-gray-200"
              >
                <Clock />
              </button>
            </div>
            {showTimeDropdown && (
              <div className="absolute z-10 mt-1 bg-white border border-gray-300 rounded-md shadow-lg p-2 w-full">
                <div className="grid grid-cols-3 gap-2">
                  {availableTimeSlots.map((slot) => (
                    <button
                      key={slot}
                      type="button"
                      onClick={() => handleTimeSelect(slot)}
                      className="p-2 border rounded-md hover:bg-gray-100 bg-blue-100"
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

        <div className="flex flex-col gap-1 w-64">
          <label htmlFor="numberOfPeople" className="font-medium">Number of People</label>
          <div className="flex items-center">
            <button 
              type="button" 
              onClick={() => handleNumberOfPeopleChange(-1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-l-md"
            >
              <Minus size={16} />
            </button>
            <input
              type="number"
              id="numberOfPeople"
              {...register('numberOfPeople', { valueAsNumber: true })}
              className="p-2 border-t border-b w-full text-center"
              readOnly
            />
            <button 
              type="button" 
              onClick={() => handleNumberOfPeopleChange(1)}
              className="p-2 bg-gray-100 hover:bg-gray-200 rounded-r-md"
            >
              <Plus size={16} />
            </button>
          </div>
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