import { Metadata } from 'next';
import AddFruitForm from './AddFruitForm';

const metadata: Metadata = {
    title: 'Add Fruit - Server Actions Demo',
    description: 'Learn Server Actions for form handling',
}

const AddFruitPage = () => {
    return <div className="w-full max-w-2xl mx-auto p-8">
        <h1 className="text-4xl font-bold mb-4 text-zinc-900 dark:text-zinc-50">Add New Fruit</h1>
        <p>This uses Server Actions</p>
        <AddFruitForm />
    </div>
}

export { metadata, AddFruitPage as default }