// src/lib/server/lucia.ts
import { lucia } from 'lucia';
import { sveltekit } from 'lucia/middleware';
import { dev } from '$app/environment';
import { libsql } from '@lucia-auth/adapter-sqlite';
import { libsqlClient } from '$lib/db';
import { unstorage } from '@lucia-auth/adapter-session-unstorage';
import { createStorage } from 'unstorage';

const storage = createStorage();

export const auth = lucia({
	adapter: {
		user: libsql(libsqlClient, {
			user: 'user',
			key: 'user_key',
			session: 'user_session'
		}),
		session: unstorage(storage)
	},
	env: dev ? 'DEV' : 'PROD',
	middleware: sveltekit(),

	getUserAttributes: (data) => {
		return {
			username: data.username
		};
	}
});

export type Auth = typeof auth;
