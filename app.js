const storageKey = "nailflow-demo-state-v2";

const defaultState = {
  messagesAnswered: 18,
  savedClients: 7,
  onboardingDone: false
};

let state = { ...defaultState, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };

let appointments = [
  { time: "09:00", client: "Bianca", service: "Manicure completa", price: 75, status: "confirmado", color: "rose", note: "Lembrete enviado ontem às 18h" },
  { time: "11:10", client: "Camila", service: "Banho de gel", price: 145, status: "confirmado", color: "teal", note: "Cliente semanal recorrente" },
  { time: "14:30", client: "Lívia", service: "Nail art delicada", price: 120, status: "pendente", color: "gold", note: "IA aguardando confirmação" },
  { time: "18:20", client: "Rafaela", service: "Blindagem", price: 95, status: "confirmado", color: "blue", note: "Agendado pela IA há 8 min" }
];

let waitlist = [
  { name: "Nanda", want: "Qualquer horário depois das 17h", value: "R$ 145" },
  { name: "Paula", want: "Sábado de manhã", value: "R$ 95" },
  { name: "Jéssica", want: "Encaixe para manutenção", value: "R$ 120" }
];

let conversations = [
  { name: "Rafaela", status: "Resolvida", text: "Agendamento validado na agenda antes da IA confirmar.", meta: "há 8 min · 4 mensagens" },
  { name: "Lívia", status: "Aguardando", text: "Cliente pediu desconto. A IA respondeu com carinho e manteve o preço.", meta: "há 17 min · 6 mensagens" },
  { name: "Renata", status: "Escalada", text: "Mensagem continha 'não gostei'. Você recebeu aviso para responder pessoalmente.", meta: "há 24 min · precisa de você" },
  { name: "Mônica", status: "Resolvida", text: "Dúvida sobre portaria, estacionamento e duração do serviço.", meta: "há 41 min · 5 mensagens" }
];

const finance = [
  { label: "Receita bruta", value: 9840, width: 100 },
  { label: "Deduções e comissão", value: -980, width: 34 },
  { label: "Custos variáveis", value: -1260, width: 42 },
  { label: "Despesas fixas", value: -760, width: 28 },
  { label: "O que sobrou pra você", value: 6840, width: 70 }
];

const services = [
  { name: "Blindagem", price: "R$ 95", duration: "1h20" },
  { name: "Banho de gel", price: "R$ 145", duration: "2h" },
  { name: "Manicure completa", price: "R$ 75", duration: "1h" },
  { name: "Nail art delicada", price: "R$ 120", duration: "1h40" }
];

const ops = [
  { area: "IA Quality", signal: "Resolução automática caiu para 71% em 3 usuárias", action: "Revisar escaladas hoje" },
  { area: "WhatsApp", signal: "2 contas desconectadas há mais de 1h", action: "Push de reconexão enviado" },
  { area: "Cobrança", signal: "8 pagamentos com falha D+3", action: "Enviar link Pix rápido" },
  { area: "Ativação", signal: "12 trials sem primeiro agendamento", action: "CS contata às 18h" }
];

let clients = [
  { name: "Ana Paula", last: "Blindagem", days: 48, total: 820, tag: "cliente fiel", suggestion: "quinta 15h40" },
  { name: "Fernanda", last: "Banho de gel", days: 62, total: 540, tag: "alto valor", suggestion: "sexta 10h" },
  { name: "Letícia", last: "Nail art delicada", days: 44, total: 360, tag: "volta por novidade", suggestion: "sábado 09h" },
  { name: "Priscila", last: "Manicure completa", days: 39, total: 290, tag: "precisa de lembrete", suggestion: "terça 18h20" }
];

