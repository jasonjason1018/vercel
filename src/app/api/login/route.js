import { NextRequest, NextResponse } from 'next/server';
import prisma from '../../../../lib/prisma'; // 或 '../../lib/prisma' 看你的路徑

export async function POST(req) {
  const { username, password } = await req.json();

  const account = await prisma.account.findFirst({
    where: { username, password }, // 實務上要用 bcrypt 加密比對
  });

  if (account) {
    const response = NextResponse.json({ success: true });

    response.cookies.set('id_account', account.id, {
        httpOnly: true,
        path: '/',
    });

    return response;
  } else {
    return NextResponse.json({ success: false, message: 'Invalid credentials' }, { status: 401 });
  }
}
