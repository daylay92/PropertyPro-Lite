class Helpers {
  static async createId(arr) {
    const { length } = arr;
    if (length === 0) return 1;
    const id = arr[length - 1].id - 1;
    return id;
  }
}
export default Helpers;
