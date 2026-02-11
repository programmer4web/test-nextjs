import { NextResponse } from 'next/server';
import fruitsData from '@/data/fruits.json';

// Force dynamic rendering - disable caching
export const dynamic = 'force-dynamic';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get('q') || '';

    // Simulate a small delay to mimic database query
    await new Promise(resolve => setTimeout(resolve, 100));

    // Filter fruits based on query
    const filtered = fruitsData.filter(fruit =>
      fruit.label.toLowerCase().includes(query.toLowerCase()) ||
      fruit.category.toLowerCase().includes(query.toLowerCase())
    );

    return NextResponse.json(filtered);
  } catch (error) {
    console.error('Error fetching fruits:', error);
    return NextResponse.json(
      { error: 'Failed to fetch fruits' },
      { status: 500 }
    );
  }
}
