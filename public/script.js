// ========================
// APP — MINI MERCADO EJC
// Sistema de Comandas com QR Code
// ========================

const app = {
  config: {},
  comandas: [],
  currentComanda: null,
  vendedorMemoria: '',

  // ─────────────────────────────
  // INICIALIZAÇÃO
  // ─────────────────────────────
  async init() {
    try {
      const r = await fetch('/api/config');
      this.config = await r.json();
    } catch {
      console.warn('Config não carregada.');
    }

    window.addEventListener('popstate', () => this.rotear());
    this.rotear();
  },

  // ─────────────────────────────
  // ROTEADOR (SPA)
  // ─────────────────────────────
  rotear() {
    const path = window.location.pathname;
    const app  = document.getElementById('app');

    if (path === '/' || path === '') {
      this.renderizar(app, 'tpl-home');
    } else if (path === '/admin') {
      this.renderizar(app, 'tpl-admin');
      this.carregarAdmin();
    } else if (path === '/buscar') {
      this.renderizar(app, 'tpl-buscar');
      this.carregarBusca();
    } else if (path.startsWith('/comanda/')) {
      const id = path.split('/comanda/')[1];
      this.renderizar(app, 'tpl-comanda');
      this.carregarComanda(id);
    } else if (path.startsWith('/qr/')) {
      const id = path.split('/qr/')[1];
      this.renderizar(app, 'tpl-qr');
      this.carregarQR(id);
    } else if (path === '/relatorio') {
      this.renderizar(app, 'tpl-relatorio');
      this.carregarRelatorio();
    } else {
      app.innerHTML = `<div class="loading" style="padding:80px 20px; text-align:center;">
        <span style="font-size:48px">404</span><br/>Página não encontrada.
        <br/><br/><a href="/" onclick="app.goto('/');return false;" style="color:var(--verde)">← Início</a>
      </div>`;
    }
  },

  goto(url) {
    history.pushState({}, '', url);
    this.rotear();
  },

  renderizar(container, templateId) {
    const tpl = document.getElementById(templateId);
    if (!tpl) return;
    container.innerHTML = '';
    container.appendChild(tpl.content.cloneNode(true));
  },

  // ─────────────────────────────
  // COMANDA (PARTICIPANTE + VENDEDOR)
  // ─────────────────────────────
  async carregarComanda(id) {
    document.getElementById('c-id').textContent = id;

    try {
      const r = await fetch(`/api/comanda/${id}`);
      if (!r.ok) throw new Error('Não encontrada');
      const comanda = await r.json();
      this.currentComanda = comanda;
      this.renderComanda(comanda);
    } catch {
      document.getElementById('c-nome').textContent = 'Comanda não encontrada';
      this.toast('❌ Comanda não encontrada');
    }

    // Botão abrir formulário
    const btnAbrir = document.getElementById('btn-abrir-form');
    if (btnAbrir) {
      btnAbrir.addEventListener('click', () => this.abrirForm());
    }
  },

  renderComanda(comanda) {
    // Nome e avatar
    const iniciais = comanda.participante.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
    document.getElementById('c-avatar').textContent = iniciais;
    document.getElementById('c-nome').textContent = comanda.participante;
    document.getElementById('c-criada').textContent = `Criada em ${this.formatarData(comanda.criadaEm)}`;

    // Restaurar vendedor salvo
    const fVendedor = document.getElementById('f-vendedor');
    if (fVendedor && this.vendedorMemoria) fVendedor.value = this.vendedorMemoria;

    this.renderItens(comanda);
  },

  renderItens(comanda) {
    const lista = document.getElementById('lista-itens');
    const footer = document.getElementById('comanda-footer');
    if (!lista) return;

    if (!comanda.itens || comanda.itens.length === 0) {
      lista.innerHTML = `<div class="itens-empty">
        <span class="empty-icon">🛒</span>
        Nenhum item registrado ainda.
      </div>`;
      if (footer) footer.style.display = 'none';
      return;
    }

    lista.innerHTML = comanda.itens.map((item, i) => {
      const subtotal = (item.valor * item.quantidade).toFixed(2);
      return `
        <div class="item-card">
          <div class="item-num">${i + 1}</div>
          <div class="item-info">
            <div class="item-produto">${this.esc(item.produto)}</div>
            <div class="item-details">
              ${item.quantidade}x R$ ${Number(item.valor).toFixed(2)} 
              &nbsp;•&nbsp; 🙋 ${this.esc(item.vendedor)}
              &nbsp;•&nbsp; 🕐 ${item.horario}
            </div>
          </div>
          <div style="display:flex;flex-direction:column;align-items:flex-end;gap:4px">
            <div class="item-valor">R$ ${subtotal}</div>
            <button class="item-del" onclick="app.deletarItem('${comanda.id}', '${item.id}')" title="Remover">🗑️</button>
          </div>
        </div>
      `;
    }).join('');

    // Total
    const total = comanda.itens.reduce((acc, i) => acc + i.valor * i.quantidade, 0);
    document.getElementById('c-total').textContent = `R$ ${total.toFixed(2)}`;

    // Config de pagamento
    if (this.config.pixKey) {
      document.getElementById('pix-key').textContent = this.config.pixKey;
    }

    const wpNum = document.getElementById('wp-num');
    const wpLink = document.getElementById('whatsapp-link');
    if (wpNum && this.config.whatsapp) {
      wpNum.textContent = this.config.whatsapp;
      wpLink.href = `https://wa.me/55${this.config.whatsapp.replace(/\D/g, '')}?text=Segue+o+comprovante+da+minha+comanda+%23${comanda.id}+de+${encodeURIComponent(comanda.participante)}`;
    }

    if (footer) footer.style.display = '';
  },

  abrirForm() {
    const form = document.getElementById('form-item');
    if (form) {
      form.style.display = '';
      form.scrollIntoView({ behavior: 'smooth', block: 'start' });
      const fVendedor = document.getElementById('f-vendedor');
      if (fVendedor && this.vendedorMemoria) fVendedor.value = this.vendedorMemoria;
      document.getElementById('f-produto').focus();
    }
  },

  fecharForm() {
    const form = document.getElementById('form-item');
    if (form) form.style.display = 'none';
  },

  async salvarItem() {
    if (!this.currentComanda) return;

    const produto  = document.getElementById('f-produto').value.trim();
    const qtd      = document.getElementById('f-qtd').value;
    const valor    = document.getElementById('f-valor').value;
    const vendedor = document.getElementById('f-vendedor').value.trim();

    if (!produto || !qtd || !valor || !vendedor) {
      this.toast('⚠️ Preencha todos os campos!');
      return;
    }

    if (Number(valor) <= 0 || Number(qtd) <= 0) {
      this.toast('⚠️ Quantidade e valor devem ser maiores que zero!');
      return;
    }

    this.vendedorMemoria = vendedor;

    try {
      const r = await fetch(`/api/comanda/${this.currentComanda.id}/item`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ produto, quantidade: Number(qtd), valor: Number(valor), vendedor }),
      });

      if (!r.ok) throw new Error('Erro ao salvar');

      const item = await r.json();
      this.currentComanda.itens.push(item);
      this.renderItens(this.currentComanda);
      this.fecharForm();

      // Limpar campos (exceto vendedor)
      document.getElementById('f-produto').value = '';
      document.getElementById('f-qtd').value = '1';
      document.getElementById('f-valor').value = '';

      this.toast(`✅ ${produto} adicionado!`);
    } catch {
      this.toast('❌ Erro ao salvar item. Tente novamente.');
    }
  },

  async deletarItem(comandaId, itemId) {
    if (!confirm('Remover este item?')) return;

    try {
      await fetch(`/api/comanda/${comandaId}/item/${itemId}`, { method: 'DELETE' });
      this.currentComanda.itens = this.currentComanda.itens.filter(i => i.id !== itemId);
      this.renderItens(this.currentComanda);
      this.toast('🗑️ Item removido.');
    } catch {
      this.toast('❌ Erro ao remover item.');
    }
  },

  // ─────────────────────────────
  // ADMIN
  // ─────────────────────────────
  async carregarAdmin() {
    try {
      const r = await fetch('/api/comandas');
      this.comandas = await r.json();
      this.renderAdmin(this.comandas);
    } catch {
      this.toast('❌ Erro ao carregar comandas.');
    }
  },

  renderAdmin(lista) {
    const el = document.getElementById('admin-lista');
    if (!el) return;

    if (!lista || lista.length === 0) {
      el.innerHTML = '<div class="itens-empty"><span class="empty-icon">📋</span>Nenhuma comanda encontrada.</div>';
      return;
    }

    el.innerHTML = lista.map(c => {
      const iniciais = c.participante.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      const totalStr = c.total > 0 ? `R$ ${c.total.toFixed(2)}` : 'Vazio';
      return `
        <div class="comanda-item" onclick="app.goto('/comanda/${c.id}')">
          <div class="comanda-avatar-sm">${iniciais}</div>
          <div class="comanda-info">
            <div class="comanda-nome">${this.esc(c.participante)}</div>
            <div class="comanda-meta">#${c.id} &nbsp;•&nbsp; ${c.totalItens} item(ns)</div>
          </div>
          <div class="comanda-total">${totalStr}</div>
          <button class="comanda-qr-btn" onclick="event.stopPropagation(); app.goto('/qr/${c.id}')" title="Ver QR Code">📷</button>
        </div>
      `;
    }).join('');
  },

  filtrarComandas(query) {
    if (!this.comandas) return;
    const q = query.toLowerCase();
    const filtradas = this.comandas.filter(c =>
      c.participante.toLowerCase().includes(q) || c.id.includes(q)
    );
    this.renderAdmin(filtradas);
  },

  abrirRelatorio() {
    this.goto('/relatorio');
  },

  // ─────────────────────────────
  // BUSCA (PARTICIPANTE)
  // ─────────────────────────────
  async carregarBusca() {
    try {
      const r = await fetch('/api/comandas');
      this.comandas = await r.json();
      document.getElementById('busca-nome').focus();
    } catch {}
  },

  filtrarBusca(query) {
    const el = document.getElementById('busca-lista');
    if (!el || !this.comandas) return;

    if (!query || query.trim().length < 2) {
      el.innerHTML = '<div class="itens-empty"><span class="empty-icon">🔍</span>Digite pelo menos 2 letras.</div>';
      return;
    }

    const q = query.toLowerCase();
    const filtradas = this.comandas.filter(c => c.participante.toLowerCase().includes(q));

    if (filtradas.length === 0) {
      el.innerHTML = '<div class="itens-empty"><span class="empty-icon">😕</span>Nenhuma comanda encontrada.</div>';
      return;
    }

    el.innerHTML = filtradas.map(c => {
      const iniciais = c.participante.split(' ').map(p => p[0]).join('').slice(0, 2).toUpperCase();
      const totalStr = c.total > 0 ? `R$ ${c.total.toFixed(2)}` : 'Vazio';
      return `
        <div class="comanda-item" onclick="app.goto('/comanda/${c.id}')">
          <div class="comanda-avatar-sm">${iniciais}</div>
          <div class="comanda-info">
            <div class="comanda-nome">${this.esc(c.participante)}</div>
            <div class="comanda-meta">#${c.id} &nbsp;•&nbsp; ${c.totalItens} item(ns)</div>
          </div>
          <div class="comanda-total">${totalStr}</div>
        </div>
      `;
    }).join('');
  },

  // ─────────────────────────────
  // QR CODE
  // ─────────────────────────────
  async carregarQR(id) {
    try {
      const r = await fetch(`/api/qr/${id}`);
      if (!r.ok) throw new Error();
      const data = await r.json();

      const comR = await fetch(`/api/comanda/${id}`);
      const com  = await comR.json();

      document.getElementById('qr-nome').textContent = com.participante;
      document.getElementById('qr-id').textContent   = id;
      document.getElementById('qr-img').src          = data.qr;
      document.getElementById('qr-url').textContent  = data.url;
    } catch {
      this.toast('❌ Erro ao gerar QR Code.');
    }
  },

  // ─────────────────────────────
  // NOVA COMANDA
  // ─────────────────────────────
  abrirNovaComanda() {
    document.getElementById('modal-nova').style.display = 'flex';
    setTimeout(() => document.getElementById('m-participante').focus(), 100);
  },

  fecharModal() {
    document.getElementById('modal-nova').style.display = 'none';
    document.getElementById('m-participante').value = '';
  },

  async criarComanda() {
    const nome = document.getElementById('m-participante').value.trim();
    if (!nome) { this.toast('⚠️ Informe o nome do participante!'); return; }

    try {
      const r = await fetch('/api/comanda', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ participante: nome }),
      });

      if (!r.ok) throw new Error();
      const nova = await r.json();

      this.fecharModal();
      this.toast(`✅ Comanda #${nova.id} criada!`);
      this.goto(`/comanda/${nova.id}`);
    } catch {
      this.toast('❌ Erro ao criar comanda.');
    }
  },

  // ─────────────────────────────
  // RELATÓRIO
  // ─────────────────────────────
  async carregarRelatorio() {
    const el = document.getElementById('relatorio-content');
    if (!el) return;

    try {
      const r    = await fetch('/api/relatorio');
      const data = await r.json();

      el.innerHTML = `
        <div class="rel-card">
          <h3>Total Arrecadado</h3>
          <div class="rel-num verde">R$ ${data.totalGeral.toFixed(2)}</div>
        </div>
        <div class="rel-card">
          <h3>Comandas</h3>
          <div class="rel-num">${data.comandasComItens} <span style="font-size:14px;font-weight:400;color:var(--texto-soft)">com itens / ${data.totalComandas} total</span></div>
        </div>
        <div class="rel-card">
          <h3>Produtos Mais Vendidos</h3>
          ${data.produtosMaisVendidos.length === 0
            ? '<p style="color:var(--texto-soft);font-size:14px">Nenhuma venda ainda.</p>'
            : data.produtosMaisVendidos.map((p, i) => `
              <div class="rel-item">
                <span>${i + 1}. ${this.esc(p.produto)}</span>
                <strong>${p.qtd} un.</strong>
              </div>
            `).join('')
          }
        </div>
      `;
    } catch {
      el.innerHTML = '<div class="loading">Erro ao carregar relatório.</div>';
    }
  },

  // ─────────────────────────────
  // UTILITÁRIOS
  // ─────────────────────────────
  copiarPix() {
    const key = this.config.pixKey;
    if (!key) return;
    navigator.clipboard.writeText(key).then(() => {
      this.toast('📋 Chave PIX copiada!');
    }).catch(() => {
      this.toast('Chave PIX: ' + key);
    });
  },

  toast(msg, duration = 3000) {
    const el = document.getElementById('toast');
    if (!el) return;
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(this._toastTimer);
    this._toastTimer = setTimeout(() => el.classList.remove('show'), duration);
  },

  esc(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;')
              .replace(/</g, '&lt;')
              .replace(/>/g, '&gt;')
              .replace(/"/g, '&quot;');
  },

  formatarData(iso) {
    try {
      return new Date(iso).toLocaleDateString('pt-BR', {
        day: '2-digit', month: '2-digit', year: 'numeric',
        hour: '2-digit', minute: '2-digit',
        timeZone: 'America/Sao_Paulo',
      });
    } catch { return ''; }
  },
};

// ========================
// FECHAR MODAL CLICANDO FORA
// ========================
document.getElementById('modal-nova')?.addEventListener('click', function (e) {
  if (e.target === this) app.fecharModal();
});

// ========================
// ENTER nos formulários
// ========================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    const focused = document.activeElement?.id;
    if (['f-produto','f-qtd','f-valor','f-vendedor'].includes(focused)) {
      app.salvarItem();
    } else if (focused === 'm-participante') {
      app.criarComanda();
    }
  }
});

// ========================
// INICIALIZAR
// ========================
app.init();
