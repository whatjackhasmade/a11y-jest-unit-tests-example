import styled, { css } from "styled-components";

export const Wrapper = styled.aside(
	() => css`
		position: fixed;
		top: 0;
		left: 0;
		z-index: 2;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	`
);

export const Underlay = styled.div(
	() => css`
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
	`
);

export const Overlay = styled.div(
	() => css`
		width: 400px;
		min-height: 300px;
		background-color: #fff;
		position: relative;
		z-index: 3;
	`
);

export const Content = styled.div(
	() => css`
		display: flex;
		flex-direction: column;
		min-height: 300px;
		max-height: 100%;
		padding: 1rem 2rem 2rem;
		overflow: auto;

		button + button {
			margin-top: 0.5rem;
		}
	`
);

export const Close = styled.div(
	({ theme }) => css`
		margin: 1rem 2rem 0;
		z-index: 1;
	`
);
