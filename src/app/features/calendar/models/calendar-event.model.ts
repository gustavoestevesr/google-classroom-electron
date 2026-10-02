export interface CalendarEvent {
  id: number;
  title: string;
  startsAt: Date;
  endsAt?: Date;
  classId?: number;
}
