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

  static toInt(value) {
    return parseInt(value, 10);
  }

  static serverInternalError(res, msg = undefined) {
    return res.status(500).json({
      status: '500 Server Interval Error',
      error: msg || 'Something went wrong while processing your request, Do try again'
    });
  }
}
export default Helpers;
