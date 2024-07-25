export const generateTimeSlots = (selectedDate: Date): string[] => {
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
  

