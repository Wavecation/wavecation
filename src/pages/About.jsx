import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';

const About = () => {
  return (
    <div className="m-0 p-0">
      <Header />
      <main className="pt-16">
        {/* Hero Section */}
        <section className="relative h-96 bg-blue-900 flex items-center justify-center text-white overflow-hidden">
          {/* 背景层 */}
          <div 
            className="absolute inset-0 bg-cover bg-center opacity-30"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1499540633125-484965b60031?q=80&w=2071&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')"
            }}
          ></div>
          <div className="relative z-10 text-center px-4">
            <h1 className="text-5xl md:text-6xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
              Wavecation的核心理念
            </h1>
            <p className="text-xl max-w-2xl mx-auto" style={{ fontFamily: "'Poppins', sans-serif" }}>
              自由探索，深度旅行，保护海洋 - 这是我们的承诺
            </p>
          </div>
        </section>

        {/* Freedom Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  自由与探索
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  我们相信旅行是追求自由的最纯粹形式。Wavecation为冒险者提供无拘无束的海岛体验，让您以自己的节奏探索海洋的奥秘。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  从清晨的潜水到黄昏的海滩漫步，我们设计的行程给予您最大的自由空间，让每个瞬间都成为独特的回忆。
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  图片来源: <a href="https://images.unsplash.com/photo-1489914169085-9b54fdd8f2a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="underline">Jakob Owens</a> on Unsplash
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1489914169085-9b54fdd8f2a2?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="自由与探索" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Deep Travel Section */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-last md:order-first rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" 
                  alt="深度旅行体验" 
                  className="w-full h-auto object-cover"
                />
              </div>
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  深度旅行体验
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  我们拒绝走马观花式的旅游。Wavecation的每个行程都经过精心设计，让您深入了解当地海洋生态、文化和社区。
                </p>
                <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  与当地向导合作，参与海洋保护项目，品尝地道海鲜料理 - 这些体验让您的旅行超越普通度假，成为改变人生的旅程。
                </p>
                <p className="text-sm text-gray-500 mt-4">
                  图片来源: <a href="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" target="_blank" rel="noopener noreferrer" className="underline">ian dooley</a> on Unsplash
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Ocean Conservation Section */}
        <section className="py-20 bg-blue-900 text-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-4xl font-bold mb-6" style={{ fontFamily: "'Michroma', sans-serif" }}>
                  海洋保护承诺
                </h2>
                <p className="text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  作为海洋的热爱者，保护海洋生态是我们的核心责任。我们采用可持续的旅游方式，最小化对环境的影响。
                </p>
                <p className="text-lg mb-6 leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  我们的所有潜水活动严格遵守海洋保护规范。我们定期组织海洋生态保护活动，带领游客参与珊瑚礁保育和海底清洁行动。
                </p> 
                <p className="text-lg leading-relaxed" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
                  我们相信，保护海洋需要每个人的实际行动。加入我们的旅程，您不仅是在探索海洋，更是在为守护这片蓝色星球贡献力量。
                </p>  
                <p className="text-sm text-blue-200 mt-4">
                  图片来源: <a href="https://images.unsplash.com/photo-1674467262285-70f999856c48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" className="underline">Anna Ansone</a> on Unsplash
                </p>
              </div>
              <div className="rounded-xl overflow-hidden shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1674467262285-70f999856c48?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="海洋保护" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-4xl font-bold mb-8" style={{ fontFamily: "'Michroma', sans-serif" }}>
              加入我们的海洋保护之旅
            </h2>
            <p className="text-xl text-gray-700 mb-8" style={{ fontFamily: "'Noto Sans SC', sans-serif" }}>
              选择Wavecation，您不仅获得难忘的旅行体验，更成为海洋保护的积极参与者
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;