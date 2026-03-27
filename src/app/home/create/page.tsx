"use client";
import React, { useState } from "react";
import axios from "axios";
import LayoutWrapper from "@/component/Layout";
import Button from "@/component/Button";

const CreateBlog = () => {
  const [formData, setFormData] = useState({
    image: "",
    title: "",
    date: "",
    categories: "",
    excerpt: ""
  });
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, files } = e.target as HTMLInputElement;
    if (type === "file" && files && files[0]) {
      setImageFile(files[0]);
      setFormData((prev) => ({ ...prev, image: files[0].name }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError("");
    try {
      let imageUrl = formData.image;
      if (imageFile) {
        // Simulate upload: in real app, upload to server or cloud storage
        imageUrl = URL.createObjectURL(imageFile);
      }
      await axios.post("http://localhost:3001/blogCard", { ...formData, image: imageUrl });
      setSuccess(true);
      setFormData({ image: "", title: "", date: "", categories: "", excerpt: "" });
      setImageFile(null);
    } catch (err) {
      setError("Failed to create blog post");
    } finally {
      setLoading(false);
    }
  };

  return (
    <LayoutWrapper>
      <div className="max-w-xl mx-auto bg-white shadow rounded p-6 mt-8">
        <h1 className="text-2xl font-bold mb-4">Create Blog</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="file"
            name="image"
            accept="image/*"
            className="border p-2 w-full"
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="title"
            placeholder="Title"
            className="border p-2 w-full"
            value={formData.title}
            onChange={handleChange}
            required
          />
          <input
            type="date"
            name="date"
            className="border p-2 w-full"
            value={formData.date}
            onChange={handleChange}
            required
          />
          <input
            type="text"
            name="categories"
            placeholder="Categories (comma separated)"
            className="border p-2 w-full"
            value={formData.categories}
            onChange={handleChange}
            required
          />
          <textarea
            name="excerpt"
            placeholder="Excerpt"
            className="border p-2 w-full"
            value={formData.excerpt}
            onChange={handleChange}
            required
          />
          <Button
            type="submit"
            label={loading ? "Saving..." : "Save Blog"}
            className="w-full"
            disabled={loading}
          />
          {success && <p className="text-green-600 mt-2">Blog created successfully!</p>}
          {error && <p className="text-red-600 mt-2">{error}</p>}
        </form>
      </div>
    </LayoutWrapper>
  );
};

export default CreateBlog;