const wizardSteps = [
  {
    title: "Identidade do seu negócio",
    html: `
      <div class="form-grid">
        <label><span class="field-label">Nome profissional</span><input class="text-input" value="Marina Alves Nails"></label>
        <label><span class="field-label">Cidade</span><input class="text-input" value="São Paulo"></label>
        <label><span class="field-label">Bairro</span><input class="text-input" value="Pinheiros"></label>
        <label><span class="field-label">Como você atende?</span><input class="text-input" value="Espaço próprio e domicílio"></label>
      </div>
    `,
    preview: [
      ["incoming", "Oi, você atende em Pinheiros?"],
      ["outgoing", "Atendo sim. Tenho espaço em Pinheiros e também consigo ir até você, dependendo do endereço."]
    ]
  },
  {
    title: "Serviços e preços",
    html: `
      <div class="service-list">
        ${services.map((service) => `
          <div class="service-item">
            <strong>${service.name}</strong>
            <span>${service.price} · ${service.duration}</span>
          </div>
        `).join("")}
      </div>
    `,
    preview: [
      ["incoming", "Quanto fica banho de gel?"],
      ["outgoing", "Banho de gel fica R$ 145 e dura por volta de 2h. Tenho horário amanhã às 10h ou 16h."]
    ]
  },
  {
    title: "Escolha o jeito da IA falar",
    html: `
      <p>Use uma linguagem que pareça sua, sem termos técnicos e sem inventar preço ou horário.</p>
      <div class="choice-grid">
        <button class="choice active">Caloroso e pessoal</button>
        <button class="choice">Profissional direto</button>
        <button class="choice">Descontraído com emoji</button>
      </div>
    `,
    preview: [
      ["incoming", "Tem horário hoje?"],
      ["outgoing", "Tenho sim, flor. Hoje consigo 14h30 ou 18h20. Quer que eu deixe um desses separado pra você?"]
    ]
  },
  {
    title: "Conectar WhatsApp",
    html: `
      <div class="rules-box">
        <strong>Seu WhatsApp será conectado por QR Code</strong>
        <span>Depois disso, a IA responde uma mensagem real para você ver o NailFlow trabalhando antes de sair da configuração.</span>
      </div>
      <button class="primary-button wide" id="connect-wa">Conectar WhatsApp</button>
    `,
    preview: [
      ["incoming", "Oi, quero marcar blindagem"],
      ["outgoing", "Perfeito. Blindagem fica R$ 95 e tenho 18h20 disponível hoje. Posso reservar pra você?"]
    ]
  }
];

const titles = {
  home: "Sua operação de hoje",
  onboarding: "Configurar sua IA",
  agenda: "Agenda inteligente",
  ia: "IA WhatsApp",
  financeiro: "Seu lucro real",
  perfil: "Perfil público",
  clientes: "Clientes e reativação",
  backoffice: "Operação NailFlow"
};

let currentStep = 0;

function renderTodayLabels() {
  const today = new Date();
  const dateLabel = today.toLocaleDateString("pt-BR", { day: "numeric", month: "long" });
  const weekdayLabel = today.toLocaleDateString("pt-BR", { weekday: "long" });

  document.getElementById("today-label").textContent = `Hoje, ${dateLabel}`;
  document.getElementById("weekday-label").textContent =
    weekdayLabel.charAt(0).toUpperCase() + weekdayLabel.slice(1);
}

function money(value) {
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL", maximumFractionDigits: 0 });
}

function saveState() {
  localStorage.setItem(storageKey, JSON.stringify(state));
}

function renderMetrics() {
  document.getElementById("metric-messages").textContent = state.messagesAnswered;
  document.getElementById("metric-saved-clients").textContent = state.savedClients;
}

