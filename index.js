const {ClientCredentials} = require('simple-oauth2')
const axios = require('axios')

/** API client to interact with Visionect display via the Joan API: https://portal.getjoan.com/api/docs/ */
class JoanApiClient {
	static apiHost = 'https://portal.getjoan.com'
	static apiVersion = '1.0'
	static refreshTokenIfExpiresIn = 60	// Refresh the token if it expires in 60s
	#accessToken = null

	constructor(client_id, client_secret) {
		this.credentials = new ClientCredentials({
			client: {id: client_id, secret: client_secret},
			auth: {tokenHost: JoanApiClient.apiHost, tokenPath: '/api/token/'}
		})
	}

	call = (method, path, data) =>
		(this.#accessToken && !this.#accessToken.expired(JoanApiClient.refreshTokenIfExpiresIn) ? Promise.resolve(null) : this.newAccessToken())
			.then(() => axios({
				method: method,
				url: `${JoanApiClient.apiHost}/api/v${JoanApiClient.apiVersion}/${path}/`,
				headers: {'Authorization': `Bearer ${this.#accessToken.token.access_token}`},
				data: data
			}))
			.then(res => res.data)

	get = (path) => this.call('GET', path)
	post = (path, data) => this.call('POST', path, data)
	put = (path, data) => this.call('PUT', path, data)
	patch = (path, data) => this.call('PATCH', path, data)
	delete = (path, data) => this.call('DELETE', path, data)
	options = (path) => this.call('OPTIONS', path)

	newAccessToken = () => this.credentials.getToken().then(accessToken => {return this.#accessToken = accessToken})

	me = () => this.get('me')
	users = () => this.get('users')
	devices = () => this.get('devices')
	rooms = {
		get: (id) => this.get(id ? `rooms/${id}` : 'rooms'),
		post: (data) => this.post('rooms', data),
		put: (id, data) => this.put(`rooms/${id}`, data),
		patch: (id, data) => this.patch(`rooms/${id}`, data),
		delete: (id, data) => this.delete(`rooms/${id}`, data),
		book: (data) => this.post(`get_room`, data)
	}
	events = {
		cancel: (data) => this.post('events/cancel', data),
		checkin: (data) => this.post('events/checkin', data),
		extend: (data) => this.post('events/extend', data),
		move: (data) => this.post('events/move', data),
		book: (data) => this.post('events/book', data),
		invite: (data) => this.post('events/invite', data),
		confirm: (id) => this.get(`events/invite/${id}`),
		reject: (id) => this.get(`events/reject/${id}`)
	}
}

module.exports = {JoanApiClient}
