import React, { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue, AnimatePresence } from 'framer-motion';
import { Gamepad2, Menu, X, ArrowRight, Ghost, Code, Layers, Zap, ExternalLink } from 'lucide-react';

/**
 * 修复版：组件名称已统一为 App
 * 完美适配 Vite 默认模板
 */

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [cursorVariant, setCursorVariant] = useState("default");
  
  // 鼠标位置追踪
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  
  // 平滑的鼠标弹簧动画
  const springX = useSpring(mouseX, { stiffness: 500, damping: 28 });
  const springY = useSpring(mouseY, { stiffness: 500, damping: 28 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // ---------------- Components ----------------

  // 1. 自定义磁吸光标
  const CustomCursor = () => {
    return (
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 bg-black rounded-full pointer-events-none z-[9999] mix-blend-difference flex items-center justify-center"
        style={{ x: springX, y: springY, translateX: "-50%", translateY: "-50%" }}
        variants={{
          default: { scale: 1 },
          hover: { scale: 2.5, backgroundColor: "#ffffff" }, 
          text: { scale: 4, width: "4px", borderRadius: 0, height: "32px" }
        }}
        animate={cursorVariant}
        transition={{ type: "spring", stiffness: 500, damping: 28 }}
      >
        {cursorVariant === 'hover' && <div className="w-1 h-1 bg-black rounded-full" />}
      </motion.div>
    );
  };

  // 2. 噪点背景层
  const NoiseOverlay = () => (
    <div className="fixed inset-0 pointer-events-none z-[9998] opacity-[0.03] mix-blend-overlay"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`
      }}
    />
  );

  // 3. 导航栏
  const Navbar = () => (
    <motion.nav 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.6, 0.05, -0.01, 0.9] }}
      className="fixed w-full top-0 flex justify-between items-center p-6 z-[50] mix-blend-difference text-white"
    >
      <div 
        className="text-2xl font-black tracking-tighter uppercase flex items-center gap-2 cursor-none"
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <Gamepad2 size={32} />
        <span>NEXUS<span className="text-lime-400">.DEV</span></span>
      </div>
      <button 
        onClick={() => setIsMenuOpen(true)}
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
        className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
      >
        <span className="hidden md:block group-hover:translate-x-1 transition-transform">Menu</span>
        <Menu size={32} className="group-hover:rotate-90 transition-transform duration-300" />
      </button>
    </motion.nav>
  );

  // 4. 全屏菜单
  const FullScreenMenu = () => (
    <AnimatePresence>
      {isMenuOpen && (
        <motion.div
          initial={{ clipPath: "circle(0% at 100% 0%)" }}
          animate={{ clipPath: "circle(150% at 100% 0%)" }}
          exit={{ clipPath: "circle(0% at 100% 0%)" }}
          transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
          className="fixed inset-0 bg-black z-[60] flex flex-col justify-center items-center text-white"
        >
          <button 
            onClick={() => setIsMenuOpen(false)}
            className="absolute top-6 right-6 p-4 hover:rotate-180 transition-transform duration-500"
          >
            <X size={48} className="text-lime-400" />
          </button>
          
          <div className="flex flex-col items-start space-y-4">
            {["Start Game", "Inventory", "Skill Tree", "Lore", "Contact"].map((item, i) => (
              <motion.div
                key={item}
                initial={{ x: -100, opacity: 0, skewX: 20 }}
                animate={{ x: 0, opacity: 1, skewX: 0 }}
                exit={{ x: 100, opacity: 0 }}
                transition={{ delay: 0.2 + (i * 0.1), duration: 0.6 }}
                className="overflow-hidden"
              >
                <h2 
                  className="text-6xl md:text-8xl font-black uppercase hover:text-lime-400 transition-colors cursor-none"
                  onMouseEnter={() => setCursorVariant("text")}
                  onMouseLeave={() => setCursorVariant("default")}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item}
                </h2>
              </motion.div>
            ))}
          </div>
          
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="absolute bottom-10 text-gray-500 font-mono"
          >
            PLAYER STATUS: ONLINE
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  // 5. 英雄区域
  const HeroSection = () => {
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 500], [0, 200]);
    const y2 = useTransform(scrollY, [0, 500], [0, -150]);
    const rotate = useTransform(scrollY, [0, 500], [0, 45]);

    return (
      <section className="relative h-screen w-full overflow-hidden flex flex-col justify-center px-6 md:px-20 pt-20">
        <motion.div style={{ y: y1, rotate }} className="absolute top-[10%] right-[5%] w-64 h-64 md:w-96 md:h-96 bg-lime-400 rounded-full blur-[80px] opacity-60 mix-blend-multiply z-0" />
        <motion.div style={{ y: y2 }} className="absolute bottom-[10%] left-[5%] w-72 h-72 md:w-[30rem] md:h-[30rem] bg-purple-600 rounded-full blur-[100px] opacity-60 mix-blend-multiply z-0" />
        
        <div className="z-10 relative mix-blend-darken">
          <motion.div
            initial={{ opacity: 0, y: 100, skewY: 10 }}
            animate={{ opacity: 1, y: 0, skewY: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
          >
            <h2 className="font-mono text-purple-600 font-bold tracking-widest mb-4">LEVEL 99 DESIGNER</h2>
          </motion.div>

          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.2, ease: [0.76, 0, 0.24, 1] }}
              className="text-7xl md:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-black mb-4"
            >
              Crafting
            </motion.h1>
          </div>
          
          <div className="overflow-hidden">
            <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.4, ease: [0.76, 0, 0.24, 1] }}
              className="text-7xl md:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-transparent text-stroke-black hover:text-lime-400 transition-colors duration-300 cursor-none"
              onMouseEnter={() => setCursorVariant("hover")}
              onMouseLeave={() => setCursorVariant("default")}
              style={{ WebkitTextStroke: "3px black" }}
            >
              Digital
            </motion.h1>
          </div>
          
          <div className="overflow-hidden flex items-center gap-4 md:gap-10">
             <motion.h1 
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.6, ease: [0.76, 0, 0.24, 1] }}
              className="text-7xl md:text-[9rem] leading-[0.85] font-black uppercase tracking-tighter text-black"
            >
              Chaos
            </motion.h1>
            <motion.div 
               initial={{ scale: 0 }}
               animate={{ scale: 1 }}
               transition={{ delay: 1, type: "spring" }}
               className="hidden md:flex h-24 w-24 bg-black rounded-full items-center justify-center text-white animate-spin-slow"
            >
               <Ghost size={40} />
            </motion.div>
          </div>
        </div>

        <motion.div 
          className="absolute bottom-10 left-1/2 -translate-x-1/2 font-mono text-xs flex flex-col items-center gap-2"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          SCROLL TO PLAY
          <div className="w-[1px] h-12 bg-black/30" />
        </motion.div>
      </section>
    );
  };

  // 6. 跑马灯组件
  const Marquee = () => (
    <div className="w-full py-8 bg-black text-white overflow-hidden rotate-1 border-y-4 border-lime-400">
      <motion.div 
        className="flex whitespace-nowrap text-5xl md:text-7xl font-black uppercase"
        animate={{ x: ["0%", "-50%"] }}
        transition={{ repeat: Infinity, ease: "linear", duration: 10 }}
      >
        {[...Array(4)].map((_, i) => (
          <span key={i} className="mx-8 flex items-center gap-8">
            User Interface <span className="text-lime-400">///</span> Game Feel <span className="text-purple-500">///</span> Motion Design <span className="text-lime-400">///</span>
          </span>
        ))}
      </motion.div>
    </div>
  );

  // 7. 作品集卡片
  const ProjectCard = ({ title, cat, color, index }) => {
    return (
      <motion.div 
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.7, delay: index * 0.1 }}
        className="group relative w-full aspect-[4/3] md:aspect-[16/9] bg-gray-100 border-2 border-black overflow-hidden cursor-none"
        onMouseEnter={() => setCursorVariant("hover")}
        onMouseLeave={() => setCursorVariant("default")}
      >
        <div className={`absolute inset-0 ${color} transition-all duration-700 group-hover:scale-110 opacity-80`} />
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagonal-stripes.png')] opacity-20" />
        
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500 flex items-center justify-center opacity-0 group-hover:opacity-100">
             <div className="bg-white text-black px-6 py-3 font-bold uppercase tracking-wider transform rotate-12 group-hover:rotate-0 transition-transform duration-300">
                View Quest
             </div>
        </div>

        <div className="absolute bottom-0 left-0 w-full bg-white border-t-2 border-black p-4 flex justify-between items-end transform translate-y-0 group-hover:-translate-y-2 transition-transform duration-300">
          <div>
            <div className="font-mono text-xs text-gray-500 mb-1 uppercase">{cat}</div>
            <h3 className="text-2xl md:text-4xl font-black uppercase leading-none">{title}</h3>
          </div>
          <ArrowRight className="transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
        </div>
      </motion.div>
    );
  };

  // 8. 技能树
  const SkillSection = () => {
    return (
      <section className="py-24 px-6 md:px-20 bg-white relative">
        <div className="mb-16">
          <h2 className="text-6xl md:text-8xl font-black uppercase tracking-tighter mb-4">Skill <span className="text-purple-600">Tree</span></h2>
          <div className="w-full h-2 bg-black/10 rounded-full overflow-hidden">
             <motion.div 
               initial={{ width: 0 }} 
               whileInView={{ width: "85%" }} 
               viewport={{ once: true }}
               transition={{ duration: 1.5, ease: "circOut" }}
               className="h-full bg-gradient-to-r from-lime-400 to-purple-600" 
             />
          </div>
          <p className="font-mono text-right mt-2">LEVEL 85% UNLOCKED</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: <Code size={40}/>, title: "Dev Magic", desc: "React, Three.js, WebGL Shaders", color: "bg-lime-300" },
            { icon: <Layers size={40}/>, title: "UI Architecture", desc: "Figma, Design Systems, Brutalism", color: "bg-purple-300" },
            { icon: <Zap size={40}/>, title: "Game Juice", desc: "GSAP, Framer Motion, Unity", color: "bg-pink-300" }
          ].map((skill, i) => (
            <motion.div
              key={i}
              initial={{ rotateX: 90, opacity: 0 }}
              whileInView={{ rotateX: 0, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.2, duration: 0.8, type: "spring" }}
              whileHover={{ scale: 1.05, rotate: -2, boxShadow: "10px 10px 0px #000" }}
              className={`p-8 border-2 border-black ${skill.color} flex flex-col gap-4 rounded-xl`}
            >
              <div className="bg-white w-16 h-16 border-2 border-black rounded-full flex items-center justify-center shadow-[4px_4px_0px_#000]">
                {skill.icon}
              </div>
              <h3 className="text-3xl font-black uppercase">{skill.title}</h3>
              <p className="font-mono font-bold text-sm">{skill.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    );
  };

  // 9. 页脚
  const Footer = () => {
    return (
      <footer className="bg-black text-white pt-20 pb-10 px-6 md:px-20 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-lime-400 via-purple-500 to-pink-500" />
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-20">
          <div>
             <h2 className="text-5xl md:text-7xl font-black uppercase leading-tight mb-8">
               Ready to <br/>
               <span className="text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-lime-200">Start Game?</span>
             </h2>
             <button 
               className="px-8 py-4 bg-white text-black font-bold text-xl uppercase tracking-widest hover:bg-lime-400 hover:scale-105 transition-all duration-300 flex items-center gap-2 cursor-none"
               onMouseEnter={() => setCursorVariant("hover")}
               onMouseLeave={() => setCursorVariant("default")}
             >
               Insert Coin <Gamepad2 />
             </button>
          </div>
          
          <div className="flex flex-col justify-end items-start md:items-end font-mono text-lg space-y-4">
            <a href="#" className="hover:text-lime-400 transition-colors flex items-center gap-2">TWITTER <ExternalLink size={16}/></a>
            <a href="#" className="hover:text-purple-400 transition-colors flex items-center gap-2">LINKEDIN <ExternalLink size={16}/></a>
            <a href="#" className="hover:text-pink-400 transition-colors flex items-center gap-2">GITHUB <ExternalLink size={16}/></a>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-10 flex flex-col md:flex-row justify-between items-center font-mono text-xs text-gray-500">
          <p>© 2024 NEXUS DESIGNS. ALL RIGHTS RESERVED.</p>
          <p className="mt-2 md:mt-0">DESIGNED WITH CHAOS & CODE</p>
        </div>
      </footer>
    );
  };

  return (
    <div className="bg-white text-black min-h-screen font-sans cursor-none selection:bg-lime-400 selection:text-black overflow-x-hidden">
      {/* 样式注入 */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700;900&family=Space+Grotesk:wght@400;700&family=JetBrains+Mono:wght@400;700&display=swap');
        body { font-family: 'Space Grotesk', sans-serif; }
        .font-mono { font-family: 'JetBrains Mono', monospace; }
        ::-webkit-scrollbar { width: 10px; }
        ::-webkit-scrollbar-track { background: #fff; }
        ::-webkit-scrollbar-thumb { background: #000; border: 2px solid #fff; }
        ::-webkit-scrollbar-thumb:hover { background: #a3e635; }
        .text-stroke-black { -webkit-text-stroke: 2px black; }
      `}</style>

      <CustomCursor />
      <NoiseOverlay />
      <Navbar />
      <FullScreenMenu />

      <main>
        <HeroSection />
        <Marquee />

        {/* About Section */}
        <section className="py-32 px-6 md:px-20">
          <div className="flex flex-col md:flex-row gap-12 items-start">
             <motion.div 
               initial={{ opacity: 0, x: -50 }}
               whileInView={{ opacity: 1, x: 0 }}
               viewport={{ once: true }}
               className="md:w-1/3 font-mono text-sm sticky top-32"
             >
               [ PLAYER PROFILE ]
               <div className="mt-4 p-4 border border-black bg-gray-50">
                 <p className="mb-2"><strong className="bg-black text-white px-1">CLASS:</strong> Creative Technologist</p>
                 <p className="mb-2"><strong className="bg-black text-white px-1">STR:</strong> 92 (Visuals)</p>
                 <p className="mb-2"><strong className="bg-black text-white px-1">INT:</strong> 98 (Code)</p>
                 <p><strong className="bg-black text-white px-1">LUCK:</strong> 50 (RNG)</p>
               </div>
             </motion.div>

             <div className="md:w-2/3">
               <motion.p 
                 initial={{ opacity: 0, y: 50 }}
                 whileInView={{ opacity: 1, y: 0 }}
                 viewport={{ once: true }}
                 className="text-3xl md:text-5xl font-bold leading-tight"
               >
                 I don't just design websites; I build <span className="bg-lime-300 px-2 italic">digital playgrounds</span>. Combining raw aesthetics with fluid interactions.
               </motion.p>
             </div>
          </div>
        </section>

        {/* Projects Section */}
        <section className="px-6 md:px-20 pb-32">
           <div className="flex items-end justify-between mb-16 border-b-4 border-black pb-4">
              <h2 className="text-6xl md:text-9xl font-black uppercase tracking-tighter">Inventory</h2>
              <span className="font-mono font-bold text-xl hidden md:block animate-pulse">SELECT ITEM</span>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
             <ProjectCard title="Neon Racer UI" cat="Game HUD / Interface" color="bg-purple-600" index={1} />
             <ProjectCard title="Cyber Deck" cat="Web App / React" color="bg-lime-500" index={2} />
             <ProjectCard title="Void Walker" cat="3D Experience / Three.js" color="bg-black" index={3} />
             <ProjectCard title="Glitch Shop" cat="E-commerce / Brutalism" color="bg-pink-500" index={4} />
           </div>
        </section>

        <SkillSection />
      </main>

      <Footer />
    </div>
  );
};

export default App;