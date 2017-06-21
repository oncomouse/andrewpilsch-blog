import path from 'path'
import {execSync} from 'child_process'

export default () => {
	return JSON.parse(execSync(`${path.resolve(path.join(
	'.',
	'node_modules',
	'.bin',
	'bower'
))} list --json --paths`).toString()).jquery.split(/jquery\//)[0];
}