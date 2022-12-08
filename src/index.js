 /**
 * Summary.
 *
 * Description.
 *
 * @file    This file test all nodejs functions.
 * @author  ptts
 * @since   2022-08-26
 */

const {
  globalInfo,
  osInfo
} = require("./global-mng");

const {
  createHttpServer,
  createFileServer,
  uploadFileServer
} = require("./http-mng");

const {
  listDir,
  isExistFile,
  createFile,
  readFile,
  appendFile,
  writeFile,
  deleteFile,
  renameFile,
  readStrFile
} = require("./file-mng");

const {
  setReceiver,
  sendEvent
} = require("./events-mng");

const {
  utilFormat,
  utilDebug,
  utilLog,
  utilInspect,
  utilPromisify
} = require("./util-mng");

const {sleep} = require("./thread-mng");

const process = require('process');

async function nodejs_all_test() {

  console.log("======= start all-test =======");

  console.log("Hello World!");




console.clear();
console.debug("console.debug");
console.log("console.log");
console.info("console.info");
console.warn("console.warn");
console.error("console.error");

process.stdout.write("aaa");
process.stderr.write("bbb");




/*
  console.log("======= start global-test =======");

  await globalInfo();

  await osInfo();
*/
/*
  console.log("======= start http-test =======");
//  await createHttpServer(8080);

//  await createFileServer(8080);

//  await uploadFileServer(8080);
*/

/*
  console.log("======= start file-test =======");

  console.log("begin...");
  await listDir("./");
  console.log("end...");
*/

/*
  await readFile("demofile1.html");

  if (await isExistFile("a.html") == true) {
    console.log("a.html exists");
  } else {
    await createFile("a.html");
  }

  await writeFile("a.html", "Hello World !!!");
  await appendFile("a.html", " Add Hello World !!!");

  if (await isExistFile("b.html") == true) {
    await deleteFile("b.html");
  } else {
    console.log("b.html doesn't exists");
  }

  await renameFile("a.html", "b.html");

  console.log(await readStrFile("b.html"));
*/
/*
  console.log("======= start event-test =======");

  await setReceiver("scream", function () {
    console.log('I hear a scream!');
  });

  console.log('send event!');
  await sendEvent("scream");
  console.log('sent event!');
*/
/*
  console.log("======= start util-test =======");

  await utilFormat();
  await utilDebug();
  await utilLog();
//  await utilInspect();

  function logSyncMsg(msg) {
    console.log("sync : ", msg);
    return msg;
  }

  async function logAsyncMsg(msg) {
    console.log("async : ", msg);
    return msg;
  }

  console.log('before utilPromisify()!');
  utilPromisify(logSyncMsg, "This is a message.");
  console.log('after utilPromisify()!');
  
  console.log('before utilPromisify()!');
  await utilPromisify(logAsyncMsg, "This is a message.");
  console.log('after utilPromisify()!');
*/
  console.log("======= end all-test =======");
}

(async () => {
  await nodejs_all_test();
})();