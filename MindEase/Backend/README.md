# MindEase Backend

Express backend for MindEase voice assistant.

Current stack:

- STT: Groq Whisper (`whisper-large-v3`)
- LLM: Groq Chat Completions (`llama-3.3-70b-versatile`)
- TTS: Groq Orpheus (`canopylabs/orpheus-v1-english`) with chunked full-response playback

## Quick Start

1. Install dependencies

```bash
npm install
```

2. Create local environment file

Create `Backend/.env` (this file is gitignored):

```env
PORT=3000
GROQ_API_KEY=your_groq_api_key
MURF_API_KEY=your_murf_api_key_if_needed
NGROK_URL=
```

3. Start server

```bash
npm start
```

Server runs on `http://localhost:3000`.

## Core Routes

ESP32 compatibility routes:

- `POST /uploadAudio`
- `GET /checkVariable`
- `GET /broadcastAudio`

Web app routes:

- `POST /chat`
- `GET /journal`
- `POST /journal`
- `GET /list-voices`
- `GET /settings`
- `PUT /settings/voice`
- `PUT /settings/voice-config`
- `POST /settings/preview`
- `GET /status`
- `GET /health`

## Voice Notes

Supported voice ids include:

- `troy` (recommended male)
- `daniel`
- `austin`
- `autumn`
- `diana`
- `hannah`

Compatibility aliases:

- `nova` -> `autumn`
- `shimmer` -> `diana`

## Development Notes

- Runtime audio files are written to `Backend/tmp` and are not committed.
- Keep API keys in `.env` only.
- Use `.env.example` in future if you want to share a template safely.

## ngrok (optional)

If ESP32 is not on the same network, run a tunnel:

```bash
npx ngrok http 3000
```

Then set your ESP32 backend URL to the ngrok HTTPS forwarding URL.

---

## 🐛 Troubleshooting

### Issue: ngrok won't start

**Solution:**

- Verify auth token: `ngrok authtoken YOUR_TOKEN`
- Check if port 3000 is in use: `npm start` first
- Make sure Node.js server is running

### Issue: ESP32 can't connect to ngrok URL

**Solution:**

- Verify ngrok URL is correct
- Check ESP32 WiFi is connected
- Ensure ngrok tunnel is still running (they expire after ~2 hours if free plan)
- Add `&` at end of ngrok command to keep it running: `ngrok http 3000 &`

### Issue: "ELEVENLABS_API_KEY not found"

**Solution:**

- Verify `.env` file has correct key
- Restart server after changing `.env`: `npm start`
- Make sure there are no spaces in the key

### Issue: "Audio file is empty"

**Solution:**

- Ensure ESP32 is recording properly
- Check audio buffer in ESP32 code
- Verify Content-Type header is `application/octet-stream`

### Issue: Groq API returns error

**Solution:**

- Verify `GROQ_API_KEY` in `.env`
- Check if quota is exhausted
- Test with cURL: `curl -X POST http://localhost:3000/uploadAudio --data-binary @test.wav`

---

## 📦 Dependencies

```json
{
  "axios": "HTTP client for API calls",
  "express": "Web framework",
  "cors": "CORS middleware",
  "dotenv": "Environment variables",
  "form-data": "File uploads",
  "express-async-errors": "Async error handling",
  "localtunnel": "Alternative to ngrok",
  "ngrok": "Public URL tunnel"
}
```

---

## 🎯 Next Steps

1. ✅ `npm install` - Install dependencies
2. ✅ Configure `.env` with API keys
3. ✅ `npm start` - Start server
4. ✅ `ngrok http 3000` - Create tunnel (in another terminal)
5. ✅ Copy ngrok URL to ESP32 code
6. ✅ Upload audio from ESP32 and test!

---

## 📝 Notes

- **ngrok free tier** expires after ~2 hours. Restart the tunnel if needed.
- **Response files** are saved to `tmp/` directory
- **Console logs** show detailed STT/TTS/LLM status
- **All APIs** support both localhost and ngrok URLs

---

## 🚀 Production Deployment

For production, consider:

- Using ngrok paid plan (stable URLs)
- Deploying to cloud (AWS, GCP, Azure, Heroku)
- Using environment-specific configs
- Adding authentication/API keys
- Setting up logging and monitoring

---

## 📚 Resources

- [ElevenLabs Docs](https://elevenlabs.io/docs)
- [Groq API Docs](https://console.groq.com/docs)
- [ngrok Documentation](https://ngrok.com/docs)
- [Express.js Guide](https://expressjs.com/)

---

**Backend Version:** ElevenLabs Edition
**Last Updated:** 2026-03-25
