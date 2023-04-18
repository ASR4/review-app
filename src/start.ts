import HostServer from './HostServer';

// Start the server or run tests
if (process.argv[2] !== 'test') {
    let server = new HostServer();
    server.start(3001);
}