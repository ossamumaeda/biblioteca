import { createRouter, createWebHistory } from 'vue-router'
import data from "@/data.json";
import LivroForm from "@/pages/LivroForm.vue"; // ⬅ adicione esta linha

const router = createRouter({

  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../pages/404.vue'),
    },
    {
      path: "/",
      redirect: "/livros",
      meta: { title: 'Lista de Livros' }
    },
    {
      path: "/livros",
      name: "Livros",
      meta: { title: 'Lista de Livros' },
      component: () => import("../pages/Livros.vue")
    },
    {
      path: "/livros/:id(novo|[0-9]+)", // ⬅ rota dinâmica
      name: "livro-form",
      component: () => import("../pages/LivroForm.vue"),
      props: true, // ⬅ envia o :id como prop
    },
    {
      path: "/autores/:id",
      name: "autorDetalhe",
      component: () => import("@/pages/AutorPage.vue")
    },

    {
      path: "/autores/edit/:id(novo|[0-9]+)",
      name: "autor-form",
      component: () => import("@/pages/AutorForm.vue")
    },

    {
      path: "/editoras/:id",
      component: () => import("@/pages/EditoraPage.vue")
    },

    {
      path: "/editoras/edit/:id(novo|[0-9]+)",
      component: () => import("@/pages/EditoraForm.vue")
    }
  ]
})

export default router
