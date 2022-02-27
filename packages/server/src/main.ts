import { system } from "~/system";

const startedSystem = system.start();

process.addListener("SIGINT", () => startedSystem.stop());
process.addListener("SIGTERM", () => startedSystem.stop());
