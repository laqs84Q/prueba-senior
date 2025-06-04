<template>
  <div>
    <form @submit.prevent="saveUser">
      <input v-model="user.name" placeholder="Nombre" required>
      <input v-model="user.email" placeholder="Email" required>
      <button type="submit">{{ user.id ? 'Actualizar' : 'Crear' }}</button>
    </form>

    <ul>
      <li v-for="u in users" :key="u.id">
        {{ u.name }} ({{ u.email }})
        <button @click="editUser(u)">Editar</button>
        <button @click="deleteUser(u.id)">Eliminar</button>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'

const users = ref([])
const user = ref({ id: null, name: '', email: '' })

const getUsers = async () => {
  const res = await axios.get('/api/users')
  users.value = res.data
}

const saveUser = async () => {
  if (user.value.id) {
    await axios.put(`/api/users/${user.value.id}`, user.value)
  } else {
    await axios.post('/api/users', user.value)
  }
  user.value = { id: null, name: '', email: '' }
  await getUsers()
}

const editUser = (u) => {
  user.value = { ...u }
}

const deleteUser = async (id) => {
  await axios.delete(`/api/users/${id}`)
  await getUsers()
}

onMounted(getUsers)
</script>
