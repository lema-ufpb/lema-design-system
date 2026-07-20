export type UILocale = "en-US" | "pt-BR" | "es-ES" | "fr-FR"

export const UI_I18N: Record<
  UILocale,
  {
    dialog: { close: string; title: string }
    spinner: { loading: string }
    pagination: {
      navLabel: string
      previous: string
      next: string
      goToPrevious: string
      goToNext: string
      morePages: string
    }
    counter: { groupLabel: string; decrease: string; increase: string }
    command: { title: string; description: string }
    selectList: { select: string; selected: string; clearSearch: string }
    inputPassword: { hide: string; show: string }
    progressCircular: { label: string }
    riskLevelBar: { value: string }
    headerSearch: { open: string; close: string }
    navDots: { sectionNav: string; goTo: string }
    footerMenu: { label: string }
    stepProgress: { label: string }
    combobox: {
      placeholder: string
      searchPlaceholder: string
      noResults: string
      noOptions: string
      clearSearch: string
      clearSelection: string
      clearAll: string
      selected: string
    }
    dashbox: { toolbar: Record<string, string>; status: Record<string, string> }
    dashrow: { resizePanels: string }
    treemap: { breadcrumb: string; explore: string }
    boxplot: {
      max: string
      q3: string
      median: string
      mean: string
      q1: string
      min: string
    }
    scatterChart: { rangeStart: string; rangeEnd: string }
    candlestick: {
      open: string
      high: string
      low: string
      close: string
      volume: string
      bullish: string
      bearish: string
      ma: string
    }
    emptyState: { noData: string; dataWillAppear: string }
    cardStats: { thisPeriod: string; lastPeriod: string; noComparison: string }
    pieChart: { total: string }
    scoreRow: { loading: string; scoreLabel: string }
    searchBar: {
      placeholder: string
      label: string
      clear: string
      startVoice: string
      stopVoice: string
    }
    modal: {
      confirm: string
      cancel: string
      minimize: string
      maximize: string
    }
    dataTable: {
      searchPlaceholder: string
      noData: string
      noDataDescription: string
      of: string
      rows: string
      rowsPerPage: string
      tableWithRows: string
    }
    pageLoader: { loading: string }
    pillGroup: { filterLabel: string }
    tabs: { tabList: string }
    toggleTheme: {
      light: string
      dark: string
      system: string
      trigger: string
    }
    scrollToTop: {
      label: string
      tooltip: string
    }
    carousel: {
      previous: string
      next: string
      slide: string
      goToSlide: string
      progress: string
    }
    badge: {
      remove: string
    }
    empty: {
      noData: string
      noDataDescription: string
      noResults: string
      noResultsDescription: string
      search: string
      searchDescription: string
      error: string
      errorDescription: string
    }
    switch: {
      toggle: string
    }
    accordion: {
      expand: string
      collapse: string
    }
    input: {
      clear: string
    }
    avatar: {
      online: string
      busy: string
      away: string
      offline: string
      more: string
    }
    select: {
      placeholder: string
      search: string
      noResults: string
      create: string
      selected: string
    }
    cardStatGauge: {
      poor: string
      fair: string
      good: string
      excellent: string
      noReading: string
      pending: string
    }
    cardStatHighlight: {
      noSpotlight: string
      spotlightDescription: string
    }
    cardStatList: {
      listEmpty: string
      listEmptyDescription: string
    }
    cardStat: {
      nothingToMeasure: string
    }
    cardStatSparkline: {
      noHistory: string
    }
    cardStatProgress: {
      noGoalSet: string
    }
    searchCombo: {
      placeholder: string
      label: string
      noResults: string
      clearSearch: string
      searchByVoice: string
      stopRecording: string
    }
    progressBar: {
      label: string
    }
  }
