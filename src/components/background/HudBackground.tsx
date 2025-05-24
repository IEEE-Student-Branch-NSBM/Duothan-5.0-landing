"use client";
import { motion } from "framer-motion";
import type React from "react";
import { useEffect, useState } from "react";

const HudBackground: React.FC = () => {
	// Pre-generated binary and hex codes to avoid hydration errors
	// const binaryCodes = [
	// 	"0 1 0 1 1 1 1 0 1 1 1 1",
	// 	"1 0 1 0 0 1 0 1 1 0 0 1",
	// 	"1 1 0 1 0 1 0 0 1 1 0 1",
	// 	"0 1 1 0 1 0 1 1 0 1 0 0",
	// 	"1 0 0 1 1 0 1 0 1 0 1 1",
	// ];

	// const hexCodes = [
	// 	"a3 f8 42 c1 6e d9 3b 75",
	// 	"2c e7 91 4d 0f 5a 8b 3e",
	// 	"d5 7f 19 e4 b2 6a c3 80",
	// 	"47 9c f1 e2 5d 8a 3b c6",
	// ];

	// Generate random positions for circuit node elements
	// const [nodes, setNodes] = useState<
	// 	Array<{
	// 		x: number;
	// 		y: number;
	// 		size: number;
	// 		delay: number;
	// 		duration: number;
	// 	}>
	// >([]);

	// useEffect(() => {
	// 	const generatedNodes = Array.from({ length: 30 }, () => ({
	// 		x: Math.random() * 100,
	// 		y: Math.random() * 100,
	// 		size: 1 + Math.random() * 5,
	// 		delay: Math.random() * 5,
	// 		duration: 2 + Math.random() * 4,
	// 	}));
	// 	setNodes(generatedNodes);
	// }, []);

	return (
		<div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none bg-[#051020]">
			{/* Base background layer with a subtle gradient */}
			<div className="absolute inset-0 bg-gradient-to-b from-[#051020] to-[#071525]" />

			{/* Grid overlay - more subtle */}
			<div className="absolute inset-0">
				<div
					className="absolute inset-0 opacity-10"
					style={{
						backgroundImage:
							"linear-gradient(to right, rgba(6, 182, 212, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(6, 182, 212, 0.05) 1px, transparent 1px)",
						backgroundSize: "60px 60px",
					}}
				/>
			</div>

			{/* Circuit-like pattern background - more subtle */}
			<motion.div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='80' height='80' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%230284c7' stroke-width='0.3' d='M3 3h18v18H3zM9 3v18M15 3v18M3 9h18M3 15h18'/%3E%3C/svg%3E")`,
					backgroundSize: "80px 80px",
				}}
				animate={{
					backgroundPosition: ["0% 0%", "100% 100%"],
				}}
				transition={{
					duration: 180,
					ease: "linear",
					repeat: Number.POSITIVE_INFINITY,
				}}
			/>

			{/* HUD Corner Elements */}
			{/* <div className="absolute top-0 left-0 w-[150px] h-[150px]">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full border-l-2 border-t-2 border-blue-500/60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
        />
        <motion.div 
          className="absolute top-4 left-4 w-3 h-3 bg-cyan-500 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div className="absolute top-4 left-12 h-[1px] w-16 bg-cyan-500/70"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 3, repeat: Infinity }}
        />
      </div>
      
      <div className="absolute top-0 right-0 w-[150px] h-[150px]">
        <motion.div 
          className="absolute top-0 right-0 w-full h-full border-r-2 border-t-2 border-blue-500/60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
        <motion.div 
          className="absolute top-4 right-4 w-3 h-3 bg-cyan-500 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.8, repeat: Infinity }}
        />
        <motion.div className="absolute top-4 right-12 h-[1px] w-16 bg-cyan-500/70"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      </div>
      
      <div className="absolute bottom-0 left-0 w-[150px] h-[150px]">
        <motion.div 
          className="absolute bottom-0 left-0 w-full h-full border-l-2 border-b-2 border-blue-500/60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.4 }}
        />
        <motion.div 
          className="absolute bottom-4 left-4 w-3 h-3 bg-cyan-500 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        />
        <motion.div className="absolute bottom-4 left-12 h-[1px] w-16 bg-cyan-500/70"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.2, repeat: Infinity }}
        />
      </div> */}

			{/* <div className="absolute bottom-0 right-0 w-[150px] h-[150px]">
        <motion.div 
          className="absolute bottom-0 right-0 w-full h-full border-r-2 border-b-2 border-blue-500/60"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.6 }}
        />
        <motion.div 
          className="absolute bottom-4 right-4 w-3 h-3 bg-cyan-500 rounded-full"
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 2.3, repeat: Infinity }}
        />
        <motion.div className="absolute bottom-4 right-12 h-[1px] w-16 bg-cyan-500/70"
          animate={{ opacity: [0.3, 0.8, 0.3] }}
          transition={{ duration: 2.7, repeat: Infinity }}
        />
      </div> */}

			{/* Digital circuit lines - horizontal (reduced number and opacity) */}
			{Array.from({ length: 6 }).map((_, i) => {
				const hLineId = `h-line-${10 + i * 15}`;
				return (
					<motion.div
						key={hLineId}
						className="absolute h-[1px] left-0 right-0 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"
						style={{ top: `${10 + i * 15}%` }}
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 0.6, 0] }}
						transition={{
							duration: 6 + (i % 3),
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 1.2,
							ease: "easeInOut",
						}}
					/>
				);
			})}

			{/* Digital circuit lines - vertical (reduced number and opacity) */}
			{Array.from({ length: 5 }).map((_, i) => {
				const vLineId = `v-line-${15 + i * 17}`;
				return (
					<motion.div
						key={vLineId}
						className="absolute w-[1px] top-0 bottom-0 bg-gradient-to-b from-transparent via-blue-400/30 to-transparent"
						style={{ left: `${15 + i * 17}%` }}
						initial={{ opacity: 0 }}
						animate={{ opacity: [0, 0.5, 0] }}
						transition={{
							duration: 7 + (i % 4),
							repeat: Number.POSITIVE_INFINITY,
							delay: i * 1.5,
							ease: "easeInOut",
						}}
					/>
				);
			})}

			{/* Circuit nodes/connection points with glowing effect */}
			{/* {nodes.map((node, i) => (
        <motion.div
          key={`node-${i}`}
          className="absolute rounded-full bg-cyan-400"
          style={{
            width: `${node.size}px`,
            height: `${node.size}px`,
            left: `${node.x}%`,
            top: `${node.y}%`,
            boxShadow: '0 0 8px 2px rgba(6, 182, 212, 0.6)'
          }}
          animate={{ 
            opacity: [0.2, 1, 0.2],
            scale: [0.8, 1.3, 0.8]
          }}
          transition={{
            duration: node.duration,
            repeat: Infinity,
            delay: node.delay,
            ease: "easeInOut"
          }}
        />
      ))} */}

			{/* Hexagon grid overlay - more subtle */}
			<div
				className="absolute inset-0 opacity-5"
				style={{
					backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 24 24'%3E%3Cpath fill='none' stroke='%2306b6d4' stroke-width='0.3' d='M12 2l10 5v10l-10 5-10-5V7l10-5z'/%3E%3C/svg%3E")`,
					backgroundSize: "120px 120px",
				}}
			/>

			{/* Horizontal scan line effect - uncommented but very subtle */}
			{/* <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/15 to-transparent"
        style={{
          boxShadow: '0 0 5px 0.5px rgba(34, 211, 238, 0.2)'
        }}
        initial={{ top: -2 }}
        animate={{ top: '100%' }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: "linear"
        }}
      /> */}

			{/* Digital data flow effects - more subtle */}
			<div className="absolute top-0 bottom-0 right-[35%] w-[1px]">
				<motion.div
					className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/30 to-transparent bg-[length:100%_200%]"
					animate={{ backgroundPosition: ["0 0", "0 100%"] }}
					transition={{
						duration: 20,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
						delay: 2,
					}}
				/>
			</div>

			<div className="absolute top-0 bottom-0 left-[20%] w-[1px]">
				<motion.div
					className="absolute inset-0 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent bg-[length:100%_200%]"
					animate={{ backgroundPosition: ["0 0", "0 100%"] }}
					transition={{
						duration: 25,
						repeat: Number.POSITIVE_INFINITY,
						ease: "linear",
					}}
				/>
			</div>

			{/* Center circular glow */}
			{/* <motion.div 
        className="absolute w-[40%] h-[40%] rounded-full bg-blue-900/10"
        style={{
          top: '30%',
          left: '30%',
          filter: 'blur(100px)',
        }}
        animate={{ 
          opacity: [0.3, 0.6, 0.3],
          scale: [0.9, 1, 0.9]
        }}
        transition={{ 
          duration: 8, 
          repeat: Infinity,
          ease: "easeInOut" 
        }}
      /> */}

			{/* Tech-inspired decorative elements */}
			{/* <div className="absolute top-[10%] left-[5%] w-[200px] h-[100px] opacity-20">
        <div className="absolute top-0 left-0 w-[20px] h-[20px] border-t-2 border-l-2 border-blue-500/60"></div>
        <div className="absolute top-0 right-0 w-[50px] h-[2px] bg-blue-400/40"></div>
        <div className="absolute bottom-0 left-0 w-[2px] h-[30px] bg-cyan-400/40"></div>
        <div className="font-mono text-xs text-cyan-500/50 absolute top-8 left-8">SYS.0x4f21a</div>
      </div> */}

			{/* <div className="absolute top-[15%] right-[8%] w-[180px] h-[80px] opacity-20">
        <div className="absolute top-0 right-0 w-[20px] h-[20px] border-t-2 border-r-2 border-cyan-500/60"></div>
        <div className="absolute top-0 left-0 w-[40px] h-[2px] bg-cyan-400/40"></div>
        <div className="absolute bottom-0 right-0 w-[2px] h-[25px] bg-blue-400/40"></div>
        <div className="font-mono text-xs text-blue-500/50 absolute top-8 right-8">NET.0x9c83b</div>
      </div> */}

			{/* Binary data abstractions - more subtle */}
			<div className="absolute top-[30%] left-[3%] opacity-10 font-mono text-xs tracking-widest leading-relaxed text-cyan-500/30">
				{["0 1 0 1 1", "1 0 1 0 0", "1 1 0 1 0"].map((code) => (
					<div key={`binary-code-${code}`} className="whitespace-nowrap">
						{code}
					</div>
				))}
			</div>

			{/* Add a subtle glow in the center */}
			<div
				className="absolute w-[50%] h-[50%] rounded-full bg-blue-900/5"
				style={{
					top: "25%",
					left: "25%",
					filter: "blur(150px)",
				}}
			/>

			{/* HEX data abstractions - more subtle */}
			<div className="absolute bottom-[15%] right-[4%] opacity-10 font-mono text-xs tracking-wide text-blue-500/30">
				{["a3 f8 42", "2c e7 91", "d5 7f 19"].map((hex) => (
					<div key={`hex-code-${hex}`} className="whitespace-nowrap">
						{hex}
					</div>
				))}
			</div>
		</div>
	);
};

export default HudBackground;
