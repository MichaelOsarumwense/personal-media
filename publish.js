const pact = require('@pact-foundation/pact-node');
const path = require('path');
require('dotenv').config();
const childProcess = require('child_process');

const exec = (command) => childProcess.execSync(command).toString().trim();

const gitSha = exec('git rev-parse HEAD || echo LOCAL_DEV') || process.env.TRAVIS_COMMIT;
const branch =
	process.env.TRAVIS_BRANCH || exec('git rev-parse --abbrev-ref HEAD || echo LOCAL_DEV');

const opts = {
	pactFilesOrDirs: [path.resolve(__dirname, './pact/pacts')],
	pactBroker: 'https://cloudmargin.pactflow.io',
	pactBrokerToken: process.env.PACT_BROKER_TOKEN,
	tags: [branch],
	consumerVersion: gitSha,
	deployedVersions: 'test',
	releasedEnvironments: process.env.PACT_BROKER_ENVIRONMENTS,
	deployedEnvironments: process.env.PACT_BROKER_ENVIRONMENTS,
};

pact.publishPacts(opts)
	.then(() => {
		console.log('Pact contract publishing complete!');
		console.log('');
		console.log('Head over to https://cloudmargin.pactflow.io and login with');
		console.log('to see your published contracts.');
	})
	.catch((e) => {
		console.log('Pact contract publishing failed: ', e);
	});
