'use client';

import { useEffect } from 'react';
import { useFormState, useFormStatus } from 'react-dom';
import { addFruit } from '@/app/actions/fruits';
import { useRouter } from 'next/navigation';

const SubmitButton = () => {
    const { pending } = useFormStatus();

    return <button type="submit" disabled={pending} className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors">{pending ? "Adding..." : "Add Fruit"}</button>

}

const AddFruitForm = () => {
    const router = useRouter();
    const [ state, formAction ] = useFormState(addFruit, null);

    const handleSubmit = () => {
        if (state?.success) {
            router.push('/fruits');
        }
    }

    useEffect(handleSubmit, [state]);

    return <form action={formAction} className="flex flex-col gap-4"></form>
}

