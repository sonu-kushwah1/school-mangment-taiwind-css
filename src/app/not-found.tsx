import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="text-center">

        <h1 className="text-6xl font-bold text-red-500">
          404
        </h1>

        <h2 className="text-2xl font-semibold mt-4">
          Page Not Found
        </h2>

        <p className="text-gray-600 mt-2">
          Sorry, the page you are looking for does not exist.
        </p>

        <Link
          href="/"
          className="inline-block mt-6 bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
        >
          Go Back Home
        </Link>

      </div>

    </div>
  );
}