This is a lightweight nodejs Promise based API wrapper around the [Joan API](https://portal.getjoan.com/api/docs/)

### Installing
```sh
npm add node-joan
```

### Example
```js
const {JoanAPIClient} = require('node-joan');

const joan = new JoanAPIClient('client_id', 'client_secret')

joan.devices().then(res => console.log(res))

joan.book({
  source: "conf_room_one.calendar.google.com",
  start: "2019-11-05T13:00:00-05:00",
  end: "2019-11-05T14:00:00-05:00",
})
.then(res => console.log(res))
.catch(err => console.error(err))
```

### API
```js
joan.me()
joan.devices()
joan.users()
joan.newAccessToken() // Get a new access token

// Rooms APIs
joan.rooms.get()
joan.rooms.get(id)
joan.rooms.post(data)
joan.rooms.put(id, data)
joan.rooms.patch(id, data)
joan.rooms.delete(id, data)
joan.rooms.book(data)
	
// Events APIs
joan.events.cancel(data)
joan.events.checkin(data)
joan.events.extend(data)
joan.events.move(data)
joan.events.book(data)
joan.events.invite(data)
joan.events.confirm(data)
joan.events.reject(data)
```

### Primitive APIs
Although, all the APIs are covered by above utils, you can still call any API by using one of the following primitive HTTP APIs:
```js
joan.get(path)
joan.post(path, data)
joan.put(path, data)
joan.patch(path, data)
joan.delete(path, data)
joan.options(path)
```

### TODO
```
joan.options(path)
Upgrade library
rename newToken to newAccessToken()
token refresh before expiry
ask em to use library
ask to deprecate
node badge
```