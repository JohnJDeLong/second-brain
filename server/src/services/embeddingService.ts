import OpenAI from "openai";

const openai = new OpenAI(); 

export const generateEmbedding  = async (content: string): Promise<number[]> => {
 const cleanedContent = content.replace(/\n/g, " ").trim();
 if (!cleanedContent) {
    return []
 }
 const response = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: cleanedContent,
    encoding_format: 'float',
 });
 return response.data[0].embedding;
};