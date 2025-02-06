"use client";

import FullCalendar from '@fullcalendar/react';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import taskStore from '@/store/taskStore';
import { TaskDetailsDialog } from "@/components/dashboard/TaskDetailsDialog";
import React, { useState } from 'react';

interface TaskT {
  title: string,
  description: string,
  deadline: Date,
  priority: string,
  category: string,
}

const Calendar = () => {

  const tasks = taskStore(state => state.tasks);
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [selectedTasks, setSelectedTasks] = useState<TaskT>({
    title: '',
    description: '',
    deadline: new Date(0, 0, 0),
    priority: '',
    category: '',
  });

  // Transform taskEvents into FullCalendar event format
  const events = Array.isArray(tasks) ? tasks.map(task => ({
    title: task.title,
    extendedProps: {
      description: task.description,
      priority: task.priority,
      category: task.category,
    },
    start: task.deadline?.toString().split('T')[0] // Convert date to YYYY-MM-DD format
  })) : [];

  const handleDateClick = (data: TaskT) => {
    setSelectedTasks({
      title: data.title,
      description: data.description,
      deadline: data.deadline ?? new Date(),
      priority: data.priority,
      category: data.category,
    });
    setIsOpen(true);
  }

  return (
    <>
      <FullCalendar
        height={"auto"}
        headerToolbar={{
          right: 'today,prev,next',
        }}
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        eventClick={(info) => {
          const { title, start } = info.event;
          const { description, priority, category } = info.event.extendedProps;
          handleDateClick({ title, description, deadline: start!, priority, category });
        }}
      />

      <TaskDetailsDialog tasks={selectedTasks} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

export default React.memo(Calendar);