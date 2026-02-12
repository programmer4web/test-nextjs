import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import fruits from '@/data/fruits.json';

const FruitDetailPage = async ({ params } : { params: Promise<{ id: string }> }) => {
    const { id } = await params;

    const fruit = fruits.find(f => f.id === id);
    if (!fruit) {
        return notFound();
    }

    return <div className="w-full max-w-2xl mx-auto p-8">
        <h1>{fruit.label}</h1>
        <p>{fruit.category}</p>
    </div>
}

export default FruitDetailPage;