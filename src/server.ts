import { buildServer } from "./app";

const server = buildServer();

const port = 5000;

const start = async () => {
	try {
		server.ready((err: Error) => {
			if (err) throw err;
		});

		const address = await server.listen({
			port,
			host: "0.0.0.0",
		});

		console.log("server running at -> " + address);
	} catch (error) {
		console.error(error);
		process.exit(1);
	}
};

start();
