'use server';

import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

const addFruit = async (prevState: any, formData: FormData) => {
    const label = formData.get('label') as string;
    const value = formData.get('value') as string;
    const category = formData.get('category') as string;

    if (!label || !value || !category) {
        return {
            error: 'All fields are required'
        }
    }

    const filePath = path.join(process.cwd(), 'data', 'fruits.json');
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const fruits = JSON.parse(fileContent);

    const newFruit = {
        id: String(fruits.length + 1),
        label,
        value: value.toLowerCase().replace(/\s+/g, '-'),
        category,
    }

    fruits.push(newFruit);
    await fs.writeFile(filePath, JSON.stringify(fruits, null, 2));

    revalidatePath('/fruits');
    revalidatePath('/fruits/interactive');

    return {
        success: true,
        fruit: newFruit,
    }
}

export { addFruit };
