import { useState } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { InputText } from 'primereact/inputtext';
import { Card } from 'primereact/card';

export default function TaskList({ tasks }) {
  const [globalFilter, setGlobalFilter] = useState('');

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
    </div>
  );

  return (
    <Card title="Tasks" style={{ marginBottom: '2rem' }}>
      {searchBox}
      <DataTable
        value={tasks}
        rowKey="id"
        paginator
        rows={20}
        rowsPerPageOptions={[10, 20, 50, 100]}
        globalFilter={globalFilter}
        emptyMessage="No tasks found"
      >
        <Column field="title" header="Title" sortable />
        <Column field="description" header="Description" sortable />
        <Column
          field="isComplete"
          header="Completed"
          body={(rowData) => (rowData.isComplete ? '✅' : '❌')}
          sortable
        />
      </DataTable>
    </Card>
  );
}