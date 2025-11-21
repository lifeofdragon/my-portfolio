import { Code, Layers, Zap, Terminal, Cpu, Globe } from 'lucide-react';

/**
 * ============================================================
 * 网站内容配置文件 (CMS)
 * 你可以在这里自由修改文字、链接、颜色和项目，网站会自动更新。
 * ============================================================
 */

export const content = {
  // 1. 顶部导航
  navbar: {
    logoText: "NEXUS",
    logoAccent: ".DEV",
    menuText: "Menu"
  },

  // 2. 菜单链接
  menuItems: [
    "Start Game", 
    "Inventory", 
    "Skill Tree", 
    "Lore", 
    "Contact"
  ],

  // 3. 英雄区域 (Hero Section)
  hero: {
    label: "LEVEL 100 DESIGNER", // 这里可以改等级
    titleLine1: "Crafting",
    titleLine2: "Digital",
    titleLine3: "Chaos",
    scrollText: "SCROLL TO PLAY"
  },

  // 4. 跑马灯文字 (Marquee)
  marquee: [
    { text: "User Interface", color: "text-lime-400" },
    { text: "Game Feel", color: "text-purple-500" },
    { text: "Motion Design", color: "text-lime-400" },
    // 你可以在这里加更多...
  ],

  // 5. 个人简介 (About / Lore)
  about: {
    title: "[ PLAYER PROFILE ]",
    stats: [
      { label: "CLASS", value: "Creative Technologist" },
      { label: "STR", value: "92 (Visuals)" },
      { label: "INT", value: "98 (Code)" },
      { label: "LUCK", value: "50 (RNG)" }, // 运气值
    ],
    // 你的宣言，可以使用 HTML 标签如 <span className="...">
    manifesto: (
      <>
        I don't just design websites; I build <span className="bg-lime-300 px-2 italic">digital playgrounds</span>. 
        Combining raw aesthetics with fluid interactions.
      </>
    )
  },

  // 6. 项目展示 (Inventory)
  projects: [
    {
      title: "Neon Racer UI",
      category: "Game HUD / Interface",
      color: "bg-purple-600", // 卡片的主色调
      url: "#" // 项目链接
    },
    {
      title: "Cyber Deck",
      category: "Web App / React",
      color: "bg-lime-500",
      url: "#"
    },
    {
      title: "Void Walker",
      category: "3D Experience / Three.js",
      color: "bg-black",
      url: "#"
    },
    {
      title: "Glitch Shop",
      category: "E-commerce / Brutalism",
      color: "bg-pink-500",
      url: "#"
    }
    // 想加新项目？直接复制上面的大括号块粘贴到这里即可
  ],

  // 7. 技能树 (Skill Tree)
  skills: [
    {
      title: "Dev Magic",
      desc: "React, Three.js, WebGL Shaders",
      color: "bg-lime-300",
      icon: <Code size={40} />
    },
    {
      title: "UI Architecture",
      desc: "Figma, Design Systems, Brutalism",
      color: "bg-purple-300",
      icon: <Layers size={40} />
    },
    {
      title: "Game Juice",
      desc: "GSAP, Framer Motion, Unity",
      color: "bg-pink-300",
      icon: <Zap size={40} />
    }
  ],

  // 8. 页脚 (Footer)
  footer: {
    heading: "Ready to Start Game?",
    btnText: "Insert Coin",
    socials: [
      { name: "TWITTER", url: "#" },
      { name: "LINKEDIN", url: "#" },
      { name: "GITHUB", url: "#" },
      // { name: "BILIBILI", url: "#" } // 你可以自己加
    ],
    copyright: "© 2025 NEXUS DESIGNS. ALL RIGHTS RESERVED.",
    tagline: "DESIGNED WITH CHAOS & CODE"
  }
};