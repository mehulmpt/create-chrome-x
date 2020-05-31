#!/usr/bin/env node

const fs = require('fs')
const path = require('path')

const currentDirectory = process.cwd()

console.log(currentDirectory)

if (!fs.existsSync(currentDirectory)) {
	console.warn('Specified directory does not exist')
	process.exit(1)
}

if (fs.readdirSync(currentDirectory).length !== 0) {
	console.warn('Your directory is not empty. Please choose an empty folder')
	process.exit(1)
}

const chromeFilesPath = path.join(path.dirname(fs.realpathSync(__filename)), 'chrome-files')

fs.readdirSync(chromeFilesPath).forEach((fileName) => {
	const src = path.join(chromeFilesPath, fileName)
	const destination = path.join(currentDirectory, fileName)

	fs.copyFileSync(src, destination)
})

console.log('Chrome extension initialized!')
