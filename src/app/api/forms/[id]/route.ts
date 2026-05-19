// app/api/forms/[id]/route.ts

import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/forms.json");

async function readForms() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeForms(forms: any[]) {
  await fs.writeFile(filePath, JSON.stringify(forms, null, 2));
}

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const body = await req.json();
  const forms = await readForms();

  const updated = forms.map((f: any) =>
    f.id === Number(params.id) ? { ...f, ...body } : f
  );

  await writeForms(updated);

  return Response.json({ success: true });
}

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const forms = await readForms();

  const filtered = forms.filter((f: any) => f.id !== Number(params.id));

  await writeForms(filtered);

  return Response.json({ success: true });
}