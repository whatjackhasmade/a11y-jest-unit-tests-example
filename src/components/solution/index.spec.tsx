import React from "react";
import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Modal, { ModalProps } from ".";

/**
 * +=============+=============================================================+
 * |     Key     |                          Function                           |
 * +=============+=============================================================+
 * | Tab         | Moves focus to next focusable element inside the dialog.    |
 * +-------------+-------------------------------------------------------------+
 * |             | When focus is on the last focusable element in the dialog,  |
 * |             | moves focus to the first focusable element in the dialog.   |
 * +-------------+-------------------------------------------------------------+
 * | Shift + Tab | Moves focus to previous focusable element inside the dialog.|
 * +-------------+-------------------------------------------------------------+
 * |             | When focus is on the first focusable element in the dialog, |
 * |             | moves focus to the last focusable element in the dialog.    |
 * +-------------+-------------------------------------------------------------+
 * | Escape      | Closes the dialog.                                          |
 * +-------------+-------------------------------------------------------------+
 *
 * Source: https://www.w3.org/WAI/ARIA/apg/example-index/dialog-modal/dialog.html#kbd_label
 */

describe("Modal", () => {
	const props: Omit<ModalProps, "children"> = {
		"aria-label": "Testing Modal",
		handleClose: jest.fn(),
		isOpen: true,
		labels: {
			close: "Close",
		},
	};

	const buttonLabels = ["first", "second", "third"];

	it("Keyboard Navigation - Tab & Shift + Tab", async () => {
		const user = userEvent.setup();

		const { getAllByRole } = render(
			<Modal {...props}>
				{buttonLabels.map((label) => (
					<button onClick={() => {}} key={`button-${label}`} type="button">
						{label}
					</button>
				))}
			</Modal>
		);

		const [buttonClose, buttonFirst, buttonSecond, buttonThird] =
			getAllByRole("button");

		// Close button is focused on initial render
		expect(buttonClose).toHaveFocus();

		// Tab key - Moves focus to next focusable element inside the dialog.
		await user.tab();
		expect(buttonFirst).toHaveFocus();

		await user.tab();
		expect(buttonSecond).toHaveFocus();

		await user.tab();
		expect(buttonThird).toHaveFocus();

		// Tab key - When focus is on the last focusable element in the dialog, moves focus to the first focusable element in the dialog.
		await user.tab();
		expect(buttonClose).toHaveFocus();

		await user.tab();
		expect(buttonFirst).toHaveFocus();

		// Moves focus to previous focusable element inside the dialog.
		await user.tab({ shift: true });
		expect(buttonClose).toHaveFocus();

		// When focus is on the first focusable element in the dialog, moves focus to the last focusable element in the dialog.
		await user.tab({ shift: true });
		expect(buttonThird).toHaveFocus();
	});

	it("Keyboard Navigation - Escape", async () => {
		const user = userEvent.setup();
		const { getAllByRole } = render(
			<Modal {...props}>
				{buttonLabels.map((label) => (
					<button onClick={() => {}} key={`button-${label}`} type="button">
						{label}
					</button>
				))}
			</Modal>
		);

		const [buttonClose, buttonFirst] = getAllByRole("button");

		// Close button is focused on initial render
		expect(buttonClose).toHaveFocus();

		// Tab key - Moves focus to next focusable element inside the dialog.
		await user.tab();
		expect(buttonFirst).toHaveFocus();

		// ESC key - Closes the dialog.
		await user.type(document.activeElement ?? document.body, `{Escape}`);
		expect(props.handleClose).toHaveBeenCalled();
	});
});
