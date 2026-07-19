# 🤖 09 — Multi-Modal AI: Text, Image & Audio

> 🔴 Advanced | Prereq: 01, 04 | ~9 min

Modern AI models (GPT-4o, Claude 3.5, Gemini 2.0) process text, images, and audio natively — not as separate pipelines. Multi-modal AI unlocks use cases no text-only model can handle: visual Q&A, document understanding, voice interfaces, and rich content generation.

---

## 9.1 Multi-Modal Model Landscape (2026)

| Model | Modalities In | Modalities Out | Best For |
|-------|--------------|----------------|----------|
| **GPT-4o** | Text, Image, Audio | Text, Image, Audio | Real-time voice, vision Q&A, creative |
| **GPT-4o-mini** | Text, Image | Text | Cost-effective vision tasks |
| **Claude 3.5 Sonnet** | Text, Image | Text | Document analysis, charts, UI review |
| **Gemini 2.0 Flash** | Text, Image, Audio, Video | Text, Image | Video understanding, long-context multimodal |
| **Claude Opus 4** | Text, Image | Text | Complex visual reasoning, multi-page docs |

## 9.2 Image Understanding Patterns

```ts
// Pattern 1: Visual Q&A — ask questions about images
const visualQA = await llm.complete({
  model: 'gpt-4o',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'What UI issues do you see in this screenshot? List WCAG violations.' },
      { type: 'image_url', image_url: { url: screenshotBase64 } }
    ]
  }]
});

// Pattern 2: Multi-image comparison
const comparison = await llm.complete({
  model: 'claude-3.5-sonnet',
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Compare these two dashboard designs. Which is better for data density and why?' },
      { type: 'image_url', image_url: { url: designABase64 } },
      { type: 'image_url', image_url: { url: designBBase64 } }
    ]
  }]
});

// Pattern 3: Document understanding (PDF, screenshot, scan)
const docAnalysis = await llm.complete({
  model: 'gemini-2.0-flash', // strong on long documents
  messages: [{
    role: 'user',
    content: [
      { type: 'text', text: 'Extract all action items and due dates from this meeting whiteboard photo.' },
      { type: 'image_url', image_url: { url: whiteboardPhoto } }
    ]
  }]
});
```

## 9.3 Audio & Voice Integration

| Capability | Model | Latency | Use Case |
|-----------|-------|---------|----------|
| **Speech-to-Text** | Whisper (Open Source) | ~200ms/chunk | Transcription, voice commands |
| **Text-to-Speech** | OpenAI TTS / ElevenLabs | ~300ms | Voice responses, audiobooks |
| **Real-time Voice** | GPT-4o Realtime API | <500ms e2e | Voice agents, live translation |
| **Audio Understanding** | Gemini 2.0 Audio | ~1s | Audio analysis, meeting summarization |

```ts
// Real-time voice agent pattern (WebSocket)
const ws = new WebSocket('wss://api.openai.com/v1/realtime?model=gpt-4o-realtime');

ws.on('open', () => {
  // Send audio chunks as they come from the microphone
  mediaRecorder.ondataavailable = (chunk) => {
    ws.send(chunk.data); // raw PCM16 audio
  };
});

ws.on('message', (event) => {
  const response = JSON.parse(event.data);
  // Play audio response through speakers
  if (response.type === 'response.audio.delta') {
    audioPlayer.enqueue(response.delta); // stream TTS audio
  }
});
```

## 9.4 When to Use Which Modality

| Task | Best Modality | Why |
|------|--------------|-----|
| UI/UX review | Image | Screenshots capture visual design perfectly |
| Code review | Text | Code IS text; images add noise |
| Customer support | Text + Image | User sends error screenshot + description |
| Meeting notes | Audio → Text | Transcribe first, then analyze text |
| Design feedback | Image + Text | Show mockup + describe context |
| Data extraction from PDFs | Image (vision) | PDFs with complex layouts need visual parsing |
| Real-time tutoring | Audio + Image | Voice for conversation, image for diagrams |
| Accessibility audit | Image + Text | Screenshot for visual, text for code analysis |

## 9.5 Multi-Modal Prompt Engineering

```
TEXT-ONLY PROMPT → MULTI-MODAL PROMPT:

❌ "Summarize this document"
✅ Provide the document AS AN IMAGE (screenshot/scan). The model reads
   it visually — no OCR preprocessing needed.

❌ "What's in this picture?"
✅ "You are a UI auditor. Examine this screenshot for: (1) alignment
   issues, (2) inconsistent spacing, (3) color contrast problems,
   (4) missing hover states. Output a structured report."

❌ "Transcribe this audio"
✅ "Transcribe this meeting audio. Identify speakers if possible.
   Highlight: action items, decisions made, open questions.
   Format: markdown with speaker labels."
```

## 9.6 Cost Considerations

| Modality | Cost vs Text-Only | When to Use |
|----------|-------------------|-------------|
| Image input | 2-5x | Only when visual info is essential |
| Audio input | 3-10x | For voice-first use cases only |
| Image output (DALL-E) | $0.04-0.12/image | Sparingly; cache generated images |
| Real-time audio | 10-30x text | Only for interactive voice agents |

> **Rule:** Start text-only. Add modalities only when the use case genuinely requires them. A text description is often sufficient and 5x cheaper than an image upload.

## 9.7 Anti-Patterns

- **Image for everything** — uploading screenshots when a text log would work. Costs 5x more, adds latency.
- **No image optimization** — uploading 4K screenshots of a 200px UI element. Resize before sending.
- **Modal blindness** — assuming multi-modal = flawless. Models still hallucinate on images, especially fine details.
- **Audio without diarization** — transcribing multi-speaker audio with no speaker labels. Use Whisper's diarization or Gemini's speaker detection.

## 9.8 ICIL Cross-Ref

Builds on: `ai-integration/01` (prompts — now multi-modal), `ai-integration/04` (orchestration — voice agent loops)
Related: `conversational-ui/04` (VUI design), `conversational-ui/07` (multi-modal interfaces), `mobile-ux/06` (haptics — complements audio feedback)

## ⚡ Action Checklist

- [ ] Before adding image input: can a text description solve this equally well?
- [ ] Resize and compress images before sending to LLM APIs (max 1024px unless detail needed)
- [ ] For voice agents: use WebSocket streaming, not REST — latency matters
- [ ] Multi-modal prompts need MORE structure than text-only (explicit "examine for X, Y, Z")
- [ ] Test with diverse inputs: dark mode screenshots, low-light photos, handwritten text
- [ ] Cache image analysis results — same image re-analyzed = wasted tokens
