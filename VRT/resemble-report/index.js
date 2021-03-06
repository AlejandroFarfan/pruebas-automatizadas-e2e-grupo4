const compareImages = require("resemblejs/compareImages")
const config = require("./config.json");
const fs = require('fs');
const { report } = require('process');

const { scPaths, scenarios, options, misMatchThreshold } = config;

async function executeTest(){
  let resultInfo = {};
  let datetime = new Date().toISOString().replace(/:/g,".");
  for(s in scenarios.data){
    if (!fs.existsSync(`./VRT/resemble-report/results/${datetime}/compare`)){
      fs.mkdirSync(`./VRT/resemble-report/results/${datetime}/compare`, { recursive: true });
    }

    let steps = {};
    for (let i = 1; i <= scenarios.data[s].stepsCount; i++) {
      
      let data = await compareImages(
        fs.readFileSync(`${scPaths.ghost1}${scenarios.data[s].fileName}-${i}.png`),
        fs.readFileSync(`${scPaths.ghost2}${scenarios.data[s].fileName}-${i}.png`),
        options
      );
      steps[`${scenarios.data[s].name}-${i}`] = {
          isSameDimensions: data.isSameDimensions,
          dimensionDifference: data.dimensionDifference,
          rawMisMatchPercentage: data.rawMisMatchPercentage,
          misMatchPercentage: data.misMatchPercentage,
          misMatchThreshold: misMatchThreshold,
          failedTest: data.misMatchPercentage >= misMatchThreshold ? true : false,
          diffBounds: data.diffBounds,
          analysisTime: data.analysisTime
      }
      fs.writeFileSync(`./VRT/resemble-report/results/${datetime}/compare/${scenarios.data[s].fileName}-${i}.png`, data.getBuffer());
    }
    resultInfo[scenarios.data[s].name] = steps;
  }

    fs.writeFileSync(`./VRT/resemble-report/results/${datetime}/report.html`, createReport(datetime, resultInfo));
    fs.writeFileSync(`./VRT/resemble-report/results/${datetime}/report.json`, JSON.stringify(resultInfo, null, 2));
    fs.copyFileSync('./VRT/resemble-report/index.css', `./VRT/resemble-report/results/${datetime}/index.css`);

    console.log('------------------------------------------------------------------------------------')
    console.log("Execution finished. Check the report under the results folder")
    return resultInfo;  
}
(async ()=>console.log(await executeTest()))();

function getScenarios(name, fileName, steps, info){
  let scenarioHeader = 
  `<div class="scenario" id="test0">
    <div class=" btitle">
      <h2 class="scenario-title">Scenario: ${name}</h2>
    </div>`

  let body = ''
  for (let i = 1; i <= steps; i++) {
    body += `<hr><div>
      <h3>Step ${i}</h3>${info[`${name}-${i}`].failedTest ? '<span class="red">Failed test</span>': '<span class="green">Passed test</span>'}
      <p>Data: ${JSON.stringify(info[`${name}-${i}`])}</p>
    <div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">v 3.3.0</span>
        <img class="img2" src="../../../screenshots/3.3.0/${fileName}-${i}.png" id="refImage" label="Reference">
      </div>
      <div class="imgcontainer">
        <span class="imgname">v 3.42.5</span>
        <img class="img2" src="../../../screenshots/3.42.5/${fileName}-${i}.png" id="testImage" label="Test">
      </div>
    </div>
    <div class="imgline">
      <div class="imgcontainer">
        <span class="imgname">Diff</span>
        <img class="img2" src="./compare/${fileName}-${i}.png" id="diffImage" label="Diff">
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
                ${scenarios.data.map(x=> getScenarios(x.name, x.fileName, x.stepsCount, resInfo[x.name]))}
            </div>
        </body>
    </html>`
}