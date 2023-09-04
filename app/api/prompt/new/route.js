import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";

export const POST = async (req) => {
    const {prompt,userId ,tag}= await req.json();
    console.log(userId);
    console.log(prompt);
    console.log(tag);
    
    try {
        await connectToDB();

        const promptObj = {
            creator: userId,
            prompt,
            tag
        }
        const newPrompt =  new Prompt(promptObj)

        await newPrompt.save();
        return new Response(JSON.stringify(newPrompt), {status:200})
    } catch (error) {
        console.log(error)
        return new Response(JSON.stringify('Prompt creation failed'), {status:500})
    }
}
