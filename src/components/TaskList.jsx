import { useEffect, useState } from 'react';
import { getTasks } from '../api/tasks';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

export default function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    getTasks().then(res => setTasks(res.data));
  }, []);

  return (
    <DataTable value={tasks}>
      <Column field="id" header="ID" />
      <Column field="title" header="Title" />
      <Column field="isComplete" header="Completed" />
    </DataTable>
  );
}