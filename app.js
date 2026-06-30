// FIREBASE
const firebaseConfig = {
    apiKey: "AIzaSyARQ40yqOZKa7dJE4655oR2EAUcLCUSCik",
    authDomain: "bespredelanet-13204.firebaseapp.com",
    projectId: "bespredelanet-13204",
    storageBucket: "bespredelanet-13204.firebasestorage.app",
    messagingSenderId: "548204853503",
    appId: "1:548204853503:web:35baade27cd3f6aff5b4ca"
};

firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// ====================================================================
// КОНСТАНТЫ
// ====================================================================
const ROOT_UID = 'xSdPRiSvsbdPI9eTOUh4egITh5Y2';
const ROOT_EMAIL = 'kowtunov.k@yandex.ru';

const RESERVED_NAMES = ['root','admin','administrator','moderator','mod','owner','создатель','админ','администратор','модератор','мод','владелец','superadmin','главный','boss','chief','director','support','помощь','помощник','helper','system','система'];

// ====================================================================
// 130+ ПРАВ ДОСТУПА
// ====================================================================
const PERMISSIONS_LIST = [
    {key:'canViewUsers',label:'👥 Просмотр пользователей',cat:'users'},
    {key:'canCreateUsers',label:'➕ Создание пользователей',cat:'users'},
    {key:'canEditUsers',label:'✏️ Редактирование пользователей',cat:'users'},
    {key:'canDeleteUsers',label:'🗑 Удаление пользователей',cat:'users'},
    {key:'canBanUsers',label:'🚫 Бан пользователей',cat:'users'},
    {key:'canMuteUsers',label:'🔇 Мут пользователей',cat:'users'},
    {key:'canKickUsers',label:'👢 Кик пользователей',cat:'users'},
    {key:'canChangeRoles',label:'🎭 Изменение ролей',cat:'users'},
    {key:'canChangeEmail',label:'📧 Смена email',cat:'users'},
    {key:'canChangePassword',label:'🔑 Смена пароля',cat:'users'},
    {key:'canChangeUsername',label:'🏷 Смена username',cat:'users'},
    {key:'canChangeDisplayName',label:'👤 Смена никнейма',cat:'users'},
    {key:'canChangeId',label:'🆔 Смена ID',cat:'users'},
    {key:'canViewUserDetails',label:'🔍 Просмотр деталей',cat:'users'},
    {key:'canExportUsers',label:'📤 Экспорт пользователей',cat:'users'},
    {key:'canViewTips',label:'📚 Просмотр советов',cat:'tips'},
    {key:'canCreateTips',label:'➕ Создание советов',cat:'tips'},
    {key:'canEditTips',label:'✏️ Редактирование советов',cat:'tips'},
    {key:'canDeleteTips',label:'🗑 Удаление советов',cat:'tips'},
    {key:'canPublishTips',label:'📢 Публикация советов',cat:'tips'},
    {key:'canFeatureTips',label:'⭐ Избранные советы',cat:'tips'},
    {key:'canCategorizeTips',label:'📂 Категоризация советов',cat:'tips'},
    {key:'canRateTips',label:'⭐ Оценка советов',cat:'tips'},
    {key:'canCommentTips',label:'💬 Комментарии к советам',cat:'tips'},
    {key:'canShareTips',label:'🔗 Поделиться советом',cat:'tips'},
    {key:'canViewCategories',label:'📂 Просмотр категорий',cat:'categories'},
    {key:'canCreateCategories',label:'➕ Создание категорий',cat:'categories'},
    {key:'canEditCategories',label:'✏️ Редактирование категорий',cat:'categories'},
    {key:'canDeleteCategories',label:'🗑 Удаление категорий',cat:'categories'},
    {key:'canReorderCategories',label:'🔄 Изменение порядка',cat:'categories'},
    {key:'canViewComplaints',label:'📜 Просмотр жалоб',cat:'complaints'},
    {key:'canCreateComplaints',label:'➕ Создание жалоб',cat:'complaints'},
    {key:'canEditComplaints',label:'✏️ Редактирование жалоб',cat:'complaints'},
    {key:'canDeleteComplaints',label:'🗑 Удаление жалоб',cat:'complaints'},
    {key:'canProcessComplaints',label:'✅ Обработка жалоб',cat:'complaints'},
    {key:'canArchiveComplaints',label:'📦 Архивация жалоб',cat:'complaints'},
    {key:'canViewTickets',label:'🎫 Просмотр тикетов',cat:'tickets'},
    {key:'canCreateTickets',label:'➕ Создание тикетов',cat:'tickets'},
    {key:'canRespondTickets',label:'💬 Ответы на тикеты',cat:'tickets'},
    {key:'canCloseTickets',label:'🔒 Закрытие тикетов',cat:'tickets'},
    {key:'canDeleteTickets',label:'🗑 Удаление тикетов',cat:'tickets'},
    {key:'canAssignTickets',label:'📌 Назначение тикетов',cat:'tickets'},
    {key:'canPrioritizeTickets',label:'⚡ Приоритизация',cat:'tickets'},
    {key:'canTagTickets',label:'🏷 Теги тикетов',cat:'tickets'},
    {key:'canViewTicketHistory',label:'📜 История тикетов',cat:'tickets'},
    {key:'canExportTickets',label:'📤 Экспорт тикетов',cat:'tickets'},
    {key:'canViewChats',label:'💬 Просмотр чатов',cat:'chats'},
    {key:'canCreateChats',label:'➕ Создание чатов',cat:'chats'},
    {key:'canSendMessage',label:'📨 Отправка сообщений',cat:'chats'},
    {key:'canDeleteMessages',label:'🗑 Удаление сообщений',cat:'chats'},
    {key:'canEditMessages',label:'✏️ Редактирование сообщений',cat:'chats'},
    {key:'canManageChatRooms',label:'🏠 Управление комнатами',cat:'chats'},
    {key:'canViewAnonymousChats',label:'🕵️ Просмотр анонимных',cat:'chats'},
    {key:'canPinMessages',label:'📌 Закрепление сообщений',cat:'chats'},
    {key:'canReactToMessages',label:'👍 Реакции',cat:'chats'},
    {key:'canMentionUsers',label:'@ Упоминания',cat:'chats'},
    {key:'canViewMap',label:'🗺️ Просмотр карты',cat:'map'},
    {key:'canCreateIncidents',label:'📍 Создание инцидентов',cat:'map'},
    {key:'canEditIncidents',label:'✏️ Редактирование инцидентов',cat:'map'},
    {key:'canDeleteIncidents',label:'🗑 Удаление инцидентов',cat:'map'},
    {key:'canVerifyIncidents',label:'✅ Проверка инцидентов',cat:'map'},
    {key:'canCategorizeIncidents',label:'📂 Категоризация',cat:'map'},
    {key:'canViewMapHistory',label:'📜 История карты',cat:'map'},
    {key:'canExportMap',label:'📤 Экспорт карты',cat:'map'},
    {key:'canViewTasks',label:'📋 Просмотр задач',cat:'tasks'},
    {key:'canCreateTasks',label:'➕ Создание задач',cat:'tasks'},
    {key:'canEditTasks',label:'✏️ Редактирование задач',cat:'tasks'},
    {key:'canDeleteTasks',label:'🗑 Удаление задач',cat:'tasks'},
    {key:'canAssignTasks',label:'📌 Назначение задач',cat:'tasks'},
    {key:'canPrioritizeTasks',label:'⚡ Приоритизация задач',cat:'tasks'},
    {key:'canCompleteTasks',label:'✅ Завершение задач',cat:'tasks'},
    {key:'canViewTaskHistory',label:'📜 История задач',cat:'tasks'},
    {key:'canViewIPBans',label:'🌐 Просмотр IP-банов',cat:'security'},
    {key:'canCreateIPBans',label:'➕ Создание IP-банов',cat:'security'},
    {key:'canDeleteIPBans',label:'🗑 Удаление IP-банов',cat:'security'},
    {key:'canViewLogs',label:'📋 Просмотр логов',cat:'security'},
    {key:'canClearLogs',label:'🧹 Очистка логов',cat:'security'},
    {key:'canExportLogs',label:'📤 Экспорт логов',cat:'security'},
    {key:'canViewSecurityAlerts',label:'🚨 Алерты безопасности',cat:'security'},
    {key:'canManageFirewall',label:'🔥 Настройка firewall',cat:'security'},
    {key:'canViewLoginHistory',label:'🔐 История входов',cat:'security'},
    {key:'canManageSessions',label:'👥 Управление сессиями',cat:'security'},
    {key:'canViewSystemSettings',label:'🔧 Просмотр настроек',cat:'system'},
    {key:'canEditSystemSettings',label:'✏️ Редактирование настроек',cat:'system'},
    {key:'canManageMaintenance',label:'🔧 Режим обслуживания',cat:'system'},
    {key:'canManageBanners',label:'📢 Управление баннерами',cat:'system'},
    {key:'canManagePermissions',label:'🔐 Управление правами',cat:'system'},
    {key:'canManageRegistration',label:'📝 Управление регистрацией',cat:'system'},
    {key:'canManageThemes',label:'🎨 Управление темами',cat:'system'},
    {key:'canManageLanguages',label:'🌍 Управление языками',cat:'system'},
    {key:'canManageTimezones',label:'🕐 Управление часовыми поясами',cat:'system'},
    {key:'canManageCurrencies',label:'💱 Управление валютами',cat:'system'},
    {key:'canManageIntegrations',label:'🔗 Управление интеграциями',cat:'system'},
    {key:'canManageAPI',label:'🔌 Управление API',cat:'system'},
    {key:'canExportData',label:'💾 Экспорт данных',cat:'data'},
    {key:'canImportData',label:'📥 Импорт данных',cat:'data'},
    {key:'canResetData',label:'💣 Сброс данных',cat:'data'},
    {key:'canManageBackups',label:'📦 Управление бэкапами',cat:'data'},
    {key:'canViewDatabase',label:'🗄️ Просмотр базы данных',cat:'data'},
    {key:'canViewAnalytics',label:'📊 Просмотр аналитики',cat:'analytics'},
    {key:'canViewDashboard',label:'📈 Просмотр дашборда',cat:'analytics'},
    {key:'canViewStatistics',label:'📉 Просмотр статистики',cat:'analytics'},
    {key:'canExportReports',label:'📄 Экспорт отчётов',cat:'analytics'},
    {key:'canViewUserStats',label:'👤 Статистика пользователей',cat:'analytics'},
    {key:'canViewContentStats',label:'📚 Статистика контента',cat:'analytics'},
    {key:'canViewTrafficStats',label:'🌐 Статистика трафика',cat:'analytics'},
    {key:'canViewRevenueStats',label:'💰 Статистика доходов',cat:'analytics'},
    {key:'canViewFavorites',label:'⭐ Просмотр избранного',cat:'personal'},
    {key:'canViewHistory',label:'📜 Просмотр истории',cat:'personal'},
    {key:'canEditProfile',label:'👤 Редактирование профиля',cat:'personal'},
    {key:'canChangeAvatar',label:'🖼️ Смена аватара',cat:'personal'},
    {key:'canDeleteAccount',label:'🗑 Удаление аккаунта',cat:'personal'},
    {key:'canViewMedia',label:'🎥 Просмотр медиа',cat:'media'},
    {key:'canUploadMedia',label:'📤 Загрузка медиа',cat:'media'},
    {key:'canEditMedia',label:'✏️ Редактирование медиа',cat:'media'},
    {key:'canDeleteMedia',label:'🗑 Удаление медиа',cat:'media'},
    {key:'canManageGallery',label:'🖼️ Управление галереей',cat:'media'},
    {key:'canViewIntegrations',label:'🔗 Просмотр интеграций',cat:'integrations'},
    {key:'canManageTelegram',label:'📱 Telegram бот',cat:'integrations'},
    {key:'canManageEmail',label:'📧 Email интеграция',cat:'integrations'},
    {key:'canManageSMS',label:'💬 SMS интеграция',cat:'integrations'},
    {key:'canManageWebhooks',label:'🪝 Webhooks',cat:'integrations'},
    {key:'canViewFinance',label:'💰 Просмотр финансов',cat:'finance'},
    {key:'canManagePayments',label:'💳 Управление платежами',cat:'finance'},
    {key:'canManageSubscriptions',label:'📋 Управление подписками',cat:'finance'},
    {key:'canViewInvoices',label:'📄 Просмотр счетов',cat:'finance'},
    {key:'canManageRefunds',label:'↩️ Управление возвратами',cat:'finance'},
    {key:'canViewNotifications',label:'🔔 Просмотр уведомлений',cat:'notifications'},
    {key:'canSendNotifications',label:'📤 Отправка уведомлений',cat:'notifications'},
    {key:'canManagePush',label:'📱 Push уведомления',cat:'notifications'},
    {key:'canManageEmailNotif',label:'📧 Email уведомления',cat:'notifications'},
    {key:'canManageSMSNotif',label:'💬 SMS уведомления',cat:'notifications'}
];

