const backstop = require('backstopjs')
const config = require("./config.json");

var backstopScenarios = [];
const { scPaths, scenarios } = config;

scenarios.forEach(scenario => {
    for (let i = 0; i < scenario.stepsCount; i++) {
        backstopScenarios.push({
            referenceUrl: `/${scPaths.ghost1}/${scenario.fileName}${i}.png`,
            url : `/${scPaths.ghost2}/${scenario.fileName}${i}.png`,
            label: scenario.name+i
        })
    }
})

backstop('reference', { config: getOption(backstopScenarios) }).then(() => {
        backstop('test', { config: getOption(backstopScenarios) });
    })

function getOption(backstopScenarios) {
    return {
        id: "backstop_default",
        viewports: [{ label: "pc", width: 1920, height: 1080 }],
        scenarios: backstopScenarios,
        paths: {
            bitmaps_reference: "backstop/backstop_data/bitmaps_reference",
            bitmaps_test: "backstop/backstop_data/bitmaps_test",
            engine_scripts: "backstop/backstop_data/engine_scripts",
            html_report: "backstop/backstop_data/html_report",
            ci_report: "backstop/backstop_data/ci_report"
        },
        engine: "puppeteer",
        debug: true
    };
}