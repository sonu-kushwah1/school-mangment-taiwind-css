"use client";

import { useRouter } from "next/navigation";
import Button from "@/component/buttonCom";

interface PageHeaderProps {
  title: string;
  buttonText?: string;
  buttonLink?: string;
}

export default function PageHeader({
  title,
  buttonText,
  buttonLink,
}: PageHeaderProps) {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center mb-4">
      <h1 className="text-2xl font-bold">{title}</h1>

      {buttonText && buttonLink && (
        <Button
          onClick={() => router.push(buttonLink)}
          text={buttonText}
        />
      )}
    </div>
  );
}