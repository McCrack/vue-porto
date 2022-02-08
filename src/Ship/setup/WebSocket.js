import { WebSocketCore } from '@/Ship/';

// const socket = new WebSocket("ws://localhost:9000"); 
// const connection = new WebSocketCore(socket);

export default function useWebSocket() {
	async function newConnection(socket='9000'){
		const connection = await new WebSocketCore(new WebSocket(`ws://localhost:${socket}`));
		return connection
	}
	return { newConnection };

}