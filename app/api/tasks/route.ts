import { NextResponse } from "next/server";
import prisma from "../../../lib/prisma";

// 取得所有任務 (Read)
export async function GET() {
  const tasks = await prisma.task.findMany();
  return NextResponse.json(tasks);
}

// 創建新任務 (Create)
export async function POST(req: Request) {
  const { text } = await req.json();
  const newTask = await prisma.task.create({
    data: { text, completed: false, createdAt: new Date() },
  });
  return NextResponse.json(newTask, { status: 201 });
}

// 更新任務 (Update)
export async function PUT(req: Request) {
  const { id, completed } = await req.json();
  const updatedTask = await prisma.task.update({
    where: { id: Number(id) },
    data: { completed },
  });
  return NextResponse.json(updatedTask);
}

// 刪除任務 (Delete)
export async function DELETE(req: Request) {
  const { id } = await req.json();
  await prisma.task.delete({ where: { id: Number(id) } });
  return NextResponse.json({ message: "Task deleted" }, { status: 204 });
}