const PERMISSION_CATEGORIES = {
    users:'👥 Пользователи',tips:'📚 Советы',categories:'📂 Категории',complaints:'📜 Жалобы',
    tickets:'🎫 Тикеты',chats:'💬 Чаты',map:'🗺️ Карта',tasks:'📋 Задачи',
    security:'🌐 Безопасность',system:'🔧 Системные',data:'💾 Данные',
    analytics:'📊 Аналитика',personal:'⭐ Личное',media:'🎥 Медиа',
    integrations:'🔗 Интеграции',finance:'💰 Финансы',notifications:'🔔 Уведомления'
};

// ====================================================================
// ДАННЫЕ
// ====================================================================
let currentUser = null;
let allUsers = [];
let tips = [];
let tickets = [];
let currentPage = 'home';
let anonymousChatId = null;

let userSettings = {
    theme:'dark',accent:'indigo',customColor:null,
    avatarColor:'#6366f1',avatarColor2:'#8b5cf6',useGradient:true,
    animations:true,highContrast:false,bigButtons:false,largeText:false,nightMode:false
};

let systemSettings = {
    maintenanceMode:false,registrationRequired:false,
    globalBannerEnabled:false,globalBannerText:'',globalBannerType:'info',globalBannerIcon:'📢',
    allowDeleteAccount:true,allowChangePassword:true,allowChangeName:true,
    allowCreateTips:true,allowCreateTasks:true,allowCreateTickets:true,
    allowUserRegistration:true,
    enableChat:true,enableMap:true,enableComplaints:true,enableFavorites:true,
    enableTips:true,enableSupport:true,
    showWelcomeMessage:true,welcomeMessage:'Добро пожаловать в Щит!'
};

