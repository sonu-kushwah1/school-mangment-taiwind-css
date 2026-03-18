import React from "react";

interface BlogCardProps {
  image: string;
  title: string;
  date: string;
  categories: string;
  excerpt: string;
}

const BlogCard: React.FC<BlogCardProps> = ({ image, title, date, categories, excerpt }) => (
  <div className="max-w-sm bg-white rounded-lg shadow-md overflow-hidden border mx-auto">
    <img src={image} alt={title} className="w-full h-40 object-cover" />
    <div className="p-4">
      <h2 className="text-lg font-bold mb-2 leading-tight">{title}</h2>
      <div className="flex items-center text-xs text-gray-500 mb-2">
        <span className="mr-2">📅 {date}</span>
        <span>• {categories}</span>
      </div>
      <p className="text-gray-700 text-sm mb-4">{excerpt}</p>
      <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition">Read More</button>
    </div>
  </div>
);

export default BlogCard;
