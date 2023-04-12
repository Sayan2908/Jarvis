import { NextResponse } from "next/server";
import { Configuration, OpenAIApi } from "openai";

export async function GET(request: Request) {
    return new Response('Hello, Next.js and OpenAI!')
  }


  export async function POST(request: Request) {

    const configuration = new Configuration({
      organization : "org-bY9TVOcyzklTUt99o8WqJROr",
      apiKey: "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",
    });
    console.log(configuration);
    const openai = new OpenAIApi(configuration);

    const { userText } = await request.json();
    console.log("production");
    console.log(userText);

    const completion = await openai.createChatCompletion({
      model : "gpt-3.5-turbo",
      messages : [{ role: "user", content: "Who is the creator of three js" }],
    });

    const aiMessage = completion.data.choices[0].message;

    return NextResponse.json({message: aiMessage?.content},{status : 200});
  }