function getDefaultPermissions() {
    const p = {};
    PERMISSIONS_LIST.forEach(perm => p[perm.key] = false);
    return p;
}

function getModeratorPermissions() {
    const p = getDefaultPermissions();
    ['canViewUsers','canViewTips','canCreateTips','canViewTickets','canRespondTickets','canViewChats','canSendMessage','canViewMap','canViewTasks','canCreateTasks','canViewIPBans','canViewLogs','canViewAnalytics','canViewDashboard','canViewFavorites','canViewHistory','canViewNotifications'].forEach(k => p[k] = true);
    return p;
}

function getAdminPermissions() {
    const p = getDefaultPermissions();
    PERMISSIONS_LIST.forEach(perm => {
        if (!perm.key.includes('System') && !perm.key.includes('Reset') && !perm.key.includes('Permissions')) {
            p[perm.key] = true;
        }
    });
    return p;
}

// ====================================================================
// АВТОРИЗАЦИЯ
// ====================================================================
auth.onAuthStateChanged(async (user) => {
    if (user) {
        const userDoc = await db.collection('users').doc(user.uid).get();
        const userData = userDoc.exists ? userDoc.data() : {};
        
        currentUser = {
            uid: user.uid,
            uuid: userData.uuid || generateUUID(),
            id: userData.id !== undefined ? userData.id : await generateNewId(),
            username: userData.username || user.email.split('@')[0],
            displayName: userData.displayName || user.displayName || user.email.split('@')[0],
            email: user.email,
            role: user.uid === ROOT_UID ? 'root' : (userData.role || 'user'),
            permissions: userData.permissions || getDefaultPermissions(),
            banned: userData.banned || false,
            muted: userData.muted || false,
            kicked: userData.kicked || false
        };
        
        if (!userDoc.exists) await saveUserData();
        
        await loadUserSettings();
        await loadSystemSettings();
        
        document.getElementById('authScreen').style.display = 'none';
        document.getElementById('supportChatBtn').style.display = 'none';
        initApp();
        showToast('success','Добро пожаловать!',currentUser.displayName);
    } else {
        currentUser = null;
        document.getElementById('authScreen').style.display = 'flex';
        document.getElementById('supportChatBtn').style.display = 'flex';
    }
});

