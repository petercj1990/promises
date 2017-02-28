const fs = require('fs');
const fsp = require('fs-promise');
const path = require("path");

	module.exports.resolvedPath = function(directoryPath, fileName) {
		return path.resolve(directoryPath, fileName);
	}

	module.exports.readFile = function(path){
		return new Promise(function(resolve, reject){
			fs.readFile(path, (err, data) => {
			  if (err){
			  	reject(err);
			  }
			  else{
			  	//console.log(data);
			  	resolve(data);
			  }
			  
			});
		})
	}
	module.exports.readDir= function(path){
		return new Promise(function(resolve, reject){
			fs.readdir(path, (err, data) => {
			  if (err){
			  	reject(err);
			  }
			  else{
			  	//console.log(data);
			  	resolve(data);
			  }
			  
			});
		})
	}

	module.exports.readDirFiles = function(path){
		var finalProduct = []
		return module.exports.readDir(path)
		.then(function(directory){
			directory.forEach(function(file){
				finalProduct.push(module.exports.readFile(module.exports.resolvedPath(path, file)));
			})
			return Promise.all(finalProduct);
		})
	}
	