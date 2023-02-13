/**
 * Microseconds resolution timer.
 *
 * @returns function which stop timer.
 */
export const startTimerMs = () => {
  const start = process.hrtime();

  return () => {
    const [seconds, nanoseconds] = process.hrtime(start);

    return seconds * 1000 + nanoseconds / 1e6;
  };
};
