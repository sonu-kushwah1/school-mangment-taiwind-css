import { promises as fs } from "fs";
import path from "path";

const filePath = path.join(process.cwd(), "data/submissions.json");

async function readData() {
  try {
    const data = await fs.readFile(filePath, "utf-8");
    return JSON.parse(data);
  } catch {
    return [];
  }
}

async function writeData(data: any[]) {
  await fs.mkdir(path.dirname(filePath), { recursive: true });
  await fs.writeFile(filePath, JSON.stringify(data, null, 2));
}

export async function GET() {
  const submissions = await readData();
  return Response.json(submissions);
}

export async function POST(req: Request) {
  const body = await req.json();

  const submissions = await readData();

  const newSubmission = {
    id: Date.now(),
    ...body,
  };

  submissions.push(newSubmission);

  await writeData(submissions);

  return Response.json(newSubmission);
}