function generateUUID() {
    return 'uuid_' + Date.now() + '_' + Math.random().toString(36).substr(2,16);
}

async function generateNewId() {
    const snapshot = await db.collection('users').get();
    let maxId = 0;
    snapshot.forEach(doc => {
        const id = doc.data().id;
        if (typeof id === 'number' && id > maxId) maxId = id;
    });
    return maxId + 1;
}

async function saveUserData() {
    try {
        await db.collection('users').doc(currentUser.uid).set({
            uid:currentUser.uid,uuid:currentUser.uuid,id:currentUser.id,
            username:currentUser.username,displayName:currentUser.displayName,
            email:currentUser.email,role:currentUser.role,
            permissions:currentUser.permissions,
            banned:currentUser.banned,muted:currentUser.muted,kicked:currentUser.kicked,
            settings:userSettings,
            updatedAt:firebase.firestore.FieldValue.serverTimestamp()
        },{merge:true});
    } catch(e) { console.error(e); }
}

// ====================================================================
// ВХОД ПО ЛЮБОМУ ID
// ====================================================================
window.doLogin = async function() {
    const identifier = document.getElementById('loginIdentifier').value.trim();
    const password = document.getElementById('loginPassword').value;
    
    if (!identifier || !password) {
        showToast('danger','Ошибка','Заполните все поля');
        return;
    }
    
    let email = null;
    
    try {
        if (identifier.includes('@')) {
            email = identifier;
        } else if (identifier === '0' || identifier.toLowerCase() === 'root') {
            const rootDoc = await db.collection('users').doc(ROOT_UID).get();
            email = rootDoc.exists ? rootDoc.data().email : ROOT_EMAIL;
        } else if (identifier.startsWith('uuid_') || identifier.length > 20) {
            const snapshot = await db.collection('users').where('uuid','==',identifier).get();
            if (!snapshot.empty) email = snapshot.docs[0].data().email;
            else {
                const byUid = await db.collection('users').doc(identifier).get();
                if (byUid.exists) email = byUid.data().email;
            }
        } else if (!isNaN(identifier)) {
            const snapshot = await db.collection('users').where('id','==',parseInt(identifier)).get();
            if (!snapshot.empty) email = snapshot.docs[0].data().email;
        } else {
            const snapshot = await db.collection('users').where('username','==',identifier.toLowerCase()).get();
            if (!snapshot.empty) email = snapshot.docs[0].data().email;
        }
        
        if (!email) {
            showToast('danger','Ошибка','Пользователь не найден');
            return;
        }
        
        await auth.signInWithEmailAndPassword(email,password);
    } catch(e) {
        showToast('danger','Ошибка входа',e.message);
    }
};

