
export const formatSearchResult = (item: any, score: number) => ({
  id: item.id,
  title: item.title,
  url: item.url,
  userNote: item.userNote,
  aiSummary: item.aiSummary,
  createdAt: item.createdAt,
  updatedAt: item.updatedAt,
  tags: item.tags.map((itemTag: any) => itemTag.tag.name),
  score,
});

export const formatChatSource = (item: any, score: number) => ({
  id: item.id,
  title: item.title,
  url: item.url,
  userNote: item.userNote,
  aiSummary: item.aiSummary,
  tags: item.tags.map((itemTag: any) => itemTag.tag.name),
  score,
});

