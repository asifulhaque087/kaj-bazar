import app from "@src/app";

const server = Bun.serve({
  port: 4000,
  fetch: app.fetch,
});

console.log(`Auth Server Running`);