// ====================================================================
// РЕГИСТРАЦИЯ
// ====================================================================
window.doRegister = async function() {
    const email = document.getElementById('regEmail').value.trim();
    const username = document.getElementById('regUsername').value.trim().toLowerCase();
    const displayName = document.getElementById('regDisplayName').value.trim();
    const password = document.getElementById('regPassword').value;
    const confirm = document.getElementById('regConfirm').value;
    
    if (!email || !username || !displayName || !password || !confirm) {
        showToast('danger','Ошибка','Заполните все поля');
        return;
    }
    
    if (RESERVED_NAMES.includes(username)) {
        alert(`❌ Username "${username}" запрещён!\n\nВыберите другое имя.`);
        return;
    }
    
    if (RESERVED_NAMES.includes(displayName.toLowerCase())) {
        alert(`❌ Никнейм "${displayName}" запрещён!\n\nВыберите другое имя.`);
        return;
    }
    
    if (password !== confirm) {
        showToast('danger','Ошибка','Пароли не совпадают');
        return;
    }
    
    if (password.length < 6) {
        showToast('danger','Ошибка','Минимум 6 символов');
        return;
    }
    
    const usernameCheck = await db.collection('users').where('username','==',username).get();
    if (!usernameCheck.empty) {
        alert(`❌ Username "${username}" уже занят!`);
        return;
    }
    
    try {
        const cred = await auth.createUserWithEmailAndPassword(email,password);
        const newId = await generateNewId();
        const newUuid = generateUUID();
        
        await db.collection('users').doc(cred.user.uid).set({
            uid:cred.user.uid,uuid:newUuid,id:newId,
            username:username,displayName:displayName,email:email,
            role:'user',permissions:getDefaultPermissions(),
            banned:false,muted:false,kicked:false,
            settings:userSettings,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt:firebase.firestore.FieldValue.serverTimestamp()
        });
        
        showToast('success','Регистрация успешна!',`ID: ${newId}`);
    } catch(e) {
        showToast('danger','Ошибка',e.message);
    }
};

