const fs = require('fs');
const backstop = require('backstopjs')

let resource = './Cypress/screenshots/';
let resourceFiles = fs.readdirSync(resource);

let versionBase = resourceFiles[0];
let versionToCompare = resourceFiles[1];
let scenarios = [];
console.log(versionBase, versionToCompare);

fs.readdir(resource + versionBase, (err, screenshots) => {

    screenshots.forEach(screenshot => {
        let referenceUrl = `/${resource + versionBase}/${screenshot}`;
        let url = `/${resource + versionToCompare}/${screenshot}`;
        let label = screenshot
        scenarios.push({ label, url, referenceUrl })
    });
});

let config = {
    id: "backstop_default",
    viewports: [{ label: "pc", width: 1920, height: 1080 }],
    scenarios: scenarios,
    paths: {
        bitmaps_reference: "backstop/result/bitmaps_reference",
        bitmaps_test: "backstop/result/bitmaps_test",
        engine_scripts: "backstop/result/engine_scripts",
        html_report: "backstop/result/html_report",
        ci_report: "backstop/result/ci_report"
    },
    engine: "puppeteer",
    debug: true
};

backstop('reference', { config }).then(() => {
    backstop('test', { config });
});