

export const generateSummary  = async (content: string): Promise<string> => {
    return `Summary placeholder for: ${content.slice(0, 100)}...`;
};

export const generateTags = async (_content: string): Promise<string[]> => {
    return ['auth', 'express', 'jwt']; 
};