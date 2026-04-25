import OpenAI from "openai";

const openai = new OpenAI();

type GroundedSource = {
  id: string;
  title: string;
  url: string;
  userNote: string | null;
  aiSummary: string | null;
  tags: string[];
  score: number;
};

export const generateGroundedAnswer = async (query: string, sources: GroundedSource[]): Promise<string> => {
  if (!sources.length) {
    return `I could not find any strongly relevant saved items for "${query}".`;
  }

  const context = sources
    .map((source, index) => {
      return [
        `Source ${index + 1}:`,
        `Title: ${source.title}`,
        `URL: ${source.url}`,
        `Tags: ${source.tags.join(", ") || "None"}`,
        `User Note: ${source.userNote ?? "None"}`,
        `AI Summary: ${source.aiSummary ?? "None"}`,
      ].join("\n");
    })
    .join("\n\n---\n\n");

  const response = await openai.responses.create({
    model: "gpt-5.5",
    input: [
      {
        role: "system",
        content: [
          {
            type: "input_text",
            text:
              "You answer questions only using the provided saved-content sources. " +
              "Be concise, grounded, and honest. If the sources are insufficient, say so clearly. " +
              "Do not invent facts that are not supported by the provided sources.",
          },
        ],
      },
      {
        role: "user",
        content: [
          {
            type: "input_text",
            text:
              `User question:\n${query}\n\n` +
              `Saved content sources:\n${context}\n\n` +
              "Answer the question using only the saved content above.",
          },
        ],
      },
    ],
  });

  return response.output_text?.trim() || "I could not generate a grounded answer from the retrieved sources.";
};