window.doLogout = async function() {
    await auth.signOut();
    showToast('success','Вы вышли','До встречи!');
};

window.switchAuthTab = function(tab,el) {
    document.querySelectorAll('#authScreen .tab').forEach(t => t.classList.remove('active'));
    el.classList.add('active');
    document.getElementById('authLoginForm').style.display = tab === 'login' ? 'block' : 'none';
    document.getElementById('authRegisterForm').style.display = tab === 'register' ? 'block' : 'none';
};

// ====================================================================
// УПРАВЛЕНИЕ ПОЛЬЗОВАТЕЛЯМИ
// ====================================================================
async function loadAllUsers() {
    const snapshot = await db.collection('users').get();
    allUsers = [];
    snapshot.forEach(doc => allUsers.push({uid:doc.id,...doc.data()}));
}

window.createUserAccount = async function() {
    if (currentUser.role !== 'root' && !currentUser.permissions.canCreateUsers) {
        showToast('danger','Ошибка','Нет прав');
        return;
    }
    
    const modal = document.createElement('div');
    modal.className = 'modal-overlay active';
    modal.innerHTML = `
        <div class="modal" style="max-width:800px;">
            <button class="modal-close" onclick="this.closest('.modal-overlay').remove()">✕</button>
            <h2 class="modal-title">➕ Создать аккаунт сотрудника</h2>
            <div class="card">
                <div class="settings-group-title">📧 Основные данные</div>
                <div class="form-group"><label class="form-label">Email (логин)</label><input type="email" class="form-input" id="newUserEmail" placeholder="employee@bespredela.net"></div>
                <div class="form-group"><label class="form-label">Пароль</label><input type="text" class="form-input" id="newUserPassword" placeholder="Минимум 6 символов"><button class="btn btn-sm" onclick="generateRandomPassword()" style="margin-top:8px;">🎲 Сгенерировать</button></div>
            </div>
            <div class="card">
                <div class="settings-group-title">🏷 Идентификация</div>
                <div class="form-group"><label class="form-label">Username</label><input type="text" class="form-input" id="newUserUsername" placeholder="ivan_petrov"></div>
                <div class="form-group"><label class="form-label">Никнейм</label><input type="text" class="form-input" id="newUserDisplayName" placeholder="Иван Петров"></div>
                <div class="form-group"><label class="form-label">ID (оставьте пустым для рандомного)</label><input type="number" class="form-input" id="newUserId" placeholder="Авто"><button class="btn btn-sm" onclick="generateRandomId()" style="margin-top:8px;">🎲 Сгенерировать ID</button></div>
            </div>
            <div class="card">
                <div class="settings-group-title">🎭 Роль</div>
                <div class="form-group"><select class="form-select" id="newUserRole" onchange="updatePermissionsFromRole()"><option value="user">👤 Пользователь</option><option value="moderator">🛡️ Модератор</option><option value="admin">👑 Администратор</option><option value="custom">⚙️ Custom</option></select></div>
            </div>
            <div class="card">
                <div class="settings-group-title">🔐 Права (${PERMISSIONS_LIST.length})</div>
                <div id="permissionsGrid" style="display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:8px;max-height:400px;overflow-y:auto;">
                    ${Object.keys(PERMISSION_CATEGORIES).map(catKey => `
                        <div style="grid-column:1/-1;margin-top:16px;"><div style="font-weight:600;color:var(--primary);margin-bottom:8px;">${PERMISSION_CATEGORIES[catKey]}</div></div>
                        ${PERMISSIONS_LIST.filter(p => p.cat === catKey).map(perm => `
                            <div class="toggle-row" style="margin:0;padding:8px;">
                                <div class="toggle-row-info"><div class="toggle-row-title" style="font-size:0.85em;">${perm.label}</div></div>
                                <div class="toggle" data-perm="${perm.key}" onclick="this.classList.toggle('on')"></div>
                            </div>
                        `).join('')}
                    `).join('')}
                </div>
            </div>
            <div style="display:flex;gap:8px;margin-top:20px;">
                <button class="btn btn-primary" onclick="confirmCreateUser()" style="flex:1;">✅ Создать</button>
                <button class="btn" onclick="this.closest('.modal-overlay').remove()">❌ Отмена</button>
            </div>
        </div>
    `;
    document.body.appendChild(modal);
};

