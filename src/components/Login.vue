<template>
  <div class="flex min-h-screen font-sans">
    <div class="flex-1 px-[8%] py-10 flex flex-col justify-center">
      <div class="flex items-center gap-2 font-bold text-lg mb-10">
        <span class="text-gray-900">Todo List App</span>
      </div>
      
      <h1 class="text-[2.5rem] leading-[1.2] font-bold text-gray-900 mb-2.5">Welcome Back</h1>
      <p class="text-gray-500 mb-8 text-[0.95rem]">Log in to continue to your account</p>

      <form @submit.prevent="handleLogin">
        <div class="mb-5">
          <label class="block mb-2 text-[0.9rem] font-medium text-gray-700">Email<span class="text-red-500">*</span></label>
          <input type="email" v-model="form.email" placeholder="Enter your email" required class="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-gray-800 transition-colors" />
        </div>
        
        <div class="mb-5">
          <label class="block mb-2 text-[0.9rem] font-medium text-gray-700">Password<span class="text-red-500">*</span></label>
          <input type="password" v-model="form.password" placeholder="Enter your password" required class="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-gray-800 transition-colors" />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm mb-4">{{ errorMessage }}</p>

        <button type="submit" class="w-full p-3.5 bg-gray-900 text-white rounded-lg text-base mt-2.5 hover:bg-black transition-colors font-medium">Login</button>
      </form>

      <p class="mt-6 text-[0.9rem] text-gray-500">Don't have an account? <router-link to="/signup" class="text-gray-900 font-bold hover:underline">Sign up Here</router-link></p>
    </div>
    
    <!-- Right Side: Image Placeholder -->
    <div class="hidden lg:block flex-1 bg-gray-100 relative">
      <img 
        src="/images/Login.jpg" 
        alt="Login Graphic" 
        class="w-full h-full object-cover absolute inset-0"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '' })
const errorMessage = ref('')

const handleLogin = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message)

    localStorage.setItem('access_token', data.token)
    router.push('/todo')
  } catch (err) {
    errorMessage.value = err.message
  }
}
</script>