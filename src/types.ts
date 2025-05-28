export interface BaseResponse <T> {
  total_count: number
  items: T[]
}
