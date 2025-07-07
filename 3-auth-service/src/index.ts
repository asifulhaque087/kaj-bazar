import app from "@src/app";

const server = Bun.serve({
  port: 4002,
  fetch: app.fetch,
});

console.log(`Auth Server Running`);
