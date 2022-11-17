/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
	collectCoverage: false,
	setupFilesAfterEnv: ["./jest.setup.ts"],
	testEnvironment: "jsdom",
	transform: {
		"^.+\\.(t|j)sx?$": [
			"@swc/jest",
			{
				jsc: {
					parser: {
						syntax: "typescript",
						tsx: true,
					},
					target: "es5",
					transform: {
						react: {
							runtime: "automatic",
						},
					},
				},
				module: {
					type: "commonjs",
				},
				swcrc: false,
			},
		],
	},
};