window.generateRandomPassword = function() {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let p = '';
    for (let i = 0; i < 12; i++) p += chars.charAt(Math.floor(Math.random() * chars.length));
    document.getElementById('newUserPassword').value = p;
};

window.generateRandomId = async function() {
    const snapshot = await db.collection('users').get();
    let maxId = 0;
    snapshot.forEach(doc => {
        const id = doc.data().id;
        if (typeof id === 'number' && id > maxId) maxId = id;
    });
    document.getElementById('newUserId').value = maxId + 1;
};

window.updatePermissionsFromRole = function() {
    const role = document.getElementById('newUserRole').value;
    const toggles = document.querySelectorAll('#permissionsGrid .toggle');
    
    toggles.forEach(toggle => {
        const permKey = toggle.dataset.perm;
        if (role === 'user') toggle.classList.remove('on');
        else if (role === 'moderator') {
            const modPerms = ['canViewUsers','canViewTips','canCreateTips','canViewTickets','canRespondTickets','canViewChats','canSendMessage','canViewMap','canViewTasks','canCreateTasks','canViewIPBans','canViewLogs','canViewAnalytics','canViewDashboard','canViewFavorites','canViewHistory'];
            toggle.classList.toggle('on',modPerms.includes(permKey));
        } else if (role === 'admin') {
            toggle.classList.toggle('on',!permKey.includes('System') && !permKey.includes('Reset') && !permKey.includes('Permissions'));
        }
    });
};

