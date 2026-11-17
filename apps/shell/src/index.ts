// Async boundary: Module Federation must negotiate shared modules before any
// app code runs, so the real entry is loaded dynamically.
import('./bootstrap');
