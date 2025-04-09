export function getDateRangeForNextWeek() {
  const today = new Date();
  const nextWeek = new Date();

  nextWeek.setDate(today.getDate() + 7);

  const todayString = today.toISOString().split('T')[0];
  const nextWeekString = nextWeek.toISOString().split('T')[0];

  return { todayString, nextWeekString };
}

export function getTodayDate() {
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  return todayString;
}