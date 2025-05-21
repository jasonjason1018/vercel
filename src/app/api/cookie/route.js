import { NextRequest, NextResponse } from 'next/server';

export async function POST() {
    const response = NextResponse.json({ success: true });
    
    response.cookies.delete('id_account', {
        path: '/',
      });

    return response;
}
