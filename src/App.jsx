import React, { useState, useCallback, useEffect } from 'react';
import { Container, Box, IconButton, Typography, Select, MenuItem, Paper, Snackbar, Alert } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import translationService from './services/TranslationService';
import speechService from './services/SpeechService';

const LANGUAGES = [
  { code: 'en', name: 'English' },
  { code: 'es', name: 'Spanish' },
  { code: 'fr', name: 'French' },
  { code: 'de', name: 'German' },
  { code: 'it', name: 'Italian' },
  { code: 'ja', name: 'Japanese' },
  { code: 'ko', name: 'Korean' },
  { code: 'zh', name: 'Chinese' },
];

function App() {
  const [sourceLanguage, setSourceLanguage] = useState('en');
  const [targetLanguage, setTargetLanguage] = useState('es');
  const [isListening, setIsListening] = useState(false);
  const [originalText, setOriginalText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
  const [error, setError] = useState('');
  const [isTranslating, setIsTranslating] = useState(false);
  const [speechServiceInstance, setSpeechServiceInstance] = useState(null);

  useEffect(() => {
    try {
      setSpeechServiceInstance(speechService);
    } catch (err) {
      setError('Speech recognition is not supported in your browser. Please try using Chrome, Edge, or Safari.');
    }
  }, []);

  const handleSpeechResult = useCallback(async (text) => {
    try {
      setOriginalText(text);
      setIsTranslating(true);
      const translation = await translationService.translateText(text, targetLanguage, sourceLanguage);
      setTranslatedText(translation);
      await speechService.speak(translation, targetLanguage);
    } catch (err) {
      setError('Translation failed. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  }, [sourceLanguage, targetLanguage]);

  const handleSpeechError = useCallback((event) => {
    setError('Speech recognition error. Please try again.');
    setIsListening(false);
  }, []);

  const handleMicClick = () => {
    if (!speechServiceInstance) {
      setError('Speech service is not initialized. Please try using a supported browser.');
      return;
    }

    if (isListening) {
      speechServiceInstance.stopListening();
      setIsListening(false);
    } else {
      try {
        speechServiceInstance.startListening(sourceLanguage, handleSpeechResult, handleSpeechError);
        setIsListening(true);
      } catch (err) {
        setError('Could not access microphone. Please check permissions.');
      }
    }
  };

  useEffect(() => {
    return () => {
      if (speechServiceInstance) {
        speechServiceInstance.stopListening();
        speechServiceInstance.cancelSpeaking();
      }
    };
  }, []);

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4, display: 'flex', flexDirection: 'column', gap: 3 }}>
        <Typography variant="h4" component="h1" align="center" gutterBottom>
          Real-Time Voice Translator
        </Typography>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: 2 }}>
          <Select
            value={sourceLanguage}
            onChange={(e) => setSourceLanguage(e.target.value)}
            fullWidth
          >
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>

          <Select
            value={targetLanguage}
            onChange={(e) => setTargetLanguage(e.target.value)}
            fullWidth
          >
            {LANGUAGES.map((lang) => (
              <MenuItem key={lang.code} value={lang.code}>
                {lang.name}
              </MenuItem>
            ))}
          </Select>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <IconButton
            color={isListening ? 'error' : 'primary'}
            sx={{ width: 80, height: 80 }}
            onClick={handleMicClick}
          >
            <MicIcon sx={{ fontSize: 40 }} />
          </IconButton>
        </Box>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Original Text:
          </Typography>
          <Typography paragraph>{originalText || 'Speak something...'}</Typography>
        </Paper>

        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="subtitle1" gutterBottom>
            Translated Text:
          </Typography>
          <Typography paragraph>
            {isTranslating ? 'Translating...' : (translatedText || 'Translation will appear here...')}
          </Typography>
        </Paper>

        <Snackbar open={!!error} autoHideDuration={6000} onClose={() => setError('')}>
          <Alert onClose={() => setError('')} severity="error" sx={{ width: '100%' }}>
            {error}
          </Alert>
        </Snackbar>
      </Box>
    </Container>
  );
}

export default App;