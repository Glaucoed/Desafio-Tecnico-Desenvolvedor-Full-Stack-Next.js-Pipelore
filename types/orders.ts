export type Priority = 'LOW' | 'MEDIUM' | 'HIGH' | 'URGENT';
export type Status = 'OPEN' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface RepairOrder {
  id: string;
  title: string;
  description: string;
  location: string;
  priority: Priority;
  status: Status;
  dueDate: Date;
  completedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
}