> = {
  "en-US": {
    dialog: { close: "Close", title: "Dialog" },
    spinner: { loading: "Loading" },
    pagination: {
      navLabel: "pagination",
      previous: "Previous",
      next: "Next",
      goToPrevious: "Go to previous page",
      goToNext: "Go to next page",
      morePages: "More pages",
    },
    counter: {
      groupLabel: "Counter",
      decrease: "Decrease value",
      increase: "Increase value",
    },
    command: {
      title: "Command Palette",
      description: "Search for a command to run...",
    },
    selectList: {
      select: "Select",
      selected: "Selected",
      clearSearch: "Clear search",
    },
    inputPassword: { hide: "Hide password", show: "Show password" },
    progressCircular: { label: "Progress" },
    riskLevelBar: { value: "Value" },
    headerSearch: { open: "Open search", close: "Close search" },
    navDots: { sectionNav: "Section navigation", goTo: "Go to" },
    footerMenu: { label: "Footer Navigation" },
    stepProgress: { label: "Progress" },
    combobox: {
      placeholder: "Select…",
      searchPlaceholder: "Search…",
      noResults: "No results.",
      noOptions: "No options available.",
      clearSearch: "Clear search",
      clearSelection: "Clear selection",
      clearAll: "Clear all",
      selected: "selected",
    },
    dashbox: {
      toolbar: {
        refresh: "Refresh",
        collapse: "Collapse",
        expand: "Expand",
        fullscreen: "Fullscreen",
        restore: "Restore",
      },
      status: {
        live: "Live",
        warning: "Warning",
        error: "Error",
        idle: "Idle",
      },
    },
    dashrow: { resizePanels: "Resize panels" },
    treemap: { breadcrumb: "Treemap breadcrumb", explore: "click to explore" },
    boxplot: {
      max: "Max",
      q3: "Q3",
      median: "Median",
      mean: "Mean",
      q1: "Q1",
      min: "Min",
    },
    scatterChart: { rangeStart: "Range start", rangeEnd: "Range end" },
    candlestick: {
      open: "Open",
      high: "High",
      low: "Low",
      close: "Close",
      volume: "Volume",
      bullish: "Bullish",
      bearish: "Bearish",
      ma: "MA",
    },
    emptyState: {
      noData: "No data to display",
      dataWillAppear: "Data will appear here once available.",
    },
    cardStats: {
      thisPeriod: "This period",
      lastPeriod: "Last period",
      noComparison: "No comparison data",
    },
    pieChart: { total: "Total" },
    scoreRow: { loading: "Loading", scoreLabel: "Score" },
    searchBar: {
      placeholder: "Search…",
      label: "Search",
      clear: "Clear search",
      startVoice: "Search by voice",
      stopVoice: "Stop recording",
    },
    modal: {
      confirm: "Confirm",
      cancel: "Cancel",
      minimize: "Minimize",
      maximize: "Maximize",
    },
    dataTable: {
      searchPlaceholder: "Search…",
      noData: "No data found",
      noDataDescription: "Data will appear here once available.",
      of: "of",
      rows: "rows",
      rowsPerPage: "Rows per page",
      tableWithRows: "Table with",
    },
    pageLoader: { loading: "Loading…" },
    pillGroup: { filterLabel: "Filter by" },
    tabs: { tabList: "Tab list" },
    toggleTheme: {
      light: "Light",
      dark: "Dark",
      system: "System",
      trigger: "Toggle theme",
    },
    scrollToTop: {
      label: "Scroll to top",
      tooltip: "Back to top",
    },
    carousel: {
      previous: "Previous",
      next: "Next",
      slide: "Slide",
      goToSlide: "Go to slide",
      progress: "Progress",
    },
    badge: {
      remove: "Remove",
    },
    empty: {
      noData: "No data to display",
      noDataDescription: "Data will appear here once available.",
      noResults: "No results found",
      noResultsDescription: "Try adjusting your search or filters.",
      search: "Search",
      searchDescription: "Enter a term to search.",
      error: "Something went wrong",
      errorDescription: "Please try again later.",
    },
    switch: {
      toggle: "Toggle",
    },
    accordion: {
      expand: "Expand",
      collapse: "Collapse",
    },
    input: {
      clear: "Clear",
    },
    avatar: {
      online: "Online",
      busy: "Busy",
      away: "Away",
      offline: "Offline",
      more: "more",
    },
    select: {
      placeholder: "Select…",
      search: "Search…",
      noResults: "No results found.",
      create: "Create",
      selected: "selected",
    },
    cardStatGauge: {
      poor: "Poor",
      fair: "Fair",
      good: "Good",
      excellent: "Excellent",
      noReading: "No reading",
      pending: "Pending",
    },
    cardStatHighlight: {
      noSpotlight: "No spotlight yet",
      spotlightDescription: "Your headline KPI will appear here",
    },
    cardStatList: {
      listEmpty: "List is empty",
      listEmptyDescription: "Add metrics to start tracking",
    },
    cardStat: {
      nothingToMeasure: "Nothing to measure yet",
    },
    cardStatSparkline: {
      noHistory: "No history yet",
    },
    cardStatProgress: {
      noGoalSet: "No goal set yet",
    },
    searchCombo: {
      placeholder: "Search…",
      label: "Search",
      noResults: "No results found.",
      clearSearch: "Clear search",
      searchByVoice: "Search by voice",
      stopRecording: "Stop recording",
    },
    progressBar: {
      label: "Progress",
    },
  },
  "pt-BR": {
    dialog: { close: "Fechar", title: "Diálogo" },
    spinner: { loading: "Carregando" },
    pagination: {
      navLabel: "paginação",
      previous: "Anterior",
      next: "Próximo",
      goToPrevious: "Ir para página anterior",
      goToNext: "Ir para próxima página",
      morePages: "Mais páginas",
    },
    counter: {
      groupLabel: "Contador",
      decrease: "Diminuir valor",
      increase: "Aumentar valor",
    },
    command: {
      title: "Paleta de Comandos",
      description: "Pesquise um comando para executar...",
    },
    selectList: {
      select: "Selecionar",
      selected: "Selecionado",
      clearSearch: "Limpar pesquisa",
    },
    inputPassword: { hide: "Ocultar senha", show: "Exibir senha" },
    progressCircular: { label: "Progresso" },
    riskLevelBar: { value: "Valor" },
    headerSearch: { open: "Abrir pesquisa", close: "Fechar pesquisa" },
    navDots: { sectionNav: "Navegação de seção", goTo: "Ir para" },
    footerMenu: { label: "Navegação do Rodapé" },
    stepProgress: { label: "Progresso" },
    combobox: {
      placeholder: "Selecionar…",
      searchPlaceholder: "Pesquisar…",
      noResults: "Nenhum resultado.",
      noOptions: "Nenhuma opção disponível.",
      clearSearch: "Limpar pesquisa",
      clearSelection: "Limpar seleção",
      clearAll: "Limpar tudo",
      selected: "selecionado(s)",
    },
    dashbox: {
      toolbar: {
        refresh: "Atualizar",
        collapse: "Recolher",
        expand: "Expandir",
        fullscreen: "Tela Cheia",
        restore: "Restaurar",
      },
      status: {
        live: "Online",
        warning: "Alerta",
        error: "Erro",
        idle: "Inativo",
      },
    },
    dashrow: { resizePanels: "Redimensionar painéis" },
    treemap: {
      breadcrumb: "Navegação do Treemap",
      explore: "clique para explorar",
    },
    boxplot: {
      max: "Máx",
      q3: "Q3",
      median: "Mediana",
      mean: "Média",
      q1: "Q1",
      min: "Mín",
    },
    scatterChart: {
      rangeStart: "Início do intervalo",
      rangeEnd: "Fim do intervalo",
    },
    candlestick: {
      open: "Abertura",
      high: "Máxima",
      low: "Mínima",
      close: "Fechamento",
      volume: "Volume",
      bullish: "Alta",
      bearish: "Baixa",
      ma: "MM",
    },
    emptyState: {
      noData: "Nenhum dado disponível",
      dataWillAppear: "Os dados aparecerão aqui quando estiverem disponíveis.",
    },
    cardStats: {
      thisPeriod: "Este período",
      lastPeriod: "Período anterior",
      noComparison: "Sem dados de comparação",
    },
    pieChart: { total: "Total" },
    scoreRow: { loading: "Carregando", scoreLabel: "Pontuação" },
    searchBar: {
      placeholder: "Buscar…",
      label: "Buscar",
      clear: "Limpar busca",
      startVoice: "Buscar por voz",
      stopVoice: "Parar gravação",
    },
    modal: {
      confirm: "Confirmar",
      cancel: "Cancelar",
      minimize: "Minimizar",
      maximize: "Maximizar",
    },
    dataTable: {
      searchPlaceholder: "Buscar…",
      noData: "Nenhum dado encontrado",
      noDataDescription:
        "Os dados aparecerão aqui quando estiverem disponíveis.",
      of: "de",
      rows: "linhas",
      rowsPerPage: "Linhas por página",
      tableWithRows: "Tabela com",
    },
    pageLoader: { loading: "Carregando…" },
    pillGroup: { filterLabel: "Filtrar por" },
    tabs: { tabList: "Lista de abas" },
    toggleTheme: {
      light: "Claro",
      dark: "Escuro",
      system: "Sistema",
      trigger: "Alternar tema",
    },
    scrollToTop: {
      label: "Voltar ao topo",
      tooltip: "Voltar ao topo",
    },
    carousel: {
      previous: "Anterior",
      next: "Próximo",
      slide: "Slide",
      goToSlide: "Ir para o slide",
      progress: "Progresso",
    },
    badge: {
      remove: "Remover",
    },
    empty: {
      noData: "Nenhum dado disponível",
      noDataDescription:
        "Os dados aparecerão aqui quando estiverem disponíveis.",
      noResults: "Nenhum resultado encontrado",
      noResultsDescription: "Tente ajustar sua pesquisa ou filtros.",
      search: "Buscar",
      searchDescription: "Digite um termo para buscar.",
      error: "Algo deu errado",
      errorDescription: "Tente novamente mais tarde.",
    },
    switch: {
      toggle: "Alternar",
    },
    accordion: {
      expand: "Expandir",
      collapse: "Recolher",
    },
    input: {
      clear: "Limpar",
    },
    avatar: {
      online: "Online",
      busy: "Ocupado",
      away: "Ausente",
      offline: "Offline",
      more: "mais",
    },
    select: {
      placeholder: "Selecionar…",
      search: "Pesquisar…",
      noResults: "Nenhum resultado encontrado.",
      create: "Criar",
      selected: "selecionado(s)",
    },
    cardStatGauge: {
      poor: "Ruim",
      fair: "Regular",
      good: "Bom",
      excellent: "Excelente",
      noReading: "Sem leitura",
      pending: "Pendente",
    },
    cardStatHighlight: {
      noSpotlight: "Nenhum destaque ainda",
      spotlightDescription: "Seu KPI principal aparecerá aqui",
    },
    cardStatList: {
      listEmpty: "Lista vazia",
      listEmptyDescription: "Adicione métricas para começar",
    },
    cardStat: {
      nothingToMeasure: "Nada a medir ainda",
    },
    cardStatSparkline: {
      noHistory: "Nenhum histórico ainda",
    },
    cardStatProgress: {
      noGoalSet: "Nenhuma meta definida",
    },
    searchCombo: {
      placeholder: "Pesquisar…",
      label: "Pesquisar",
      noResults: "Nenhum resultado encontrado.",
      clearSearch: "Limpar pesquisa",
      searchByVoice: "Pesquisar por voz",
      stopRecording: "Parar gravação",
    },
    progressBar: {
      label: "Progresso",
    },
  },
  "es-ES": {
    dialog: { close: "Cerrar", title: "Diálogo" },
    spinner: { loading: "Cargando" },
    pagination: {
      navLabel: "paginación",
      previous: "Anterior",
      next: "Siguiente",
      goToPrevious: "Ir a página anterior",
      goToNext: "Ir a página siguiente",
      morePages: "Más páginas",
    },
    counter: {
      groupLabel: "Contador",
      decrease: "Disminuir valor",
      increase: "Aumentar valor",
    },
    command: {
      title: "Paleta de Comandos",
      description: "Busque un comando para ejecutar...",
    },
    selectList: {
      select: "Seleccionar",
      selected: "Seleccionado",
      clearSearch: "Limpiar búsqueda",
    },
    inputPassword: { hide: "Ocultar contraseña", show: "Mostrar contraseña" },
    progressCircular: { label: "Progreso" },
    riskLevelBar: { value: "Valor" },
    headerSearch: { open: "Abrir búsqueda", close: "Cerrar búsqueda" },
    navDots: { sectionNav: "Navegación de sección", goTo: "Ir a" },
    footerMenu: { label: "Navegación del Pie" },
    stepProgress: { label: "Progreso" },
    combobox: {
      placeholder: "Seleccionar…",
      searchPlaceholder: "Buscar…",
      noResults: "Sin resultados.",
      noOptions: "No hay opciones disponibles.",
      clearSearch: "Limpiar búsqueda",
      clearSelection: "Limpiar selección",
      clearAll: "Limpiar todo",
      selected: "seleccionado(s)",
    },
    dashbox: {
      toolbar: {
        refresh: "Actualizar",
        collapse: "Colapsar",
        expand: "Expandir",
        fullscreen: "Pantalla Completa",
        restore: "Restaurar",
      },
      status: {
        live: "En Vivo",
        warning: "Advertencia",
        error: "Error",
        idle: "Inactivo",
      },
    },
    dashrow: { resizePanels: "Redimensionar paneles" },
    treemap: {
      breadcrumb: "Navegación del Treemap",
      explore: "clic para explorar",
    },
    boxplot: {
      max: "Máx",
      q3: "Q3",
      median: "Mediana",
      mean: "Media",
      q1: "Q1",
      min: "Mín",
    },
    scatterChart: { rangeStart: "Inicio del rango", rangeEnd: "Fin del rango" },
    candlestick: {
      open: "Apertura",
      high: "Máximo",
      low: "Mínimo",
      close: "Cierre",
      volume: "Volumen",
      bullish: "Alcista",
      bearish: "Bajista",
      ma: "MM",
    },
    emptyState: {
      noData: "Sin datos para mostrar",
      dataWillAppear: "Los datos aparecerán aquí cuando estén disponibles.",
    },
    cardStats: {
      thisPeriod: "Este período",
      lastPeriod: "Período anterior",
      noComparison: "Sin datos de comparación",
    },
    pieChart: { total: "Total" },
    scoreRow: { loading: "Cargando", scoreLabel: "Puntuación" },
    searchBar: {
      placeholder: "Buscar…",
      label: "Buscar",
      clear: "Limpiar búsqueda",
      startVoice: "Buscar por voz",
      stopVoice: "Detener grabación",
    },
    modal: {
      confirm: "Confirmar",
      cancel: "Cancelar",
      minimize: "Minimizar",
      maximize: "Maximizar",
    },
    dataTable: {
      searchPlaceholder: "Buscar…",
      noData: "Sin datos",
      noDataDescription: "Los datos aparecerán aquí cuando estén disponibles.",
      of: "de",
      rows: "filas",
      rowsPerPage: "Filas por página",
      tableWithRows: "Tabla con",
    },
    pageLoader: { loading: "Cargando…" },
    pillGroup: { filterLabel: "Filtrar por" },
    tabs: { tabList: "Lista de pestañas" },
    toggleTheme: {
      light: "Claro",
      dark: "Oscuro",
      system: "Sistema",
      trigger: "Cambiar tema",
    },
    scrollToTop: {
      label: "Volver arriba",
      tooltip: "Volver arriba",
    },
    carousel: {
      previous: "Anterior",
      next: "Siguiente",
      slide: "Diapositiva",
      goToSlide: "Ir a la diapositiva",
      progress: "Progreso",
    },
    badge: {
      remove: "Eliminar",
    },
    empty: {
      noData: "Sin datos para mostrar",
      noDataDescription: "Los datos aparecerán aquí cuando estén disponibles.",
      noResults: "Sin resultados",
      noResultsDescription: "Intente ajustar su búsqueda o filtros.",
      search: "Buscar",
      searchDescription: "Ingrese un término para buscar.",
      error: "Algo salió mal",
      errorDescription: "Intente de nuevo más tarde.",
    },
    switch: {
      toggle: "Alternar",
    },
    accordion: {
      expand: "Expandir",
      collapse: "Colapsar",
    },
    input: {
      clear: "Limpiar",
    },
    avatar: {
      online: "En línea",
      busy: "Ocupado",
      away: "Ausente",
      offline: "Desconectado",
      more: "más",
    },
    select: {
      placeholder: "Seleccionar…",
      search: "Buscar…",
      noResults: "Sin resultados.",
      create: "Crear",
      selected: "seleccionado(s)",
    },
    cardStatGauge: {
      poor: "Malo",
      fair: "Regular",
      good: "Bueno",
      excellent: "Excelente",
      noReading: "Sin lectura",
      pending: "Pendiente",
    },
    cardStatHighlight: {
      noSpotlight: "Sin destacado aún",
      spotlightDescription: "Su KPI principal aparecerá aquí",
    },
    cardStatList: {
      listEmpty: "Lista vacía",
      listEmptyDescription: "Agregue métricas para empezar",
    },
    cardStat: {
      nothingToMeasure: "Nada que medir aún",
    },
    cardStatSparkline: {
      noHistory: "Sin historial aún",
    },
    cardStatProgress: {
      noGoalSet: "Ninguna meta establecida",
    },
    searchCombo: {
      placeholder: "Buscar…",
      label: "Buscar",
      noResults: "Sin resultados.",
      clearSearch: "Limpiar búsqueda",
      searchByVoice: "Buscar por voz",
      stopRecording: "Detener grabación",
    },
    progressBar: {
      label: "Progreso",
    },
  },
  "fr-FR": {
    dialog: { close: "Fermer", title: "Dialogue" },
    spinner: { loading: "Chargement" },
    pagination: {
      navLabel: "pagination",
      previous: "Précédent",
      next: "Suivant",
      goToPrevious: "Aller à la page précédente",
      goToNext: "Aller à la page suivante",
      morePages: "Plus de pages",
    },
    counter: {
      groupLabel: "Compteur",
      decrease: "Diminuer la valeur",
      increase: "Augmenter la valeur",
    },
    command: {
      title: "Palette de Commandes",
      description: "Recherchez une commande à exécuter...",
    },
    selectList: {
      select: "Sélectionner",
      selected: "Sélectionné",
      clearSearch: "Effacer la recherche",
    },
    inputPassword: {
      hide: "Masquer le mot de passe",
      show: "Afficher le mot de passe",
    },
    progressCircular: { label: "Progression" },
    riskLevelBar: { value: "Valeur" },
    headerSearch: { open: "Ouvrir la recherche", close: "Fermer la recherche" },
    navDots: { sectionNav: "Navigation de section", goTo: "Aller à" },
    footerMenu: { label: "Navigation du Pied de Page" },
    stepProgress: { label: "Progression" },
    combobox: {
      placeholder: "Sélectionner…",
      searchPlaceholder: "Rechercher…",
      noResults: "Aucun résultat.",
      noOptions: "Aucune option disponible.",
      clearSearch: "Effacer la recherche",
      clearSelection: "Effacer la sélection",
      clearAll: "Tout effacer",
      selected: "sélectionné(s)",
    },
    dashbox: {
      toolbar: {
        refresh: "Actualiser",
        collapse: "Réduire",
        expand: "Agrandir",
        fullscreen: "Plein Écran",
        restore: "Restaurer",
      },
      status: {
        live: "En Direct",
        warning: "Avertissement",
        error: "Erreur",
        idle: "Inactif",
      },
    },
    dashrow: { resizePanels: "Redimensionner les panneaux" },
    treemap: {
      breadcrumb: "Navigation Treemap",
      explore: "cliquez pour explorer",
    },
    boxplot: {
      max: "Max",
      q3: "Q3",
      median: "Médiane",
      mean: "Moyenne",
      q1: "Q1",
      min: "Min",
    },
    scatterChart: {
      rangeStart: "Début de la plage",
      rangeEnd: "Fin de la plage",
    },
    candlestick: {
      open: "Ouverture",
      high: "Plus Haut",
      low: "Plus Bas",
      close: "Clôture",
      volume: "Volume",
      bullish: "Haussier",
      bearish: "Baissier",
      ma: "MM",
    },
    emptyState: {
      noData: "Aucune donnée à afficher",
      dataWillAppear:
        "Les données apparaîtront ici lorsqu'elles seront disponibles.",
    },
    cardStats: {
      thisPeriod: "Cette période",
      lastPeriod: "Période précédente",
      noComparison: "Aucune donnée de comparaison",
    },
    pieChart: { total: "Total" },
    scoreRow: { loading: "Chargement", scoreLabel: "Score" },
    searchBar: {
      placeholder: "Rechercher…",
      label: "Rechercher",
      clear: "Effacer la recherche",
      startVoice: "Rechercher par voix",
      stopVoice: "Arrêter l'enregistrement",
    },
    modal: {
      confirm: "Confirmer",
      cancel: "Annuler",
      minimize: "Minimiser",
      maximize: "Maximiser",
    },
    dataTable: {
      searchPlaceholder: "Rechercher…",
      noData: "Aucune donnée",
      noDataDescription:
        "Les données apparaîtront ici lorsqu'elles seront disponibles.",
      of: "sur",
      rows: "lignes",
      rowsPerPage: "Lignes par page",
      tableWithRows: "Tableau avec",
    },
    pageLoader: { loading: "Chargement…" },
    pillGroup: { filterLabel: "Filtrer par" },
    tabs: { tabList: "Liste d'onglets" },
    toggleTheme: {
      light: "Clair",
      dark: "Sombre",
      system: "Système",
      trigger: "Changer de thème",
    },
    scrollToTop: {
      label: "Retour en haut",
      tooltip: "Retour en haut",
    },
    carousel: {
      previous: "Précédent",
      next: "Suivant",
      slide: "Diapositive",
      goToSlide: "Aller à la diapositive",
      progress: "Progression",
    },
    badge: {
      remove: "Supprimer",
    },
    empty: {
      noData: "Aucune donnée à afficher",
      noDataDescription:
        "Les données apparaîtront ici lorsqu'elles seront disponibles.",
      noResults: "Aucun résultat",
      noResultsDescription: "Essayez d'ajuster votre recherche ou vos filtres.",
      search: "Rechercher",
      searchDescription: "Entrez un terme de recherche.",
      error: "Une erreur est survenue",
      errorDescription: "Veuillez réessayer plus tard.",
    },
    switch: {
      toggle: "Basculer",
    },
    accordion: {
      expand: "Développer",
      collapse: "Réduire",
    },
    input: {
      clear: "Effacer",
    },
    avatar: {
      online: "En ligne",
      busy: "Occupé",
      away: "Absent",
      offline: "Hors ligne",
      more: "plus",
    },
    select: {
      placeholder: "Sélectionner…",
      search: "Rechercher…",
      noResults: "Aucun résultat.",
      create: "Créer",
      selected: "sélectionné(s)",
    },
    cardStatGauge: {
      poor: "Mauvais",
      fair: "Moyen",
      good: "Bon",
      excellent: "Excellent",
      noReading: "Aucune lecture",
      pending: "En attente",
    },
    cardStatHighlight: {
      noSpotlight: "Aucun point fort",
      spotlightDescription: "Votre KPI principal apparaîtra ici",
    },
    cardStatList: {
      listEmpty: "Liste vide",
      listEmptyDescription: "Ajoutez des métriques pour commencer",
    },
    cardStat: {
      nothingToMeasure: "Rien à mesurer",
    },
    cardStatSparkline: {
      noHistory: "Aucun historique",
    },
    cardStatProgress: {
      noGoalSet: "Aucun objectif défini",
    },
    searchCombo: {
      placeholder: "Rechercher…",
      label: "Rechercher",
      noResults: "Aucun résultat.",
      clearSearch: "Effacer la recherche",
      searchByVoice: "Rechercher par voix",
      stopRecording: "Arrêter l'enregistrement",
    },
    progressBar: {
      label: "Progression",
    },
  },
}

