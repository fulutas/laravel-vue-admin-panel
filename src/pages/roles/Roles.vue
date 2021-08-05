<template>
<div>
  <div class="pt-3 pb-2 mb-3 border-bottom">
    <router-link to="/roles/create" class="btn btn-sm btn-success">Add Role</router-link>
  </div>
    <div class="table-responsive">
    <table class="table table-striped table-md mt-3">
      <thead>
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="role in roles" :key="role.id">
          <td> {{ role.id }} </td>
          <td> {{ role.name }} </td>
          <td>
            <div class="btn-group mr-2">
              <router-link :to="`/roles/${role.id}/edit`" class="btn btn-sm btn-warning">Edit</router-link>
              <a href="javascript:void(0)" class="btn btn-sm btn-danger" @click="del(role.id)">Delete</a>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</div>
</template>

<script lang="ts">

import {ref, onMounted} from "vue"
import axios from "axios"
import { Role } from "@/models/role"

export default {
    name : 'Roles',
    setup(){

      const roles = ref([])

      onMounted(async () => {
        const { data } = await axios.get('roles')

        roles.value = data;
      })

      const del = async (id) => {
      if(confirm('Are you sure?')){
        await axios.delete(`roles/${id}`)

        roles.value = roles.value.filter(( r : Role) => r.id !== id)

        }
      }

      return {
        roles,
        del,

      }

    }
}
</script>

<style>

</style>