import { system } from "~/system";

process.addListener("SIGINT", () => system.stop());
process.addListener("SIGTERM", () => system.stop());

system.start();
