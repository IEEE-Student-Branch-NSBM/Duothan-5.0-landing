import { useCallback, useState } from "react";

export interface SectionInfo {
	name: string;
	id: string;
}

interface UseViewportManagerProps {
	sections: SectionInfo[];
	initialSectionIndex?: number;
}

interface UseViewportManagerReturn {
	activeSectionIndex: number;
	activeSectionName: string;
	activeSectionId: string;
	setActiveSectionIndex: (index: number) => void;
	nextSection: () => void;
	prevSection: () => void;
	sectionNames: string[];
	sectionIds: string[];
}

export const useViewportManager = ({
	sections,
	initialSectionIndex = 0,
}: UseViewportManagerProps): UseViewportManagerReturn => {
	const [activeSectionIndex, setActiveSectionIndex] =
		useState<number>(initialSectionIndex);

	const nextSection = useCallback(() => {
		setActiveSectionIndex((prev) =>
			prev < sections.length - 1 ? prev + 1 : prev,
		);
	}, [sections.length]);

	const prevSection = useCallback(() => {
		setActiveSectionIndex((prev) => (prev > 0 ? prev - 1 : prev));
	}, []);

	return {
		activeSectionIndex,
		activeSectionName: sections[activeSectionIndex]?.name || "",
		activeSectionId: sections[activeSectionIndex]?.id || "",
		setActiveSectionIndex,
		nextSection,
		prevSection,
		sectionNames: sections.map((s) => s.name),
		sectionIds: sections.map((s) => s.id),
	};
};
