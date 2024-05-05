const Hapi = require("@hapi/hapi");
const routes = require("./routes");
const notes = require("./notes");
const handler = require("./handler");

const init = async () => {
  const server = await Hapi.server({
    port: 5000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  server.route(routes);
  await server.start();
  console.log(`server berjalan pada ${server.info.uri}`);
};

init();
