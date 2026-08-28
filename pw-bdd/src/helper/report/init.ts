const fs = require("fs-extra");

(async () => {
    try {
        await fs.ensureDir("test-results");
        await fs.emptyDir("test-results");
    } catch (error) {
        console.log("Folder not created! " + error);
    }
})();
