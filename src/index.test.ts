import os from "os";
import * as vitest from "vitest";

vitest.describe("plugin", () => {
  vitest.it(
    "reads its own package.json regardless of the working directory",
    async () => {
      const cwd = process.cwd();
      process.chdir(os.tmpdir());
      try {
        vitest.vi.resetModules();
        const plugin = (await import("./index.js")).default;
        vitest
          .expect(plugin.meta.name)
          .toBe("eslint-plugin-no-excess-properties");
      } finally {
        process.chdir(cwd);
      }
    },
  );
});