function setView(view) {
  document.querySelectorAll(".view").forEach((section) => section.classList.remove("active-view"));
  document.getElementById(view).classList.add("active-view");
  document.querySelectorAll(".nav-item").forEach((item) => item.classList.toggle("active", item.dataset.view === view));
  document.getElementById("view-title").textContent = titles[view];
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function renderAppointments(target, detailed = false) {
  document.getElementById(target).innerHTML = appointments.map((item) => `
    <div class="timeline-item">
      <span class="time-pill">${item.time}</span>
      <div>
        <strong><span class="service-dot dot-${item.color}"></span>${item.client} · ${item.service}</strong>
        <small>${item.note}</small>
      </div>
      <strong>${money(item.price)}</strong>
      ${detailed ? `<small>Status: ${item.status}</small>` : ""}
    </div>
  `).join("");
}

function renderWaitlist() {
  document.getElementById("waitlist").innerHTML = waitlist.map((item) => `
    <div class="wait-item">
      <strong>${item.name}</strong>
      <p>${item.want}</p>
      <small>Valor provável: ${item.value}</small>
    </div>
  `).join("");
}

function renderConversations() {
  document.getElementById("conversation-list").innerHTML = conversations.map((item) => `
    <article class="conversation-item">
      <div class="conversation-top">
        <strong>${item.name}</strong>
        <span class="health ${item.status === "Resolvida" ? "good" : ""}">${item.status}</span>
      </div>
      <p>${item.text}</p>
      <span class="conversation-meta">${item.meta}</span>
      <div class="row-actions">
        <button class="secondary-button conversation-action" data-name="${item.name}" data-action="resolve">Resolvida</button>
        <button class="secondary-button conversation-action" data-name="${item.name}" data-action="escalate">Precisa de mim</button>
      </div>
    </article>
  `).join("");
}

function renderFinance() {
  document.getElementById("finance-bars").innerHTML = finance.map((item) => `
    <div class="bar-row">
      <div class="bar-meta">
        <span>${item.label}</span>
        <span>${money(item.value)}</span>
      </div>
      <div class="bar-track"><div class="bar-fill" style="width: ${item.width}%"></div></div>
    </div>
  `).join("");
}

function renderServices() {
  document.getElementById("profile-services").innerHTML = services.map((service) => `
    <div class="service-item">
      <strong>${service.name}</strong>
      <span>${service.price} · ${service.duration}</span>
    </div>
  `).join("");
}

function renderOps() {
  document.getElementById("ops-table").innerHTML = ops.map((row) => `
    <div class="ops-row">
      <strong>${row.area}</strong>
      <span>${row.signal}</span>
      <button class="secondary-button">${row.action}</button>
    </div>
  `).join("");
}

function renderClients() {
  document.getElementById("client-list").innerHTML = clients.map((client) => `
    <article class="client-item">
      <div>
        <strong>${client.name}</strong>
        <span>${client.last} · ${client.days} dias sem voltar · ${money(client.total)} no histórico</span>
      </div>
      <div class="client-actions">
        <span class="tag">${client.tag}</span>
        <button class="secondary-button reactivate-client" data-name="${client.name}">Preparar mensagem</button>
      </div>
    </article>
  `).join("");
}

function renderWizard() {
  const step = wizardSteps[currentStep];
  document.getElementById("step-number").textContent = currentStep + 1;
  document.getElementById("progress-bar").style.width = `${((currentStep + 1) / wizardSteps.length) * 100}%`;
  document.getElementById("wizard-content").innerHTML = `<h2>${step.title}</h2>${step.html}`;
  document.getElementById("preview-chat").innerHTML = step.preview.map(([type, text]) => `<div class="bubble ${type}">${text}</div>`).join("");
  document.getElementById("prev-step").disabled = currentStep === 0;
  document.getElementById("next-step").textContent = currentStep === wizardSteps.length - 1 ? "Finalizar" : "Continuar";
}

function updatePrice() {
  const cost = Number(document.getElementById("cost-input").value || 0);
  const desiredMargin = Number(document.getElementById("margin-input").value || 1);
  const margin = Math.min(Math.max(desiredMargin, 1), 95) / 100;
  const price = Math.ceil(cost / (1 - margin));
  document.getElementById("recommended-price").textContent = money(price);
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.textContent = message;
  toast.classList.add("show");
  window.setTimeout(() => toast.classList.remove("show"), 3200);
}

document.querySelectorAll("[data-view]").forEach((button) => {
  button.addEventListener("click", () => setView(button.dataset.view));
});

document.getElementById("next-step").addEventListener("click", () => {
  if (currentStep < wizardSteps.length - 1) {
    currentStep += 1;
    renderWizard();
  } else {
    setView("home");
    state.onboardingDone = true;
    saveState();
    showToast("Pronto: sua IA já pode responder enquanto você atende.");
  }
});

document.getElementById("prev-step").addEventListener("click", () => {
  currentStep = Math.max(0, currentStep - 1);
  renderWizard();
});

document.getElementById("simulate-message").addEventListener("click", () => {
  state.messagesAnswered += 1;
  saveState();
  conversations.unshift({
    name: "Nova cliente",
    status: "Resolvida",
    text: "A IA validou preço, achou horário livre e sugeriu 15h40.",
    meta: "agora · resposta em 4s"
  });
  renderConversations();
  renderMetrics();
  showToast("Mensagem respondida pela IA em 4 segundos.");
});

document.getElementById("add-slot").addEventListener("click", () => {
  appointments.push({ time: "19:40", client: "Encaixe livre", service: "Disponível", price: 0, status: "aberto", color: "teal", note: "A IA pode oferecer este horário" });
  renderAppointments("today-list");
  renderAppointments("agenda-list", true);
  showToast("Novo horário aberto para a IA oferecer às clientes.");
});

document.querySelector(".segmented").addEventListener("click", (event) => {
  if (!event.target.matches("[data-agenda-view]")) return;
  document.querySelectorAll("[data-agenda-view]").forEach((button) => button.classList.remove("active"));
  event.target.classList.add("active");

  const view = event.target.dataset.agendaView;
  const headings = {
    Dia: "Atendimentos de hoje",
    Semana: "Atendimentos da semana",
    Mês: "Atendimentos do mês"
  };
  document.getElementById("agenda-heading").textContent = headings[view];
  showToast(`Agenda em visualização de ${view.toLowerCase()}.`);
});

document.getElementById("conversation-list").addEventListener("click", (event) => {
  if (!event.target.classList.contains("conversation-action")) return;
  const name = event.target.dataset.name;
  const action = event.target.dataset.action;
  conversations = conversations.map((conversation) => {
    if (conversation.name !== name) return conversation;
    if (action === "resolve") {
      return { ...conversation, status: "Resolvida", meta: "atualizado agora · resolvida por você" };
    }
    return { ...conversation, status: "Escalada", meta: "atualizado agora · precisa da profissional" };
  });
  renderConversations();
  showToast(action === "resolve" ? "Conversa marcada como resolvida." : "Conversa separada para você responder.");
});

document.getElementById("generate-reactivation").addEventListener("click", () => {
  state.savedClients += 1;
  saveState();
  renderMetrics();
  showToast("Mensagens de reativação criadas com horários reais da agenda.");
});

document.getElementById("client-list").addEventListener("click", (event) => {
  if (!event.target.classList.contains("reactivate-client")) return;
  const client = clients.find((item) => item.name === event.target.dataset.name);
  if (!client) return;
  document.getElementById("reactivation-preview").innerHTML = `
    <div class="bubble outgoing">Oi, ${client.name.split(" ")[0]}. Vi que já faz ${client.days} dias desde seu último atendimento de ${client.last}. Tenho ${client.suggestion} livre esta semana. Quer que eu deixe separado pra você?</div>
  `;
  showToast(`Mensagem para ${client.name} pronta para envio.`);
});

document.getElementById("tone-options").addEventListener("click", (event) => {
  if (!event.target.classList.contains("choice")) return;
  document.querySelectorAll("#tone-options .choice").forEach((choice) => choice.classList.remove("active"));
  event.target.classList.add("active");
  showToast(`Tom atualizado: ${event.target.textContent}.`);
});

document.addEventListener("click", (event) => {
  if (event.target.id === "connect-wa") {
    showToast("QR Code conectado. A primeira resposta real já está pronta.");
  }
});

document.getElementById("cost-input").addEventListener("input", updatePrice);
document.getElementById("margin-input").addEventListener("input", updatePrice);

renderTodayLabels();
renderAppointments("today-list");
renderAppointments("agenda-list", true);
renderMetrics();
renderWaitlist();
renderConversations();
renderFinance();
renderServices();
renderOps();
renderClients();
renderWizard();
updatePrice();
