import { useCallback, useEffect, useState, useMemo } from "react";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTasks = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/tasks");
      const data = await response.json();
      setTasks(data.filter(({ title }) => Boolean(title)));
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  return { tasks, loading, error, setTasks };
};

export const useTaskActions = () => {
  const markAsDone = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: true }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error);
    }
  }, []);

  const markAsTodo = useCallback(async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: false }),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      alert(error);
    }
  }, []);

  const deleteTask = useCallback(async (id) => {
    try {
      await fetch(`http://localhost:5000/tasks/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      alert(err);
    }
  }, []);

  const createTask = useCallback(async (title) => {
    const response = await fetch(`http://localhost:5000/tasks/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });
    const data = await response.json();
    if (!response.ok) {
      throw new Error("bad request, unique title ?");
    }
    return data;
  }, []);

  return { markAsDone, markAsTodo, deleteTask, createTask };
};

export const useTodos = () => {
  const { tasks, loading, error, setTasks } = useTasks();
  const { markAsDone, markAsTodo, deleteTask, createTask } = useTaskActions();
  const [quickFilter, setQuickFilter] = useState(false);
  const [visible, setVisible] = useState(false);

  const setAsDone = async (id) => {
    const updatedTask = await markAsDone(id);
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const setAsTodo = async (id) => {
    const updatedTask = await markAsTodo(id);
    setTasks((tasks) =>
      tasks.map((task) => (task.id === id ? updatedTask : task))
    );
  };

  const removeTask = useCallback(
    async (id) => {
      await deleteTask(id);
      setTasks((tasks) => tasks.filter((task) => task.id !== id));
    },
    [deleteTask, setTasks]
  );

  const tasksToDisplay = useMemo(() => {
    if (!quickFilter) {
      return tasks;
    } else {
      return tasks.filter(({ done }) => !done);
    }
  }, [tasks, quickFilter]);

  const creationCallback = (newTask) => setTasks([newTask, ...tasks]);

  return {
    loading,
    error,
    quickFilter,
    setQuickFilter,
    tasksToDisplay,
    setAsDone,
    setAsTodo,
    removeTask,
    createTask,
    visible,
    setVisible,
    creationCallback,
  };
};
