import { reactive } from "vue";
import data from "@/data.json";

export const libraryStore = reactive({
  authors: data.authors,
  publishers: data.publishers,
  books: data.books,

  getBookById(id) {
    return this.books.find(b => b.id === Number(id));
  },

  addBook(book) {
    this.books.push(book);
  },

  updateBook(id, updated) {
    const index = this.books.findIndex(b => b.id === Number(id));
    if (index !== -1) {
      this.books[index] = { ...this.books[index], ...updated };
    }
  },

  getNextBookId() {
    if (!this.books.length) return 1;
    return Math.max(...this.books.map(b => b.id)) + 1;
  },

  getAuthorById(id) {
    return this.authors.find(a => a.id === Number(id));
  },

  addAuthor(author) {
    this.authors.push(author);
  },

  updateAuthor(id, updated) {
    const idx = this.authors.findIndex(a => a.id === Number(id));
    if (idx !== -1) {
      this.authors[idx] = { ...this.authors[idx], ...updated };
    }
  },

  getNextAuthorId() {
    return this.authors.length
      ? Math.max(...this.authors.map(a => a.id)) + 1
      : 1;
  },
});
