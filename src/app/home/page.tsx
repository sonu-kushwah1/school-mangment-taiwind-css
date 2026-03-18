"use client";
import LayoutWrapper from '@/component/Layout'
import React, { useEffect, useState } from 'react'
import BlogCard from '@/component/BlogCard'
import axios from 'axios'

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  useEffect(() => {
    axios.get('http://localhost:3001/blogCard')
      .then(res => setBlogs(res.data))
      .catch(err => console.error('Failed to fetch blogs:', err));
  }, []);

  return (
    <LayoutWrapper>
      <div className="py-8 flex flex-col items-center">
        <h1 className="text-2xl font-bold mb-6 text-center">Home Page</h1>
        <div className="flex flex-wrap gap-6 justify-center">
          {blogs.map((blog: any) => (
            <div key={blog.id} className="max-w-sm w-80">
              <BlogCard
                image={blog.image}
                title={blog.title}
                date={blog.date}
                categories={blog.categories}
                excerpt={blog.excerpt}
              />
            </div>
          ))}
        </div>
      </div>
    </LayoutWrapper>
  )
}

export default Home