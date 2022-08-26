const os = require('os');

async function globalInfo() {

  process.on('exit', function () {
    console.log("process.on::exit");
  });

  process.on('uncaughtException', function (err) {
    console.log('Caught exception: ' + err);
  });

  console.log('Current directory: ' + process.cwd());
//  console.log('Current gid: ' + process.getgid());
//  console.log('Current uid: ' + process.getuid());
  console.log('This process is pid ', process.pid);
  console.log('Version: ', process.version);
  console.log('Versions: ', process.versions);
  console.log('Source File: ', __filename);
  console.log('Source Directory: ', __dirname);
}

async function osInfo() {
  console.log('os.hostname(): ', os.hostname());
  console.log('os.type(): ', os.type());
  console.log('os.platform(): ', os.platform());
  console.log('os.arch(): ', os.arch());
  console.log('os.release(): ', os.release());
  console.log('os.uptime(): ', os.uptime());
  console.log('os.loadavg(): ', os.loadavg());
  console.log('os.totalmem(): ', os.totalmem());
  console.log('os.freemem(): ', os.freemem());
  console.log('os.cpus(): ', os.cpus());
  console.log('os.networkInterfaces(): ', os.networkInterfaces());
}

module.exports = {
  globalInfo,
  osInfo
};