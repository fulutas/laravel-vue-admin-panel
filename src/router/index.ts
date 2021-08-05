import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
import Dashboard from "@/pages/Dashboard.vue";
import Register from "@/pages/Register.vue";
import Login from "@/pages/Login.vue";
import Wrapper from "@/pages/Wrapper.vue";

// User
import Users from "@/pages/users/Users.vue";
import UserCreate from "@/pages/users/UserCreate.vue";
import UserEdit from "@/pages/users/UserEdit.vue";

// Role
import Roles from "@/pages/roles/Roles.vue";
import RoleCreate from "@/pages/roles/RoleCreate.vue";
import RoleEdit from "@/pages/roles/RoleEdit.vue";

// Product
import Products from "@/pages/products/Products.vue";
import ProductCreate from "@/pages/products/ProductCreate.vue";
import ProductEdit from "@/pages/products/ProductEdit.vue";

// Orders
import Orders from "@/pages/orders/Orders.vue";

// Profile
import Profile from "@/pages/Profile.vue";


const routes: Array<RouteRecordRaw> = [
  {
    path: "/",
    component: Wrapper,
    children: [
      { path: "/", name: "dashboard", component: Dashboard },
      { path: "/profile", name: "profile", component: Profile },
      { path: "/users", name: "users", component: Users },
      { path: "/users/create", name: "userCreate", component: UserCreate },
      { path: "/users/:id/edit", name: "userEdit", component: UserEdit },
      { path: "/roles", name: "roles", component: Roles },
      { path: "/roles/create", name: "roleCreate", component: RoleCreate },
      { path: "/roles/:id/edit", name: "roleEdit", component: RoleEdit },
      { path: "/products", name: "products", component: Products },
      { path: "/products/create", name: "productCreate", component: ProductCreate },
      { path: "/products/:id/edit", name: "productEdit", component: ProductEdit },
      { path: "/orders", name: "orders", component: Orders },
    ],
  },
  { path: "/register", name: "register", component: Register },
  { path: "/login", name: "login", component: Login },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
