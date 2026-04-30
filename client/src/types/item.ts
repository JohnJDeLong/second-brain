export type Item = {
  id: string;
  title: string;
  url: string;
  rawContent: string;
  selectedText: string | null;
  userNote: string | null;
  aiSummary: string | null;
  processingStatus: "pending" | "completed" | "failed";
  createdAt: string;
  updatedAt: string;
  tags: string[];
};