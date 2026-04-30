import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { getItemById } from "../api/items";
import type { Item } from "../types/item";


export default function ItemDetailPage() {
    const navigate = useNavigate(); 
    const { id } = useParams(); 

    const [item, setItem] = useState<Item | null>(null); 
    const [error, setError] = useState(''); 
    const [isLoading, setIsLoading] = useState(true); 
    useEffect(() => {
        const loadItem = async () => {
            const token = localStorage.getItem('token');

            if (!token) { 
                navigate('/login');
                return;
            }

            if (!id) {
                setError("Item ID is missing"); 
                setIsLoading(false); 
                return; 
            }

            try { 
                const data = await getItemById(token, id); 
                setItem(data.item); 
            } catch (error) {
                setError(error instanceof Error ? error.message : "Failed to load item");
            } finally {
                setIsLoading(false);
            }
        };
        loadItem(); 
    },[id,navigate]);

    if (isLoading) {
        return <main>Loading item...</main>
    }

    if (error) {
        return <main>{error}</main>
    }

    if (!item) {
        return <main>Item not found.</main>
    }

    return (
        <main>
            <p>
                <Link to="/dashboard">← Back to dashboard</Link>
            </p>

            <h1>{item.title}</h1>

            <p>
                <strong>Status:</strong> {item.processingStatus}
            </p>

            <p>
                <strong>Summary:</strong> {item.aiSummary || "No summary available."}
            </p>

            {item.userNote && (
                <p>
                <strong>Note:</strong> {item.userNote}
                </p>
            )}

            {item.selectedText && (
                <p>
                <strong>Selected text:</strong> {item.selectedText}
                </p>
            )}

            {item.tags.length > 0 && (
                <p>
                <strong>Tags:</strong> {item.tags.join(", ")}
                </p>
            )}

            <p>
                <a href={item.url} target="_blank" rel="noreferrer">
                Open source
                </a>
            </p>
        </main>

    );
}