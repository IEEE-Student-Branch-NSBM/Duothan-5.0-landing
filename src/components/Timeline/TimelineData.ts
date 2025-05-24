export interface Timeline {
	id?: number;
	position: string;
	title: string;
	description: string;
}
export const TimelineData: Timeline[] = [
	{
		id: 1,
		position: "left",
		title: "First Milestone",
		description: "Description of the first milestoneDescription",
	},
	{
		id: 2,
		position: "left",
		title: "Second Milestone",
		description: "Description of the second milestone",
	},
	{
		id: 3,
		position: "right",
		title: "Third Milestone",
		description: "Description of the third milestone",
	},
	{
		id: 4,
		position: "right",
		title: "Fourth Milestone",
		description: "Description of the fourth milestone",
	},
];
