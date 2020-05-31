#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const currentDirectory = process.cwd()

console.log('Initializing an empty chrome extension in ' + currentDirectory)

if (!fs.existsSync(currentDirectory)) {
	console.warn('Specified directory does not exist')
	process.exit(1)
}

if (fs.readdirSync(currentDirectory).length !== 0) {
	console.warn('Your directory is not empty. Please choose an empty folder')
	process.exit(1)
}

const chromeFilesPath = path.join(path.dirname(fs.realpathSync(__filename)), 'chrome-files')

function copyDirContents(sourceDirectory, destinationDirectory) {
	if (!fs.existsSync(sourceDirectory) || !fs.existsSync(destinationDirectory)) {
		console.error('Fatal error. Source and/or destination directory does not exist')
		process.exit(1)
	}
	fs.readdirSync(sourceDirectory).forEach((fileName) => {
		console.log('Creating ' + fileName + '...')
		const src = path.join(sourceDirectory, fileName)
		const destination = path.join(destinationDirectory, fileName)

		const isSourceFolder = fs.lstatSync(src).isDirectory()

		if (isSourceFolder) {
			fs.mkdirSync(destination)
			copyDirContents(src, destination)
		} else {
			fs.copyFileSync(src, destination)
		}
	})
}

copyDirContents(chromeFilesPath, currentDirectory)

console.log('Chrome extension initialized!')
