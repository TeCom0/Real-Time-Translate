class TranslationService {
  async translateText(text, targetLanguage, sourceLanguage = '') {
    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${sourceLanguage}|${targetLanguage}`
      );
      const data = await response.json();
      
      if (data.responseStatus === 200) {
        return data.responseData.translatedText;
      } else {
        throw new Error(data.responseDetails || 'Translation failed');
      }
    } catch (error) {
      console.error('Translation error:', error);
      throw new Error('Failed to translate text');
    }
  }

  async detectLanguage(text) {
    // MyMemory doesn't provide language detection
    // Defaulting to English if not specified
    return 'en';
  }
}

export default new TranslationService();