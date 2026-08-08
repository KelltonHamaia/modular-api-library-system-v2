export type CreateBookInput = {
  title: string
  author: string
  totalCopies: number
}
export type NewBook = CreateBookInput & { availableCopies: number }
export type Book = NewBook & { id: string }
