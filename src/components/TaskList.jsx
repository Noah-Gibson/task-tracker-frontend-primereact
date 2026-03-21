import { useState, useEffect } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import TaskForm from './TaskForm';
import { deleteTask } from '../api/tasks';

export default function TaskList({ tasks, onTaskChanged }) {
  const [globalFilter, setGlobalFilter] = useState('');
  const [showTaskForm, setShowTaskForm] = useState(false);

  const searchBox = (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
      <span className="p-input-icon-left">
        <i className="pi pi-search" style={{ paddingLeft: '1rem' }} />
        <InputText
          placeholder="Search..."
          value={globalFilter}
          onChange={(e) => setGlobalFilter(e.target.value)}
          style={{ paddingLeft: '3rem' }}
        />
      </span>
      <Button
        label="New task"
        icon="pi pi-plus"
        onClick={() => setShowTaskForm(true)}
      />
    </div>
  );

  return (
    <div>
      <Card title="Tasks" style={{ marginBottom: '2rem' }}>
        {searchBox}
        <DataTable
          value={tasks}
          rowKey="id"
          paginator
          rows={20}
          rowsPerPageOptions={[10, 20, 50, 100]}
          globalFilter={globalFilter}
          emptyMessage="You have no tasks."
          sortField="dueDate"
          sortOrder={-1}
        >
          <Column field="title" header="Title" sortable />
          <Column field="description" header="Description" sortable />
          <Column
            field="dueDate"
            header="Due date"
            sortable
            body={(rowData) => new Date(rowData.dueDate).toLocaleString()}
          />
          <Column
            field="isComplete"
            header="Completed"
            body={(rowData) => (rowData.isComplete ? '✅' : '❌')}
            sortable
          />
          <Column
            header="Actions"
            body={(rowData) => (
              <Button
                icon="pi pi-trash"
                className="p-button-sm p-button-danger"
                onClick={async () => {
                  await deleteTask(rowData.id);
                  onTaskChanged();
                }}
              />
            )}
          />
        </DataTable>
        <Dialog
          header="Create Task"
          visible={showTaskForm}
          style={{ width: '400px' }}
          modal
          onHide={() => setShowTaskForm(false)}
        >
          <TaskForm
            onTaskChanged={(newTask) => {
              setShowTaskForm(false);
              onTaskChanged();
            }}
          />
        </Dialog>
      </Card>
    </div>
  );
}
