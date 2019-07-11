class Helpers {
  static async createId(arr) {
    const { length } = arr;
    if (length === 0) return 1;
    const id = arr[length - 1].id + 1;
    return id;
  }

  static capitalizeFirst(value) {
    try {
      if (!value || typeof value !== 'string') return value;
      const convertedToLowerCase = value.toLowerCase();
      const capitalized =
        convertedToLowerCase.charAt(0).toUpperCase() +
        convertedToLowerCase.slice(1);

      return capitalized;
    } catch (e) {
      return value;
    }
  }

  static capitalizeEachWord(value) {
    try {
      if (!value || typeof value !== 'string') return value;
      const splitedBySpace = value.split(' ');
      const formatEachWord = splitedBySpace.map(word => {
        const convertedToLowerCase = word.toLowerCase();
        const capitalized =
          convertedToLowerCase.charAt(0).toUpperCase() +
          convertedToLowerCase.slice(1);
        return capitalized;
      });
      const reCombinedWords = formatEachWord.join(' ');
      return reCombinedWords;
    } catch (e) {
      return value;
    }
  }
}
export default Helpers;
