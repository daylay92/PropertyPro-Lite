class Helpers {
  static toSmallLetters(value) {
    return value.toLowerCase();
  }

  static capitalize(value) {
    try {
      if (!value || typeof value !== 'string') return value;
      const splitedBySpace = value.split(' ');
      const formatEachWord = splitedBySpace.map(word => {
        const convertedToLowerCase = word.toLowerCase();
        const capitalized =
          convertedToLowerCase.charAt(0).toUpperCase() + convertedToLowerCase.slice(1);
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
