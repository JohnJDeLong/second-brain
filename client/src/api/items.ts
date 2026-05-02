const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const getItems = async (token: string) => {
  const response = await fetch(`${API_BASE_URL}/items`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch items");
  }

  return data;
};

export const getItemById = async(token: string, id: string) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`,{
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json(); 

  if (!response.ok){ 
    throw new Error(data.error || 'Failed to fetch item');
  }
  return data;
};

export const updateItemNote = async (token: string, id: string, userNote: string) => {
  const response = await fetch(`${API_BASE_URL}/items/${id}`, {
    method: "PATCH", 
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ userNote }),
  });

  const data = await response.json(); 

  if (!response.ok) { 
    throw new Error (data.error || "Failed to update item note"); 
  }
  return data; 
};
