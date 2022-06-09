import { system } from "~/system";

async function main() {
  const startedSystem = await system.start();

  process.addListener("SIGINT", () => startedSystem.stop());
  process.addListener("SIGTERM", () => startedSystem.stop());
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
