import watch from 'watch';

export default (func,dir) => {
	if (process.env.NODE_ENV === 'production') {
		func();
	} else {
		func()
		watch.createMonitor(dir, (monitor) => {
			monitor.on('created', (f,stat) => func([f]));
			monitor.on('changed', (f,stat) => func([f]));
		})
	}
}