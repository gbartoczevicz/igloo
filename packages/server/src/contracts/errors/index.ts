export abstract class AppError extends Error {
  abstract toRaw(): unknown;
}
