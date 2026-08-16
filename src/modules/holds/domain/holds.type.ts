export type HOLD_STATUS = 'WAITING' | 'FULFILLED' | 'CANCELLED'
export type CreateHoldInput = {
  userId: string
  bookId: string
}

export type NewHold = CreateHoldInput & {
  status: HOLD_STATUS
  requestedAt: Date
}

export type Hold = NewHold & {
  id: string
}