export type AbbrevScale = { threshold: number; divisor: number; suffix: string }

export const ABBREV_SCALES: Record<UILocale, AbbrevScale[]> = {
  "pt-BR": [
    { threshold: 1e12, divisor: 1e12, suffix: " tri" },
    { threshold: 1e9, divisor: 1e9, suffix: " bi" },
    { threshold: 1e6, divisor: 1e6, suffix: " mi" },
    { threshold: 1e3, divisor: 1e3, suffix: " mil" },
  ],
  "en-US": [
    { threshold: 1e12, divisor: 1e12, suffix: "T" },
    { threshold: 1e9, divisor: 1e9, suffix: "B" },
    { threshold: 1e6, divisor: 1e6, suffix: "M" },
    { threshold: 1e3, divisor: 1e3, suffix: "K" },
  ],
  "es-ES": [
    { threshold: 1e12, divisor: 1e12, suffix: " B" },
    { threshold: 1e9, divisor: 1e9, suffix: " M" },
    { threshold: 1e6, divisor: 1e6, suffix: " M" },
    { threshold: 1e3, divisor: 1e3, suffix: " K" },
  ],
  "fr-FR": [
    { threshold: 1e12, divisor: 1e12, suffix: " T" },
    { threshold: 1e9, divisor: 1e9, suffix: " Md" },
    { threshold: 1e6, divisor: 1e6, suffix: " M" },
    { threshold: 1e3, divisor: 1e3, suffix: " k" },
  ],
}
