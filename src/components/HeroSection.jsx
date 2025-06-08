import React from 'react';

const HeroSection = () => {
  return (
    <section 
      className="h-[100vh] bg-cover bg-center bg-fixed flex flex-col items-center justify-center text-white text-center relative"
      style={{ backgroundImage: "url('https://images.unsplash.com/photo-1682687982167-d7fb3ed8541d?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}
    >
      <div className="z-10">
        <p className="font-poppins text-white text-lg font-medium">
          Wavecation为您提供一站式旅游安排，享受潜水和浮潜的乐趣。
        </p>
        <h2 className="font-poppins text-3xl font-medium my-5 leading-loose">
          探索您的完美假期
        </h2>
        <a
          href="#services"
          className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded border border-gray-400 transition"
        >
          了解更多
        </a>
      </div>
      <div className="absolute inset-0 bg-black bg-opacity-30"></div>
    </section>
  );
};

export default HeroSection;