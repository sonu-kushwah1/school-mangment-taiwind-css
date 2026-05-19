import LayoutEcom from "@/component/LayoutEcom";
import React from "react";

const products = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: "$99",
    image:
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800",
    category: "Electronics",
  },
  {
    id: 2,
    name: "Smart Watch",
    price: "$149",
    image:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=800",
    category: "Wearables",
  },
  {
    id: 3,
    name: "Gaming Mouse",
    price: "$59",
    image:
      "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=800",
    category: "Accessories",
  },
  {
    id: 4,
    name: "Laptop Backpack",
    price: "$79",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=800",
    category: "Bags",
  },
  {
    id: 5,
    name: "Bluetooth Speaker",
    price: "$129",
    image:
      "https://images.unsplash.com/photo-1585386959984-a4155224a1ad?w=800",
    category: "Audio",
  },
  {
    id: 6,
    name: "Mechanical Keyboard",
    price: "$89",
    image:
      "https://images.unsplash.com/photo-1517336714739-489689fd1ca8?w=800",
    category: "Accessories",
  },
];

const Productpage = () => {
  return (
    <LayoutEcom>
    <div className="min-h-screen bg-gray-100">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-16 px-6">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Explore Our Products
          </h1>
          <p className="text-lg md:text-xl text-gray-200">
            Premium quality products at unbeatable prices.
          </p>
        </div>
      </section>

      {/* Products Grid */}
      <section className="max-w-7xl mx-auto py-14 px-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-10 text-center">
          Featured Products
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-2xl shadow-md hover:shadow-xl transition duration-300 overflow-hidden group"
            >
              <div className="overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-64 object-cover group-hover:scale-105 transition duration-300"
                />
              </div>

              <div className="p-5">
                <span className="text-sm text-indigo-600 font-medium">
                  {product.category}
                </span>

                <h3 className="text-xl font-semibold text-gray-800 mt-2">
                  {product.name}
                </h3>

                <div className="flex items-center justify-between mt-4">
                  <p className="text-2xl font-bold text-gray-900">
                    {product.price}
                  </p>

                  <button className="bg-indigo-600 text-white px-4 py-2 rounded-xl hover:bg-indigo-700 transition">
                    Buy Now
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-white py-16 px-6 border-t">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-800 mb-4">
            Stay Updated
          </h2>
          <p className="text-gray-600 mb-6">
            Subscribe to get updates on our latest arrivals and offers.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full sm:w-96 px-4 py-3 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
            <button className="bg-indigo-600 text-white px-6 py-3 rounded-xl hover:bg-indigo-700 transition">
              Subscribe
            </button>
          </div>
        </div>
      </section>
    </div>
    </LayoutEcom>
  );
};

export default Productpage;