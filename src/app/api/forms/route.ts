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
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(forms, null, 2));
}

export async function GET() {
  const forms = await readForms();
  return Response.json(forms);
}

export async function POST(req: Request) {
  const body = await req.json();

  const forms = await readForms();

  const newForm = {
    id: Date.now(),
    ...body,
  };

  forms.push(newForm);

  await writeForms(forms);

  return Response.json(newForm);
}