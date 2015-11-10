/**
 * Created by sanjoy on 11/10/15.
 */
import Server from 'socket.io'

export default function startServer(store){
    const io = new Server().attach(8888);
    store.subscribe(()=>{
        io.emit('state', store.getState().toJS())
    });
    io.on('connection', (socket)=>{
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    })
}