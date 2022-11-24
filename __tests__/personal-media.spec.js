// This is the Pact test for the Personal Media

const { MatchersV3 } = require('@pact-foundation/pact');
const { pactWith } = require('jest-pact');
const { createPost } = require('../src/utils/handlers/createPostHandler');
require('dotenv').config();

// Load the consumer client code which we will call in our test
const { getPost, getPostById } = require('../src/utils/handlers/getPostHandler');
const { updatePost } = require('../src/utils/handlers/updatePostHandler');
const { like } = MatchersV3;
const token = process.env.TOKEN;

pactWith({ consumer: 'Personal Media', provider: 'Backend Personal Media' }, (provider) => {
	describe('get posts', () => {
		// This is the body we expect to get back from the provider
		const EXPECTED_BODY = [
			{
				_id: '6377f34535e1266270b551a9',
				description: 'lets make love',
				owner: '635430a99465323344c949be',
				name: 'prod',
				createdAt: '2022-11-18T21:04:05.066Z',
				updatedAt: '2022-11-18T21:04:05.066Z',
				__v: 0,
			},
			{
				_id: '6377b10aab45435f08659a64',
				description: 'lets make love',
				owner: '635430a99465323344c949be',
				name: 'prod',
				createdAt: '2022-11-18T16:21:30.396Z',
				updatedAt: '2022-11-18T16:21:30.396Z',
				__v: 0,
			},
		];
		beforeEach(() => {
			// First we setup the expected interactions that should occur during the test
			const interaction = {
				state: 'i have a list posts',
				uponReceiving: 'a request for get posts',
				withRequest: {
					method: 'GET',
					path: '/posts',
					query: { sortBy: 'createdAt', OrderBy: 'desc' },
					headers: {
						Accept: 'application/json',
						Authorization: like(`${token}`),
					},
				},
				willRespondWith: {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
					body: like(EXPECTED_BODY),
				},
			};

			return provider.addInteraction(interaction);
		});

		it('returns the correct response', async () => {
			// We call our consumer code, and that will make requests to the mock server
			const response = await getPost(provider.mockService.baseUrl);
			expect(response.data).toMatchObject(EXPECTED_BODY);
			expect(response.status).toEqual(200);
		});
	});

	describe('get posts by ID', () => {
		// This is the body we expect to get back from the provider
		const SINGLE_POST = {
			_id: '6377f34535e1266270b551a9',
			description: 'lets make love',
			owner: '635430a99465323344c949be',
			name: 'prod',
			createdAt: '2022-11-18T21:04:05.066Z',
			updatedAt: '2022-11-18T21:04:05.066Z',
			__v: 0,
		};
		beforeEach(() => {
			// First we setup the expected interactions that should occur during the test
			const interaction = {
				state: 'i get post by ID',
				uponReceiving: 'get posy by ID',
				withRequest: {
					method: 'GET',
					path: '/posts/6377f34535e1266270b551a9',
					headers: {
						Accept: 'application/json',
						Authorization: like(`${token}`),
					},
				},
				willRespondWith: {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
					body: like(SINGLE_POST),
				},
			};

			return provider.addInteraction(interaction);
		});

		it('returns the correct response', async () => {
			// We call our consumer code, and that will make requests to the mock server
			const response = await getPostById(
				provider.mockService.baseUrl,
				'6377f34535e1266270b551a9'
			);
			expect(response.data).toMatchObject(SINGLE_POST);
			expect(response.status).toEqual(200);
		});
	});

	describe('Update Post By ID', () => {
		// This is the body we expect to get back from the provider
		const UPDATE_POST = {
			description: 'lets make love',
		};
		const SINGLE_POST = {
			_id: '6377f34535e1266270b551a9',
			description: 'lets make love',
			owner: '635430a99465323344c949be',
			name: 'prod',
			createdAt: '2022-11-18T21:04:05.066Z',
			updatedAt: '2022-11-18T21:04:05.066Z',
			__v: 0,
		};
		beforeEach(() => {
			// First we setup the expected interactions that should occur during the test
			const interaction = {
				state: 'i get post by ID',
				uponReceiving: 'get posy by ID',
				withRequest: {
					method: 'PATCH',
					path: '/posts/6377f34535e1266270b551a9',
					headers: {
						Accept: 'application/json',
						Authorization: like(`${token}`),
					},
					body: UPDATE_POST,
				},
				willRespondWith: {
					status: 200,
					headers: {
						'Content-Type': 'application/json',
					},
					body: like(SINGLE_POST),
				},
			};

			return provider.addInteraction(interaction);
		});

		it('Updates user Post by ID', async () => {
			// We call our consumer code, and that will make requests to the mock server
			const response = await updatePost(
				provider.mockService.baseUrl,
				UPDATE_POST,
				'6377f34535e1266270b551a9'
			);
			expect(response.data).toMatchObject(SINGLE_POST);
			expect(response.status).toEqual(200);
		});
	});

	describe('Creates new post', () => {
		// This is the body we expect to get back from the provider
		const POST = {
			description: 'This is a new Post',
		};

		const POSTA = {
			description: 'ASA is a new Post',
			gang: 'Hello',
		};

		const SINGLE_POST = {
			_id: '6377f34535e1266270b551a1',
			description: 'This is a new Post',
			owner: '635430a99465323344c949be',
			name: 'prod',
			createdAt: '2022-11-18T21:04:05.066Z',
			updatedAt: '2022-11-18T21:04:05.066Z',
			__v: 0,
		};
		beforeEach(() => {
			// First we setup the expected interactions that should occur during the test
			const interaction = {
				state: 'Create new Post',
				uponReceiving: 'create post request',
				withRequest: {
					method: 'POST',
					path: '/posts',
					headers: {
						Accept: 'application/json',
						Authorization: like(`${token}`),
					},
					body: like(POST),
				},
				willRespondWith: {
					status: 201,
					headers: {
						'Content-Type': 'application/json',
					},
					body: like(SINGLE_POST),
				},
			};

			return provider.addInteraction(interaction);
		});

		it('creates new user post', async () => {
			// We call our consumer code, and that will make requests to the mock server
			const response = await createPost(POST, provider.mockService.baseUrl);
			expect(response.data).toMatchObject(SINGLE_POST);
			expect(response.status).toEqual(201);
		});
	});
});
