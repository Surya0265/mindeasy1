const elevenlabsService = require('./services/elevenlabsService');
const path = require('path');
const fs = require('fs');
require('dotenv').config();

async function runTest() {
  console.log('🚀 Starting ElevenLabs Integration Test...\n');

  // 1. Validate API Key
  const isValid = elevenlabsService.validateApiKey();
  if (!isValid) {
    console.error('❌ API Key validation failed. Please check your .env file.');
    process.exit(1);
  }

  try {
    // 2. Test Voice List
    console.log('📂 Fetching available voices...');
    const voices = await elevenlabsService.getSupportedVoices();
    console.log(`✅ Found ${voices.length} voices.`);
    console.log(`Sample: ${voices[0].name} (${voices[0].id})\n`);

    // 3. Test TTS
    const testText = 'Hello! I am MindEase, your mental health companion. This is a test of the ElevenLabs Text to Speech service.';
    const outputPath = path.join(__dirname, 'public', 'test_tts.mp3');
    
    console.log('🎙️  Testing Text-to-Speech...');
    await elevenlabsService.textToSpeech(testText, outputPath);
    if (fs.existsSync(outputPath)) {
      console.log(`✅ TTS Success! Audio saved to: ${outputPath}\n`);
    } else {
      throw new Error('TTS file was not created');
    }

    // 4. Test STT (Requires a sample file)
    console.log('📝 Testing Speech-to-Text (Scribe)...');
    // We use the file we just created for a loopback test if possible, 
    // though Scribe usually expects better quality than a synthetic voice sometimes, 
    // it's a good programmatic test.
    const transcription = await elevenlabsService.transcribeAudio(outputPath);
    console.log(`✅ STT Success! Transcribed text: "${transcription}"\n`);

    console.log('✨ All tests passed! ElevenLabs is ready to use.');
  } catch (error) {
    console.error('❌ Test failed:', error.message);
    if (error.response?.data) {
      console.error('Error Details:', error.response.data.toString());
    }
  }
}

runTest();
