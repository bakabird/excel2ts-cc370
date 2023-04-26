var AdmZip = require("adm-zip");
var packageJSON = require('./package.json');

async function Run() {
	// creating archives
	var zip = new AdmZip();
	var dirs = ["dist", "node_modules"]
	zip.addLocalFile("package.json");
	zip.addLocalFile("node.exe");
	zip.addLocalFile("StupidTask.bat");
	zip.addLocalFile("StupidTask.json");
	for (let index = 0; index < dirs.length; index++) {
		const dir = dirs[index];
		await zip.addLocalFolderPromise(dir, {
			zipPath: dir
		})
		console.log("addDir " + dir);
	}
	zip.writeZip(/*target file name*/ `./release/${packageJSON.name}.${packageJSON.version}.zip`, () => {
		console.log("done")
	});
}

Run();