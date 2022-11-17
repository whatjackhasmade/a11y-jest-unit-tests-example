import React from "react";
import FocusLock from "react-focus-lock";

import { useClickOutside, useKeyPress, useScrollLock } from "../../hooks";
import * as S from "../styles";

export type ModalProps = {
	"aria-label": string;
	children: React.ReactNode;
	describedBy?: React.AriaAttributes["aria-describedby"];
	handleClose: () => void;
	isOpen: boolean;
	labels: {
		close: string;
	};
};

const Modal: React.FC<ModalProps> = ({
	children,
	describedBy,
	handleClose,
	isOpen = false,
	labels,
}) => {
	// Manage scroll lock state
	const { setIsLocked } = useScrollLock(isOpen);

	// Trigger scroll lock based on animation and open state
	React.useEffect(() => {
		setIsLocked(isOpen);
	}, [isOpen, setIsLocked]);

	// Close modal on click outside or escape key press
	const contentRef = React.useRef<HTMLDivElement>(null);
	useClickOutside(contentRef, handleClose, isOpen);
	useKeyPress("Escape", handleClose);

	return (
		<>
			{isOpen && (
				<S.Wrapper>
					<S.Underlay />
					<S.Overlay
						aria-describedby={describedBy}
						aria-modal
						ref={contentRef}
						role="dialog"
					>
						<FocusLock returnFocus>
							<S.Close>
								<button
									onClick={() => {
										console.log("On click");
										handleClose();
									}}
									type="button"
								>
									{labels.close}
								</button>
							</S.Close>
							<S.Content>{children}</S.Content>
						</FocusLock>
					</S.Overlay>
				</S.Wrapper>
			)}
		</>
	);
};

export default Modal;
