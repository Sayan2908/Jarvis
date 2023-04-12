export const sendTextToOpenAi = async (userText : string) : Promise<string> => {
    const response = await fetch("/api/openai",{
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ userText })
    });
    const { message } = await response.json();
    console.log("message recieved");
    console.log(message);
    return message;
}