window.confirmCreateUser = async function() {
    const email = document.getElementById('newUserEmail').value.trim();
    const password = document.getElementById('newUserPassword').value;
    const username = document.getElementById('newUserUsername').value.trim().toLowerCase();
    const displayName = document.getElementById('newUserDisplayName').value.trim();
    const customId = document.getElementById('newUserId').value;
    const role = document.getElementById('newUserRole').value;
    
    if (!email || !password || !username || !displayName) {
        showToast('danger','Ошибка','Заполните все поля');
        return;
    }
    
    if (password.length < 6) {
        showToast('danger','Ошибка','Пароль минимум 6 символов');
        return;
    }
    
    if (RESERVED_NAMES.includes(username)) {
        alert(`❌ Username "${username}" запрещён!`);
        return;
    }
    
    if (RESERVED_NAMES.includes(displayName.toLowerCase())) {
        alert(`❌ Никнейм "${displayName}" запрещён!`);
        return;
    }
    
    const usernameCheck = await db.collection('users').where('username','==',username).get();
    if (!usernameCheck.empty) {
        alert(`❌ Username "${username}" уже занят!`);
        return;
    }
    
    let newId;
    if (customId) {
        newId = parseInt(customId);
        const idCheck = await db.collection('users').where('id','==',newId).get();
        if (!idCheck.empty) {
            alert(`❌ ID "${newId}" уже используется!\n\nВыберите другой ID.`);
            return;
        }
    } else {
        newId = await generateNewId();
    }
    
    const permissions = {};
    document.querySelectorAll('#permissionsGrid .toggle').forEach(toggle => {
        permissions[toggle.dataset.perm] = toggle.classList.contains('on');
    });
    
    const rootPassword = prompt('🔐 Введите ВАШ пароль ROOT для подтверждения:');
    if (!rootPassword) return;
    
    try {
        const rootEmail = currentUser.email;
        await auth.signOut();
        
        const cred = await auth.createUserWithEmailAndPassword(email,password);
        const newUuid = generateUUID();
        
        await db.collection('users').doc(cred.user.uid).set({
            uid:cred.user.uid,uuid:newUuid,id:newId,
            username:username,displayName:displayName,email:email,
            role:role,permissions:permissions,
            banned:false,muted:false,kicked:false,
            settings:{},
            createdBy:currentUser.uid,
            createdAt:firebase.firestore.FieldValue.serverTimestamp(),
            updatedAt:firebase.firestore.FieldValue.serverTimestamp()
        });
        
        await auth.signOut();
        await auth.signInWithEmailAndPassword(rootEmail,rootPassword);
        
        document.querySelector('.modal-overlay.active').remove();
        
        const userInfo = `✅ АККАУНТ СОЗДАН!\n\n📧 Email: ${email}\n🔑 Пароль: ${password}\n🏷 Username: ${username}\n👤 Никнейм: ${displayName}\n🆔 ID: ${newId}\n🎭 Роль: ${role}\n\n📋 Включённые права:\n${PERMISSIONS_LIST.filter(p => permissions[p.key]).map(p => `  • ${p.label}`).join('\n') || '  • Нет прав'}\n\n⚠️ Передайте эти данные сотруднику!`;
        alert(userInfo);
        
        showToast('success','Аккаунт создан!',`${username} (ID: ${newId})`);
        renderPage();
    } catch(e) {
        showToast('danger','Ошибка',e.message);
        try {
            await auth.signInWithEmailAndPassword(ROOT_EMAIL,rootPassword);
        } catch(e2) {
            alert('❌ КРИТИЧЕСКАЯ ОШИБКА!\n\nВойдите вручную:\nEmail: ' + ROOT_EMAIL);
        }
    }
};