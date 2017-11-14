import truncateText from '../../utils/truncateText';

describe('notification', () => {
  it('should throw an error if original text is not a string', () => {
    const numberOriginalText = 4000;
    const callTruncateText = () => {
      truncateText(numberOriginalText, 50);
    };
    expect(callTruncateText)
      .toThrow(`${numberOriginalText} is not of type 'string'`);
  });

  it('should throw an error if desiredLength is not a number', () => {
    const originalText = 'some very long but not so long random text';
    const callTruncateText = () => {
      truncateText(originalText);
    };
    expect(callTruncateText)
      .toThrow('desiredLength is not of type \'number\'');
  });

  // if text is not up to desired length
  it('should return original text if its length is not up to desired length', () => {
    const originalText = 'a very long but not up to desired text';
    expect(truncateText(originalText, originalText.length + 20))
      .toBe(originalText);
  });
  it('should return original text if its length is not up to desired length', () => {
    const originalText = 'some very long but not so long random text';
    expect(truncateText(originalText, originalText.length - 3))
      .toBe(`${originalText.slice(0, (originalText.length - 3) - 3).trim()}...`);
  });
});
