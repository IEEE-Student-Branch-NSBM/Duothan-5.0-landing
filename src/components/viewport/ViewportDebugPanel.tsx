// "use client";

// import React, { useState } from "react";
// import { useViewportScaling } from "./useViewportScaling";

// interface ViewportDebugPanelProps {
// 	/**
// 	 * Hide the panel by default (can be toggled)
// 	 */
// 	hidden?: boolean;
// }

// /**
//  * A debug panel for viewport scaling issues
//  * Press "D" key to toggle visibility
//  */
// export const ViewportDebugPanel: React.FC<ViewportDebugPanelProps> = ({
// 	hidden = true,
// }) => {
// 	const [isHidden, setIsHidden] = useState(hidden);
// 	const [testCaseIndex, setTestCaseIndex] = useState(0);
// 	const { scale, viewport, simulateScreenSize } = useViewportScaling({
// 		debug: true,
// 	});

// 	// Standard test cases for common screen dimensions and scaling factors
// 	const testCases = [
// 		{
// 			label: "Actual Device",
// 			width: viewport.width,
// 			height: viewport.height,
// 			ratio: viewport.pixelRatio,
// 		},
// 		{ label: "1080p (100%)", width: 1920, height: 1080, ratio: 1 },
// 		{ label: "1080p (125%)", width: 1536, height: 864, ratio: 1.25 },
// 		{ label: "1080p (150%)", width: 1280, height: 720, ratio: 1.5 },
// 		{ label: "1366x768 (100%)", width: 1366, height: 768, ratio: 1 },
// 		{ label: "1440p (100%)", width: 2560, height: 1440, ratio: 1 },
// 		{ label: "1440p (125%)", width: 2048, height: 1152, ratio: 1.25 },
// 		{ label: "4K (150%)", width: 2560, height: 1440, ratio: 1.5 },
// 	];

// 	// Simulate the selected test case
// 	const simulatedResult = simulateScreenSize(
// 		testCases[testCaseIndex].width,
// 		testCases[testCaseIndex].height,
// 		testCases[testCaseIndex].ratio,
// 	);

// 	// Toggle visibility with "D" key
// 	React.useEffect(() => {
// 		const handleKeyDown = (e: KeyboardEvent) => {
// 			if (e.key.toLowerCase() === "d") {
// 				setIsHidden((prev) => !prev);
// 			}
// 		};

// 		window.addEventListener("keydown", handleKeyDown);
// 		return () => {
// 			window.removeEventListener("keydown", handleKeyDown);
// 		};
// 	}, []);

// 	if (isHidden) {
// 		return null;
// 	}

// 	return (
// 		<div
// 			style={{
// 				position: "fixed",
// 				top: "10px",
// 				right: "10px",
// 				backgroundColor: "rgba(0, 0, 0, 0.8)",
// 				color: "#fff",
// 				padding: "10px",
// 				borderRadius: "5px",
// 				fontSize: "12px",
// 				zIndex: 9999,
// 				width: "300px",
// 				maxHeight: "80vh",
// 				overflowY: "auto",
// 			}}
// 		>
// 			<div
// 				style={{
// 					display: "flex",
// 					justifyContent: "space-between",
// 					marginBottom: "10px",
// 				}}
// 			>
// 				<h3 style={{ margin: 0 }}>Viewport Debug</h3>
// 				<button
// 					type="button"
// 					onClick={() => setIsHidden(true)}
// 					style={{
// 						background: "none",
// 						border: "none",
// 						color: "#fff",
// 						cursor: "pointer",
// 					}}
// 				>
// 					X
// 				</button>
// 			</div>

// 			<div style={{ marginBottom: "15px" }}>
// 				<h4 style={{ margin: "0 0 5px 0" }}>Current Device</h4>
// 				<div>
// 					<div>
// 						Window: {viewport.width}×{viewport.height}
// 					</div>
// 					<div>Pixel Ratio: {viewport.pixelRatio}</div>
// 					<div>
// 						Effective: {viewport.effectiveWidth}×{viewport.effectiveHeight}
// 					</div>
// 					<div>Scale Applied: {scale.toFixed(3)}</div>
// 				</div>
// 			</div>

// 			<div style={{ marginBottom: "15px" }}>
// 				<h4 style={{ margin: "0 0 5px 0" }}>Test Different Screens</h4>
// 				<select
// 					value={testCaseIndex}
// 					onChange={(e) => setTestCaseIndex(Number.parseInt(e.target.value))}
// 					style={{ width: "100%", marginBottom: "5px" }}
// 				>
// 					{testCases.map((test, index) => (
// 						<option
// 							key={`${test.label}-${test.width}-${test.height}`}
// 							value={index}
// 						>
// 							{test.label} ({test.width}×{test.height}, {test.ratio}x)
// 						</option>
// 					))}
// 				</select>

// 				{testCaseIndex > 0 && (
// 					<div>
// 						<div>
// 							Simulated Window: {simulatedResult.viewport.width}×
// 							{simulatedResult.viewport.height}
// 						</div>
// 						<div>Simulated Ratio: {simulatedResult.viewport.pixelRatio}</div>
// 						<div>Simulated Scale: {simulatedResult.scale.toFixed(3)}</div>
// 					</div>
// 				)}
// 			</div>

// 			<div style={{ fontSize: "10px", opacity: 0.7 }}>
// 				Press "D" key to toggle this debug panel
// 			</div>
// 		</div>
// 	);
// };

// export default ViewportDebugPanel;
