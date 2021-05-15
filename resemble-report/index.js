const playwright = require('playwright');
const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');

const { scPaths, scenarios, options } = config;

async function executeTest(){
  let resultInfo = {};
  let steps = {};
  let datetime = new Date().toISOString().replace(/:/g,".");
  for(s in scenarios.data){
    //Launch the current browser context
    if (!fs.existsSync(`./results/${datetime}/compare`)){
      fs.mkdirSync(`./results/${datetime}/compare`, { recursive: true });
    }

    for (let i = 1; i <= scenarios.data[s].stepsCount; i++) {
      let data = await compareImages(
        fs.readFileSync(`${scPaths.ghost1}${scenarios.data[s].name}-${i}.png`),
        fs.readFileSync(`${scPaths.ghost2}${scenarios.data[s].name}-${i}.png`),
        options
      );
      steps[`${scenarios.data[s].name}-${i}`] = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./results/${datetime}/compare/${scenarios.data[s].name}-${i}.png`, data.getBuffer());
    }
    resultInfo[scenarios.data[s].name] = steps;
  }

    fs.writeFileSync(`./results/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.copyFileSync('./index.css', `./results/${datetime}/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
}
(async ()=>console.log(await executeTest()))();

function getScenarios(name, steps, info){
  let scenarioHeader = 
  `<div class="scenario" id="test0">
    <div class=" btitle">
      <h2>Scenario: ${name}</h2>
    </div>`

  let body = ''

  for (let i = 1; i <= steps; i++) {
    body += `<hr><div>
      <h3>Step ${i}</h3>
      <p>Data: ${JSON.stringify(info[`${name}-${i}`])}</p>
    <div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">v 3.3.0</span>
        <img class="img2" src="../../${scPaths.ghost1}${name}-${i}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">v 3.42.5</span>
        <img class="img2" src="../../${scPaths.ghost2}${name}-${i}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="imgfull" src="./compare/${name}-${i}.png" id="diffImage" label="Diff">
      </div>
    </div>`
  }
    return scenarioHeader + body + "</div>"
}

function createReport(datetime, resInfo){
    return `
    <html>
        <head>
            <title> VRT Report </title>
            <link href="index.css" type="text/css" rel="stylesheet">
        </head>
        <body>
            <h1>Report for Ghost's versions 3.42.5 vs 3.3.0</h1>
            <p>Executed: ${datetime}</p>
            <div id="visualizer">
                ${scenarios.data.map(x=> getScenarios(x.name, x.stepsCount, resInfo[x.name]))}
            </div>
        </body>
    </html>`
}