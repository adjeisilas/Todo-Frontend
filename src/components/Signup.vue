<template>
  <div class="flex min-h-screen font-sans">
    <!-- Left Side: Form -->
    <div class="flex-1 px-[8%] py-10 flex flex-col justify-center">
      <h1 class="text-[2.5rem] leading-[1.2] font-bold text-gray-900 mb-2.5">This is a ToDo LIST<br>With Authentication</h1>
      <p class="text-gray-500 mb-8 text-[0.95rem]">Sign up to start using it</p>

      <form @submit.prevent="handleSignup">
        <div class="mb-5">
          <label class="block mb-2 text-[0.9rem] font-medium text-gray-700">Email<span class="text-red-500">*</span></label>
          <input type="email" v-model="form.email" placeholder="Enter your email" required class="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-gray-800 transition-colors" />
        </div>
        
        <div class="mb-5">
          <label class="block mb-2 text-[0.9rem] font-medium text-gray-700">Password<span class="text-red-500">*</span></label>
          <input type="password" v-model="form.password" placeholder="Enter your password" required class="w-full p-3 border border-gray-200 rounded-lg outline-none focus:border-gray-800 transition-colors" />
        </div>

        <button type="submit" class="w-full p-3.5 bg-gray-900 text-white rounded-lg text-base mt-2.5 hover:bg-black transition-colors font-medium">Create Account</button>
      </form>

      <p class="mt-6 text-[0.9rem] text-gray-500">Already have an account? <router-link to="/login" class="text-gray-900 font-bold hover:underline">Login Here</router-link></p>
    </div>
    
    <div class="hidden lg:block flex-1 bg-gray-100 relative">
      <img 
        src="/images/Signup.jpg" 
        alt="Signup Graphic" 
        class="w-full h-full object-cover absolute inset-0"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const form = reactive({ email: '', password: '' })

const handleSignup = async () => {
  try {
    const response = await fetch('http://localhost:5000/api/auth/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: form.email, password: form.password })
    })

    const data = await response.json()
    if (!response.ok) throw new Error(data.message)

    localStorage.setItem('access_token', data.token)
    router.push('/todo')
  } catch (err) {
    alert(err.message)
  }
}
</script>