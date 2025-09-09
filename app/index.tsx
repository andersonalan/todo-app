import React, { useCallback, useState } from 'react';
import {
  FlatList,
  Image,
  ListRenderItem,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { Checkbox } from 'react-native-paper';


// Tipo de tarefa
type Task = {
  id: string;
  title: string;
  done: boolean;
};

export default function HomeScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<Task[]>([]);

  const addTask = useCallback(() => {
    if (!task.trim()) return;

    const newTask: Task = {
      id: Date.now().toString(),
      title: task,
      done: false,
    };

    setTasks(prevTasks => [...prevTasks, newTask]);
    setTask('');
  }, [task]);

  const toggleTaskDone = useCallback((id: string) => {
    setTasks(prevTasks =>
      prevTasks.map(task =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  }, []);

  const deleteTask = useCallback((id: string) => {
    setTasks(prevTasks => prevTasks.filter(task => task.id !== id));
  }, []);

  const renderItem: ListRenderItem<Task> = useCallback(
    ({ item }) => (
      <TaskItem
        task={item}
        onToggle={() => toggleTaskDone(item.id)}
        onDelete={() => deleteTask(item.id)}
      />
    ),
    [toggleTaskDone, deleteTask]
  );

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image
          source={require('@/assets/images/logo.png')} // ajuste o caminho se necessário
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.title}>Lista de Tarefas Estácio</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Digite uma nova tarefa..."
          placeholderTextColor="#aaa"
          value={task}
          onChangeText={setTask}
          onSubmitEditing={addTask}
          returnKeyType="done"
        />
        <TouchableOpacity onPress={addTask} style={styles.addButton}>
          <Text style={styles.addButtonText}>➕</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={tasks}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        ListEmptyComponent={
          <Text style={styles.emptyText}>🚫 Nenhuma tarefa adicionada ainda.</Text>
        }
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

// Componente de item da lista
type TaskItemProps = {
  task: Task;
  onToggle: () => void;
  onDelete: () => void;
};

function TaskItem({ task, onToggle, onDelete }: TaskItemProps) {
  return (
    <View style={styles.taskItem}>
      <View style={styles.taskTextContainer}>
        <Checkbox
          status={task.done ? 'checked' : 'unchecked'}
          onPress={onToggle}
          color="#4caf50"
        />
        <TouchableOpacity onPress={onToggle} style={{ flex: 1 }}>
          <Text style={[styles.taskText, task.done && styles.taskDone]}>
            {task.title}
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onDelete}>
        <Text style={styles.deleteText}>🗑️</Text>
      </TouchableOpacity>
    </View>
  );
}

// Estilos modernos
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
    backgroundColor: '#f0f4f8',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 25,
    textAlign: 'center',
    color: '#333',
  },
  inputContainer: {
    flexDirection: 'row',
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 10,
    elevation: 2,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 },
  },
  input: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 10,
    fontSize: 16,
    color: '#333',
  },
  addButton: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 12,
    backgroundColor: '#2360C8',
    borderRadius: 6,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 22,
  },
  taskItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 14,
    backgroundColor: '#ffffff',
    marginBottom: 12,
    borderRadius: 8,
    elevation: 1,
  },
  taskTextContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskText: {
    fontSize: 16,
    color: '#333',
    flexShrink: 1,
  },
  taskDone: {
    textDecorationLine: 'line-through',
    color: '#9e9e9e',
  },
  deleteText: {
    color: '#e53935',
    fontSize: 20,
    paddingLeft: 12,
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontSize: 16,
    marginTop: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 10,
  },
});
