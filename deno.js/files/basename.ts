import { basename } from "https://deno.land/std/path/posix.ts?s=basename";

const exe = basename(import.meta.url);
console.log("The running process:", exe);
