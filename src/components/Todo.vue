<template>
  <div class="min-h-screen bg-gray-50 font-sans relative">
 
    <div class="p-5 flex justify-end max-w-4xl mx-auto">
      <button @click="logout" class="px-4 py-2 bg-transparent border border-gray-800 text-gray-800 rounded-md hover:bg-gray-800 hover:text-white transition-colors duration-200">
        Log out
      </button>
    </div>

    <div class="max-w-[500px] mx-auto mt-10 p-6 sm:p-8 bg-white rounded-2xl shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
      <h1 class="text-gray-800 mb-8 text-3xl font-bold">Your To Do</h1>
      
      <div class="flex gap-3 mb-8 border-b-2 border-gray-100 pb-3">
        <input 
          type="text" 
          v-model="newTask" 
          @keyup.enter="addTask"
          placeholder="Add new task" 
          class="flex-1 border-none outline-none text-base p-2 text-gray-600 bg-transparent placeholder-gray-400"
        />
        <button 
          class="bg-gray-700 text-white w-10 h-10 rounded-lg text-2xl flex items-center justify-center hover:bg-gray-900 transition-colors"
          @click="addTask"
        >
          +
        </button>
      </div>

      <div class="flex flex-col gap-3 mb-10">
        <div 
          v-for="task in tasks" 
          :key="task._id" 
          class="flex items-center border border-gray-200 p-4 rounded-xl gap-4 hover:border-gray-300 hover:shadow-sm transition-all duration-200 bg-white"
        >
          
          <label class="relative w-5 h-5 cursor-pointer shrink-0">
            <input type="checkbox" v-model="task.completed" @change="toggleTask(task)" class="peer sr-only" />
            <div class="absolute top-0 left-0 w-5 h-5 border-2 border-gray-300 rounded peer-checked:bg-gray-600 peer-checked:border-gray-600 flex items-center justify-center transition-colors">
              <svg class="hidden peer-checked:block w-3 h-3 text-white pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </label>

          <span 
            class="flex-1 text-base transition-colors"
            :class="task.completed ? 'text-gray-400 line-through' : 'text-gray-600'"
          >
            {{ task.text }}
          </span>

          <button 
            class="bg-transparent border-none text-gray-400 text-xl font-bold cursor-pointer hover:text-red-500 transition-colors" 
            @click="removeTask(task._id)"
          >
            &times;
          </button>
        </div>
        
        <div v-if="tasks.length === 0" class="text-center text-gray-400 py-4">
          No tasks yet. Add one above!
        </div>
      </div>

      <div class="mt-10 pt-6 border-t border-gray-50">
        <strong class="block mb-4 text-gray-800 text-lg">Your remaining todos : {{ remainingTodos }}</strong>
        <p class="text-gray-400 italic text-sm leading-relaxed">
          "Doing what you love is the cornerstone of having abundance in your life." - Wayne Dyer
        </p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const newTask = ref('')
const tasks = ref([])

const token = localStorage.getItem('access_token')

const fetchTodos = async () => {
  try {
    const res = await fetch('http://localhost:5000/api/todos', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) tasks.value = await res.json()
  } catch (err) {
    console.error('Failed to load todos', err)
  }
}

onMounted(fetchTodos)

const addTask = async () => {
  if (!newTask.value.trim()) return
  try {
    const res = await fetch('http://localhost:5000/api/todos', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ text: newTask.value })
    })
    if (res.ok) {
      const created = await res.json()
      tasks.value.unshift(created) // Adds to the top of the list
      newTask.value = ''
    }
  } catch (err) {
    console.error('Failed to add todo', err)
  }
}

const toggleTask = async (task) => {
  try {
    await fetch(`http://localhost:5000/api/todos/${task._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ completed: task.completed })
    })
  } catch (err) {
    console.error('Failed to update todo status', err)
  }
}

const removeTask = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: 'DELETE',
      headers: { 'Authorization': `Bearer ${token}` }
    })
    if (res.ok) {
      tasks.value = tasks.value.filter(task => task._id !== id)
    }
  } catch (err) {
    console.error('Failed to delete todo', err)
  }
}
const remainingTodos = computed(() => {
  return tasks.value.filter(task => !task.completed).length
})

// Logout functionality
const logout = () => {
  localStorage.removeItem('access_token')
  router.push('/login')
}
</script>