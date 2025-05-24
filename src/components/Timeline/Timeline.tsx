import Card from "./TimelineCard";
import { TimelineData } from "./TimelineData";

export default function Timeline() {
	return (
		<div>
			{/* Desktop view */}
			<div className="hidden lg:flex relative w-full max-w-[1170px] mx-auto mb-60 mt-40 ">
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<img
						src="/timelinecompleet.svg"
						alt="Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-row w-full">
					<div className="flex flex-col w-full">
						{TimelineData.filter((_, i) => i % 2 === 1).map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-5 ${
									index === 0 ? "mt-47" : "mt-14"
								}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="left"
								/>
							</div>
						))}
					</div>
					<div className="flex flex-col w-full">
						{TimelineData.filter((_, i) => i % 2 === 0).map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-auto ${
									index === 0 ? "mt-13" : "mt-12"
								}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="right"
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Tablet view */}
			<div className="hidden md:flex lg:hidden max-w-[768px] mx-auto fixed mb-40">
				<div className="absolute left-1/2 transform -translate-x-1/2">
					<img
						src="/timelinecompleet.svg"
						alt="Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-row w-full">
					<div className="flex flex-col w-full">
						{[TimelineData[1], TimelineData[3]].map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-2 ${
									index === 0 ? "mt-58" : "mt-34"
								}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="left"
								/>
							</div>
						))}
					</div>
					<div className="flex flex-col w-full">
						{[TimelineData[0], TimelineData[2]].map((item, index) => (
							<div
								key={item.id}
								className={`flex justify-start w-full ml-auto ${
									index === 0 ? "mt-25" : "mt-32"
								}`}
							>
								<Card
									title={item.title}
									description={item.description}
									position="right"
								/>
							</div>
						))}
					</div>
				</div>
			</div>

			{/* Mobile view */}
			<div className="md:hidden flex w-[370px] h-[584px] mx-auto fixed">
				<div className="absolute left-6 top-0 h-full">
					<img
						src="/mobileTimeline.svg"
						alt="Mobile Timeline"
						className="h-full object-contain"
					/>
				</div>
				<div className="flex flex-col w-full h-full overflow-hidden">
					<div className="flex flex-col w-full">
						<div className="flex justify-start w-3/4 ml-8 mt-5.5">
							<Card
								title={TimelineData[1].title}
								description={TimelineData[1].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-5">
							<Card
								title={TimelineData[0].title}
								description={TimelineData[0].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-4">
							<Card
								title={TimelineData[3].title}
								description={TimelineData[3].description}
								position="right"
							/>
						</div>
						<div className="flex justify-start w-3/4 ml-8 mt-5">
							<Card
								title={TimelineData[2].title}
								description={TimelineData[2].description}
								position="right"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
