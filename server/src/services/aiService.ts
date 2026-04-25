import OpenAI from "openai";


const openai = new OpenAI(); 

export const generateSummary = async (content: string): Promise<string> => {
  const cleanedContent = content.replace(/\n/g, " ").trim();

  if (!cleanedContent) {
    return "No content available to summarize.";
  }

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You summarize saved web content for a personal knowledge app. " +
              "Write a concise, clear summary in 2 to 4 sentences. " +
              "Stay faithful to the provided content. Do not invent details.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text: `Summarize this content:\n\n${cleanedContent}`,
          },
        ],
      },
    ],
  });

  return (
    response.output_text?.trim() ||
    "I could not generate a summary for this content."
  );
};

export const generateTags = async (content: string): Promise<string[]> => {
  const cleanedContent = content.replace(/\n/g, " ").trim();

  if (!cleanedContent) {
    return [];
  }

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You generate concise tags for a personal knowledge app. " +
              "Return 3 to 5 short, useful topic tags based only on the provided content. " +
              "Tags should be lowercase, simple, and broad enough to help organize related saved items. " +
              "Do not invent topics that are not supported by the content.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              `Generate 3 to 5 relevant tags for this content.\n\n${cleanedContent}\n\n` +
              "Return only a comma-separated list of tags.",
          },
        ],
      },
    ],
  });

  const rawText =
    response.output_text?.trim() ||
    "";

  if (!rawText) {
    return [];
  }

  return [...new Set(
    rawText
      .split(",")
      .map(tag => tag.trim().toLowerCase())
      .filter(Boolean)
  )];
};