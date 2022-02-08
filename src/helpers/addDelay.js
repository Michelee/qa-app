export function addDelay() {
  return new Promise((resolve) =>
    setTimeout(() => resolve(), 5000)
  );
}
