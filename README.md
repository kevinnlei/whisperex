## Example

- Uses whisper to transcribe audio
- Then GPT4 to return final output

For GPT3.5K, improving the prompt is needed

```
Yeah, my email is jinyijeng at gmail dot com g i n n i e j e n g at gmail dot com
parsed email: ginniejeng@gmail.com
My email is kevinlei at gmail dot com K-E-V-I-N L-E-I at gmail dot com Oh wait, just kidding, it's kevinlei9159 at gmail dot com So it's K-E-V-I-N L-E-I 9159 at gmail dot com
parsed email: kevinlei9159@gmail.com
```

## Running

```
npm i
```

```
npm run start
```

```
cp .env.example .env
```

Make sure .env has:

```
OPENAI_API_KEY=
```
