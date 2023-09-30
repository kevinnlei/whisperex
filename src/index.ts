import * as fs from 'fs';
import * as path from 'path';

import OpenAI from 'openai';
import { config } from 'dotenv';

config();

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const prompt = `
I'm going to give you a transcribed audio file which has a user spelling out their email.
The audio file doesn't filler words but has been removed.

Users are asked to "spell out" their email. Make no assumptions about how emails are formatted, outside of the fact that domain names should be valid. Always prefer the spelled out version.

For example, if you hear "b o b s m i t h at gmail" don't assume it's bob.smith@gmail but rather bobsmith@gmail.com.

Consider the flow of the conversation, then return only the email. Here is the transcription:
`

// Transcribe audio
async function transcribeAudio(filename: string): Promise<string> {
  try {
    const transcript = await openai.audio.transcriptions.create({
      // https://huggingface.co/spaces/openai/whisper/discussions/30
      prompt: "So uhm, yeaah. Okay, ehm, uuuh",
      file: fs.createReadStream(filename),
      model: 'whisper-1',
    });
    return transcript.text;
  } catch (error) {
    console.error('Error during transcription:', error);
    throw error; // or return a default message or handle error accordingly
  }
}

async function getEmail(transription: string): Promise<string> {
  const completion = await openai.chat.completions.create({
    messages: [
      { role: 'system', content: prompt },
      {role: 'user', content: transription}],
    model: 'gpt-4',
    temperature: 0,
  });
  return completion.choices[0].message.content || '';
}

(async () => {
  const rootDirectory = process.cwd();

  const first = await transcribeAudio(path.join(rootDirectory, 'email.m4a'));
  console.log(first);
  console.log(`parsed email: ${await getEmail(first)}`);


  const second = await transcribeAudio(path.join(rootDirectory, 'email2.m4a'));
  console.log(second);
  console.log(`parsed email: ${await getEmail(second)}`);
})();
