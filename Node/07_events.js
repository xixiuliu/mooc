const EventEmitter = require('events');

class myEvent extends EventEmitter{}


const Event = new myEvent();

Event.on('error',err => {
    console.log(err);
})

Event.emit('error',new Error('opps!'))

