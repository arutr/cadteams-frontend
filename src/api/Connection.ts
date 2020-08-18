import User from 'src/api/User';

export type ConnectionStatus = 'connected' | 'pending';

export default interface Connection {
  acquaintance: User;
  id: number;
  message: string;
  status: ConnectionStatus;
  user: User;
}
