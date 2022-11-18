import { rest } from 'msw';

const url = process.env.REACT_APP_URL;

export const handlers = [
	rest.get(`${url}/posts`, (req, res, ctx) => {
		return res(
			ctx.json({
				_id: '6206d1e7be516a2bd0a19341',
				description: 'Am back',
				owner: '61c122afd7d7c64444fbdcet',
				name: 'Pussy',
				createdAt: '2022-02-11T21:15:19.252Z',
				updatedAt: '2022-02-11T21:15:19.252Z',
				__v: 0,
			})
		);
	}),

	rest.get(`${url}/users/me`, (req, res, ctx) => {
		return res(
			ctx.status(200),
			ctx.json({
				age: 0,
				_id: '61c122afd7d7c64444fbdced',
				name: 'maga',
				email: 'magic@mike.com',
				secret: 'jaga',
				address: 'Califonia',
				dob: 'April 1 1991',
				hobbies: '🏃‍♂️ 🏃‍♀️ 🎽 Running',
				events: 'Amas Days',
				createdAt: '2021-12-21T00:41:19.960Z',
				updatedAt: '2022-05-10T17:42:51.211Z',
				__v: 24,
			})
		);
	}),

	rest.get(`${url}/users/me/avatar`, (req, res, ctx) => {
		return res(ctx.status(404), ctx.json({}));
	}),
];
