export type CreateLoanInput = {
  bookId: string
  userId: string
}

export type NewLoan = CreateLoanInput & {
  dueDate: Date
  returnDate: Date | null
  overDue: boolean
}

export type Loan = NewLoan & { id: string; loanDate: Date }

let t: NewLoan = {}
