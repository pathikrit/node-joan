This is a lightweight nodejs Promise based wrapper around the [Joan API](https://portal.getjoan.com/api/docs/)

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

joan.accessToken().then(token => console.log(token))
```

### API
```js
joan.accessToken()
joan.me()
joan.devices()
joan.users()

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
Directly call any HTTP endpoints using the following low level utils:
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
https://github.com/coFactory/factory-slack-app/
https://github.com/wmlutz/joanapi
node badge
```