import React, { useState } from 'react';
import { Button } from 'primereact/button';
import { InputText } from 'primereact/inputtext';
import { InputTextarea } from 'primereact/inputtextarea';
import { Card } from 'primereact/card';
import { createTask } from '../api/tasks';

function TaskForm({ onTaskCreated }) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    const handleCreateTask = async () => {
        if (!title) return;

        try {
            const newTask = await createTask({
                title,
                description,
                isComplete: false
            });

            // Notify parent to refresh the task list
            onTaskCreated(newTask);

            // Clear inputs
            setTitle('');
            setDescription('');
        } catch (err) {
            console.error('Error creating task:', err);
        }
    };

    return (
        <Card title="Create new task" style={{ marginBottom: '2rem' }}>
            <div className="p-fluid">
                <div className="p-field" style={{ marginBottom: '1rem' }}>
                    <label htmlFor="title">Title</label>
                    <InputText
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        placeholder="Task title"
                    />
                </div>

                <div className="p-field" style={{ marginBottom: '1rem' }}>
                    <label htmlFor="description">Description</label>
                    <InputTextarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        rows={3}
                        placeholder="Task description"
                        style={{ resize: 'vertical' }}
                    />
                </div>
                <div style={{ maxWidth: '200px' }}>
                    <Button
                        label="Create task"
                        icon="pi pi-plus"
                        onClick={handleCreateTask}
                        style={{ width: '100%' }}
                    />
                </div>
            </div>
        </Card>
    );
}

export default TaskForm;