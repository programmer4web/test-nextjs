'use client';

import { useActionState, useEffect } from 'react';
import { useFormStatus } from 'react-dom';
import { addFruit } from '@/app/actions/fruits';
import { useRouter } from 'next/navigation';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{pending ? "Adding..." : "Add Fruit"}</button>

}

const AddFruitForm = () => {
    const router = useRouter();
    const [ state, formAction ] = useActionState(addFruit, null);

    const handleSubmit = () => {
        if (state?.success) {
            router.push('/fruits');
        }
    }

    useEffect(handleSubmit, [state]);

    return <form action={formAction} className="flex flex-col gap-4">
        <div>
            <label htmlFor="label" className="block text-sm font-medium text-zinc-700 mb-1">Fruit Name</label>
            <input name="label" id="label" type="text" className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></input>
        </div>
        <div>
            <label htmlFor="value" className="block text-sm font-medium text-zinc-700 mb-1">Value</label>
            <input name="value" id="value" type="text"  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></input>
        </div>
        <div>
            <label htmlFor="category" className="block text-sm font-medium text-zinc-700 mb-1">Category</label>
            <input name="category" id="category" type="text"  className="w-full px-4 py-2 border border-zinc-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500" required></input>
        </div>
        {state?.error && <p className='text-red-600 text-sm'>{state.error}</p>}
        <SubmitButton />
    </form>
}

export default AddFruitForm;
