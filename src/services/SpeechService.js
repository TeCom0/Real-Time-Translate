class SpeechService {
  constructor() {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (!SpeechRecognition) {
      throw new Error('Speech recognition is not supported in this browser');
    }
    try {
      this.recognition = new SpeechRecognition();
      this.synthesis = window.speechSynthesis;
      if (!this.synthesis) {
        throw new Error('Speech synthesis is not supported in this browser');
      }
      this.setupRecognition();
    } catch (error) {
      console.error('Failed to initialize speech services:', error);
      throw error;
    }
  }

  setupRecognition() {
    this.recognition.continuous = true;
    this.recognition.interimResults = true;
  }

  startListening(language, onResult, onError) {
    if (!this.recognition) {
      throw new Error('Speech recognition is not initialized');
    }
    this.recognition.lang = language;
    this.recognition.onresult = (event) => {
      const result = event.results[event.results.length - 1];
      if (result.isFinal) {
        onResult(result[0].transcript);
      }
    };
    this.recognition.onerror = onError;
    this.recognition.start();
  }

  stopListening() {
    if (this.recognition) {
      this.recognition.stop();
    }
  }

  speak(text, language) {
    if (!this.synthesis) {
      throw new Error('Speech synthesis is not initialized');
    }
    return new Promise((resolve, reject) => {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = language;
      utterance.onend = resolve;
      utterance.onerror = reject;
      this.synthesis.speak(utterance);
    });
  }

  cancelSpeaking() {
    if (this.synthesis) {
      this.synthesis.cancel();
    }
  }
}

// Create a singleton instance
const speechService = new SpeechService();
export default speechService;