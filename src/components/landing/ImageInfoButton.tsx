import * as React from "react";
import { Button } from "../ui/Button"; // Adjust import based on your setup
import CloseIcon from "../ui/icons/CloseIcon";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/Popover"; // Adjust import based on your setup

export interface ImageInfoButtonProps {
	id: string;
	position: React.CSSProperties;
	title: string;
	content: string;
	pointerDirection?: "top" | "bottom";
	pointerAlign?: "start" | "end" | "center";
}

const ImageInfoButton: React.FC<ImageInfoButtonProps> = ({
	id,
	position,
	title,
	content,
	pointerDirection,
	pointerAlign,
}) => {
	const [open, setOpen] = React.useState(false);

	// Handle toggle
	const handleToggle = () => {
		setOpen((prev) => !prev);
	};

	// Handle close
	const handleClose = () => {
		setOpen(false);
	};

	// Determine pointer styles based on direction and alignment
	const pointerStyles = {
		bottom: {
			start:
				"absolute -top-4 left-6 border-8 border-transparent border-b-white",
			end: "absolute -top-4 right-6 border-8 border-transparent border-b-white",
			center:
				"absolute -top-4 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-b-white",
		},
		top: {
			start:
				"absolute -bottom-4 left-6 border-8 border-transparent border-t-white",
			end: "absolute -bottom-4 right-6 border-8 border-transparent border-t-white",
			center:
				"absolute -bottom-4 left-1/2 transform -translate-x-1/2 border-8 border-transparent border-t-white",
		},
	};

	const pointerClass =
		pointerStyles[pointerDirection ?? "bottom"]?.[pointerAlign || "start"] ||
		pointerStyles.bottom.start;

	return (
		<Popover open={open} onOpenChange={setOpen}>
			<PopoverTrigger asChild>
				<Button
					variant="outline"
					size="sm"
					className="absolute w-6 h-6 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-full flex justify-center items-center shadow-md transition-transform duration-300 ease-in-out hover:scale-110 z-10"
					style={{
						...position,
						animation: "fadeIn 0.5s ease-out forwards",
						animationDelay: `calc(${id.replace("bubble", "")} * 200ms)`,
						opacity: 0,
					}}
					onClick={handleToggle}
				>
					!
				</Button>
			</PopoverTrigger>
			<PopoverContent
				side={pointerDirection ?? "bottom"}
				align={pointerAlign || "start"}
				className="relative bg-white p-4 rounded-lg shadow-lg max-w-xs transition-all duration-300 ease-in-out z-20 border-0"
			>
				<div className={pointerClass} />
				<button
					onClick={handleClose}
					type="button"
					className="absolute top-1 right-1 w-6 h-6 flex justify-center items-center text-gray-500 hover:text-gray-900 text-lg cursor-pointer"
				>
					<CloseIcon />
				</button>
				<div>
					<h3 className="text-lg font-bold text-gray-800 mb-2">{title}</h3>
					<p className="text-gray-600">{content}</p>
				</div>
			</PopoverContent>
		</Popover>
	);
};

export default ImageInfoButton;
