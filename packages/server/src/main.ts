import { system } from "~/system";

async function main() {
  const startedSystem = await system.start();

  const stop = startedSystem.stop.bind(startedSystem);

  process.addListener("SIGINT", stop);
  process.addListener("SIGTERM", stop);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
