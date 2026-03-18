"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import LayoutWrapper from "@/component/Layout";

interface Post {
  id: number;
  userId: number;
  title: string;
  body: string;
}

export default function PostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          "https://jsonplaceholder.typicode.com/posts"
        );
        setPosts(response.data);
      } catch (err) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  return (
    <LayoutWrapper>
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Posts List
      </h1>

      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}

      <div className="overflow-x-auto">
        <table className="w-full border border-gray-300">
          <thead className="bg-gray-200">
            <tr>
              <th className="border p-2">ID</th>
              <th className="border p-2">User ID</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Body</th>
            </tr>
          </thead>

          <tbody>
            {posts.map((post) => (
              <tr key={post.id}>
                <td className="border p-2">{post.id}</td>
                <td className="border p-2">{post.userId}</td>
                <td className="border p-2">
                  {post.title}
                </td>
                <td className="border p-2">
                  {post.body}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </LayoutWrapper>
  );
}
