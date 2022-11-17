import React from "react";
import Modal from "../src/components/1";
// import Modal from "../src/components/2";

import * as S from "../src/styles";

export default function App() {
	const [isOpen, setIsOpen] = React.useState(false);

	return (
		<S.Main>
			<button
				onClick={(event) => {
					event.preventDefault();
					setIsOpen(!isOpen);
				}}
				type="button"
			>
				Open Modal
			</button>
			<Modal
				aria-label="Terms and Conditions"
				labels={{ close: "Close Modal" }}
				handleClose={() => setIsOpen(false)}
				isOpen={isOpen}
			>
				<h2>Do you agree to our legal terms?</h2>
				<p>
					Here's something that's fun. We'll do another happy little painting.
					Let's make a nice big leafy tree. Don't hurry. Take your time and
					enjoy. We spend so much of our life looking - but never seeing.
				</p>
				<button
					onClick={() => {
						window.alert("Thanks for agreeing");
					}}
					style={{ marginTop: "auto" }}
					type="button"
				>
					Yes, I agree to the legal terms
				</button>
				<button
					onClick={() => {
						window.alert("Awww no :/");
					}}
					type="button"
				>
					No, I do not agree to the legal terms
				</button>
			</Modal>
		</S.Main>
	);
}
