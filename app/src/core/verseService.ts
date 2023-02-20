import { Verse } from "../typings/types";

export async function getVerses(qtd:Number = 1): Promise<Array<Verse>> {
    const response = await fetch(`http://localhost:8000?qtd=${qtd}`);
    return await response.json();
}