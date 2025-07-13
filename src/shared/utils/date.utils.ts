export class DateUtils {
  static getCurrentDateByUTCoffset = (offsetHours: number): Date => {
    const now = Date.now();
    const adjusted = now + offsetHours * 60 * 60 * 1000;
    return new Date(adjusted);
  };
}
