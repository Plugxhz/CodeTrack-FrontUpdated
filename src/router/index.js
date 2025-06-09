import { createRouter, createWebHistory } from "vue-router";

import HomeView from "../views/HomeView.vue";
import InicioView from "../views/InicioView.vue";
import SobreView from "../views/SobreView.vue";
import ContatoView from "../views/ContatoView.vue";
import LoginView from "../views/LoginView.vue";
import CadastroView from "../views/CadastroView.vue";
import CadastroProdutoView from "../views/CadastroProdutoView.vue";
import BuscaCodigoView from "../views/BuscaCodigoView.vue";
import ProdutoDetalheView from "../views/ProdutoDetalheView.vue";
import PedidosView from "../views/PedidosView.vue";
import ProdutosListagemView from "../views/ProdutosListagemView.vue";
import PedidoDetalheView from "../views/PedidoDetalheView.vue";
import PedidoCadastroView from "../views/PedidoCadastroView.vue";
import ProdutoBuscadoDetalheView from "../views/ProdutoBuscadoDetalheView.vue";
import EditarPedidoView from "../views/EditarPedidoView.vue";  // Só essa importa

const routes = [
  { path: "/", name: "home", component: HomeView },
  { path: "/inicio", name: "inicio", component: InicioView },
  { path: "/sobre", name: "sobre", component: SobreView },
  { path: "/contato", name: "contato", component: ContatoView },
  { path: "/cadastro", name: "cadastro", component: CadastroView },
  { path: "/login", name: "login", component: LoginView },
  { path: "/produtos/cadastro", name: "produtos.cadastro", component: CadastroProdutoView },
  { path: "/pedidos/cadastro", name: "pedidos.cadastro", component: PedidoCadastroView },
  { path: "/listagem", name: "produtos.listagem", component: ProdutosListagemView },
  { path: "/busca/codigo", name: "busca.codigo", component: BuscaCodigoView },
  { path: "/produtos/:codigoDeBarras", name: "ProdutoDetalhe", component: ProdutoDetalheView },
  { path: "/pedidos", name: "pedidos", component: PedidosView },
  { path: "/pedidos/:id", name: "PedidoDetalhe", component: PedidoDetalheView },
  { path: "/pedidos/editar/:id", name: "EditarPedido", component: EditarPedidoView },  // Rota de edição
  { path: "/busca/codigo/:codigoDeBarras", name: "ProdutoBuscadoDetalhe", component: ProdutoBuscadoDetalheView },
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;
