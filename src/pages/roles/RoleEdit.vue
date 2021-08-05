<template>
  <form @submit.prevent="submit">
      <div class="mb-3 mt-3 row">
          <label class="col-sm-2 col-form-label">Name</label>
          <div class="col-sm-10">
              <input v-model="formData.name" type="text" name="name" class="form-control">
          </div>
      </div>

      <div class="mb-3 row">
            <label class="col-sm-2 col-form-label">Permissions</label>
            <div class="col-sm-10">
                <div class="form-check form-check-inline col-3" v-for="permission in permissionList" :key="permission.id">
                    <input v-model="formData.permissions" type="checkbox" class="form-check-input" :value="permission.id" 
                           :checked="checked(permission.id)"
                    >
                    <label class="form-check-label">{{ permission.name }}</label>
                </div>
            </div>
      </div>

      <button class="btn btn-success">Save</button>
  </form>
</template>

<script lang="ts">

import { onMounted, reactive, ref } from "vue"
import axios from "axios"
import { useRoute, useRouter } from 'vue-router'
import { Permission } from "@/models/permission"



export default {
    name : 'RoleCreate',
    setup(){  

        const { push } = useRouter()
        const { params } = useRoute()

        const formData = reactive({
            name : '',
            permissions : [] as number[]
        }) 

        const permissionList = ref([]) // Tüm izinler

        onMounted(async () => {

            // Tüm rol izinleri
            const { data } = await axios.get('permissions')
            permissionList.value = data;

            // Role ait izinler
            const response = await axios.get(`roles/${params.id}`)

            formData.name = response.data.name
            formData.permissions = response.data.permissions.map((p : Permission ) => p.id)

        })
   
        const submit = async () => {
            await axios.put(`roles/${params.id}`, formData)
            await push('/roles')
        }

        const checked = (id: number) => {
            return formData.permissions.some(p => p === id)
        }

        return{
            formData,
            permissionList,
            submit,
            checked
        }
    }
}
</script>

<style scoped>

</style>