module.exports = {
	apps: [
		{
			name: "app",
			script: "index.ts",
			instances: "max",
			interpreter: "bun",
			exec_mode: "cluster",
			env: {
				PATH: `${process.env.HOME}/.bun/bin:${process.env.PATH}`,
			}
		},
	],
	deploy: {}
};
