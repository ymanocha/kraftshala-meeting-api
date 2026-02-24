export interface CreateMeetingDTO {
  title: string
  description?: string
  startTime: string
  endTime: string
  userId: number
}