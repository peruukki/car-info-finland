class Utils {
  static renderPercentage(count: number, total: number): string {
    const percentage = (count / total) * 100;
    const decimalCount = percentage > 0 && percentage < 1 ? 1 : 0;
    return `${percentage.toFixed(decimalCount)} %`;
  }
}

export = Utils;
